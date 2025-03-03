---
layout: docs
title: "WireMock Spring Boot Integration"
meta_title: Using WireMock's Spring Boot + JUnit 5 integration | WireMock
description: Integrating WireMock, Spring Boot and JUnit 5 via the official integration library.
---

WireMock's Spring Boot integration provides a simple, declarative way to configure and run one or more WireMock instances their JUnit tests.

## Installation

Maven:
```xml
<dependency>
    <groupId>org.wiremock.integrations</groupId>
    <artifactId>wiremock-spring-boot</artifactId>
    <version>{{ site.spring_boot_integration_version }}</version>
</dependency>
```

Gradle:
```groovy
implementation 'org.wiremock.integrations:wiremock-spring-boot:{{ site.spring_boot_integration_version }}'
```

## Basic usage

The integration is enabled by adding the `@EnableWireMock` annotation to your test class.

```java
@SpringBootTest(classes = ExamplesTests.AppConfiguration.class)
@EnableWireMock
class ExampleTests {

  @Value("${wiremock.server.baseUrl}")
  private String wireMockUrl;

  @Test
  void returns_a_ping() {
    stubFor(get("/ping").willReturn(ok("pong")));

    RestClient client = RestClient.create();
    String body = client.get()
            .uri(wireMockUrl + "/ping")
            .retrieve()
            .body(String.class);

    assertThat(body, is("pong"));
  }

  @SpringBootApplication
  static class AppConfiguration {}
}
```

### Injected properties

The example above will start a WireMock instance with a sensible set of defaults and set the following properties in the Spring context:

- `wiremock.server.baseUrl` - Base URL of WireMock server.
- `wiremock.server.port` - HTTP port of WireMock server.

These property names can be changed as follows:

```java
@EnableWireMock(
    @ConfigureWireMock(
        baseUrlProperties = { "customUrl", "sameCustomUrl" },
        portProperties = "customPort"
))
class CustomPropertiesTest {

 @Value("${customUrl}")
 private String customUrl;

 @Value("${sameCustomUrl}")
 private String sameCustomUrl;

 @Value("${customPort}")
 private String customPort;

 // ...
}
```


## Declarative configuration
A number of WireMock's common configuration values can be overridden via the `@ConfigureWireMock` annotation, which is used as follows:

```java
@EnableWireMock({
  @ConfigureWireMock(
      name = "my-mock",
      port = 8888)
})
```

This currently supports the following config items:

* `port`: the HTTP port number. Defaults to 0 i.e. random.
* `httpsPort`: the HTTPS port number. Defaults to 0 i.e. random.
* `name`: the WireMock instance name. It is usually a good idea to set this when running multiple WireMock instances. Defaults to `wiremock`.
* `usePortFromPredefinedPropertyIfFound`: if true, take the port number from the Spring configuration. Defaults to false.
* `portProperties`: Overrides for the HTTP port property name.
* `httpsPortProperties`: Overrides for the HTTPS port property name.
* `baseUrlProperties`: Overrides for the HTTP base URL property name.
* `httpsBaseUrlProperties`: Overrides for the HTTPS base URL property name.
* `filesUnderClasspath`: Classpath root that will be used as the WireMock instance's file source. See [Customizing the mappings directory](#customizing-the-mappings-directory) for details.
* `filesUnderDirectory`: File root that will be used as the WireMock instance's file source. See [Customizing the mappings directory](#customizing-the-mappings-directory) for details.
* `extensions`: WireMock extensions to be loaded, specified as class names.
* `extensionFactories`: WireMock extension factories to be loaded, specified as class names.
* `configurationCustomizers`: Customizer classes to be applied to the configuration object passed to the WireMock instance on construction. See [Programmatic configuration](#programmatic-configuration) for details.



## Programmatic configuration
If full control over the WireMock server's configuration is needed you can supply a customizer class that can call methods directly on the
WireMock configuration object.

```java
@EnableWireMock({
    @ConfigureWireMock(
        configurationCustomizers = CustomizerTest.Customizer.class)
})
public class CustomizerTest {
    
    static class Customizer implements WireMockConfigurationCustomizer {

        @Override
        public void customize(
            WireMockConfiguration configuration,
            ConfigureWireMock options
        ) {
            configuration.notifier(new CustomNotifier());
        }
    }
}
```



## Customizing the mappings directory
By default, each `WireMockServer` is configured to load WireMock root from:

1. Classpath *if specified*
   1. `{specified-resource-name}/{server-name}`
   2. `{specified-resource-name}`
2. Directory
   1. `{CWD}/wiremock/{server-name}`
   2. `{CWD}/stubs/{server-name}`
   3. `{CWD}/mappings/{server-name}`
   4. `{CWD}/wiremock`
   5. `{CWD}/stubs`
   6. `{CWD}/mappings`

This can be changed as follows:

```java
@EnableWireMock({
  @ConfigureWireMock(
      name = "fs-client",
      filesUnderClasspath = "some/classpath/resource",
      filesUnderDirectory = "or/a/directory")
})
```

## Injecting WireMock instances into the test
Sometimes it's necessary to gain programmatic access to a running WireMock instance e.g. to configure stubs or perform verifications.

To enable this you can inject the WireMock server into a field on the test class as follows:

```java
@SpringBootTest(classes = InjectionTest.AppConfiguration.class)
@EnableWireMock
public class InjectionTest {

  @InjectWireMock
  WireMockServer wireMock;

}
```

As described in the next section you can also specify the name of the desired instance when injecting:

```java
@SpringBootTest(classes = InjectionTest.AppConfiguration.class)
@EnableWireMock({
  @ConfigureWireMock(name = "user-service")
})
public class InjectionTest {

  @InjectWireMock("user-service")
  WireMockServer mockUserService;

  @Test
  void fetch_empty_list_of_users() {
    
    mockUserService.stubFor(get("/users").willReturn(okJson("[]")));

    // ...
  }
}
```

## Running multiple instances
It's typically a good idea to run a WireMock instance per API you wish to mock, primarily to avoid clashes in the URL schemes of the two (or more) APIs.

The Spring Boot integration supports this explictly via annotation configuration. By adding more than one configuration item, multiple instances will be
started and the associated properties added to the Spring context.

These instances can then be injected as fields on the test class to 


```java
@SpringBootTest(classes = WireMockSpringExtensionTest.AppConfiguration.class)
@EnableWireMock({
  @ConfigureWireMock(
      name = "user-service",
      baseUrlProperties = "user-service.url",
      portProperties = "user-service.port"),
  @ConfigureWireMock(
      name = "todo-service",
      baseUrlProperties = "todo-service.url",
      portProperties = "todo-service.port")
})
public class WireMockSpringExtensionTest {

  @SpringBootApplication
  static class AppConfiguration {}

  @InjectWireMock("user-service")
  private WireMockServer mockUserService;

  @InjectWireMock("todo-service")
  private WireMockServer mockTodoService;
}
```
