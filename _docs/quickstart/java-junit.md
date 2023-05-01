---
layout: docs
title: "Quick Start: API Mocking with Java and JUnit 4"
meta_title: "API Mocking QuickStart with Java and JUnit 4 | WireMock" 
description: "Shows how to write your API Client first test with WireMock and JUnit"
---

In this guide we will write an API Unit test with WireMock and JUnit 4.

## Prerequisites

- Java 11, 17 or JDK 1.8
- Maven or Gradle, recent versions
- A Java project, based on Maven and Gradle
- A Unit test file which we will use as a playground

<!-- TODO: Would be nice to introduce an archetype or a clone-able demo repo -->

## Add WireMock Dependency to your project

WireMock is distributed via Maven Central and can be included in your project using common build tools' dependency management.
To add the standard WireMock JAR as a project dependency, put the following in the dependencies section of your build file:

### Maven

```xml
<dependency>
    <groupId>com.github.tomakehurst</groupId>
    <artifactId>wiremock-jre8</artifactId>
    <version>{{ site.wiremock_version }}</version>
    <scope>test</scope>
</dependency>
```

### Gradle

```groovy
testImplementation "com.github.tomakehurst:wiremock-jre8:{{ site.wiremock_version }}"
```

## Add the WireMock rule

WireMock ships with some JUnit rules to manage the server's lifecycle
and setup/tear-down tasks.

To use WireMock's fluent API add the following import:

```java
import static com.github.tomakehurst.wiremock.client.WireMock.*;
```

To automatically start and stop WireMock per-test case, add
the following to your test class (or a superclass of it):

```java
@Rule
public WireMockRule wireMockRule = new WireMockRule(8089); // No-args constructor defaults to port 8080
```

## Write a test

Now you're ready to write a test case like this:

```java
@Test
public void exampleTest() {
    // Setup the WireMock mapping stub for the test
    stubFor(post("/my/resource")
        .withHeader("Content-Type", containing("xml"))
        .willReturn(ok()
            .withHeader("Content-Type", "text/xml")
            .withBody("<response>SUCCESS</response>")));

    // Send the request and receive the response
    Result result = myHttpServiceCallingObject.doSomething();
    assertTrue(result.wasSuccessful());

    // Verify the response
    verify(postRequestedFor(urlPathEqualTo("/my/resource"))
        .withRequestBody(matching(".*message-1234.*"))
        .withHeader("Content-Type", equalTo("text/xml")));
}
```

## Extend the test

For a bit more control over the settings of the WireMock server created
by the rule you can pass a fluently built Options object to either rule's constructor.
Let's change the port numbers as an example.

### Change the port numbers

```java
import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig;
...

@Rule
public WireMockRule wireMockRule = new WireMockRule(wireMockConfig().port(8089).httpsPort(8443));
```

### Random port numbers

You can have WireMock (or more accurately the JVM) pick random, free
HTTP and HTTPS ports.
It is a great idea if you want to run your tests concurrently.

```java
@Rule
public WireMockRule wireMockRule = new WireMockRule(wireMockConfig().dynamicPort().dynamicHttpsPort());
```

Then find out which ports to use from your tests as follows:

```java
int port = wireMockRule.port();
int httpsPort = wireMockRule.httpsPort();
```

## Further reading

- For more details on verifying requests and stubbing responses, see [Stubbing](../../stubbing) and [Verifying](../../verifying/)
- For more information on the JUnit rules see [The JUnit 4 Rule](../../junit-4/).
- For many more examples of JUnit tests check out the
[WireMock's own acceptance tests](https://github.com/wiremock/wiremock/tree/master/src/test/java/com/github/tomakehurst/wiremock)
