---
layout: docs
title: "Quick Start: API Mocking with Java and JUnit 4"
meta_title: "API Mocking QuickStart with Java and JUnit 4 | WireMock" 
description: "Shows how to write your API Client first test with WireMock and JUnit"
---

## Installation

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

WireMock is also shipped in Java 7 and standalone versions, both of which work better in certain contexts.
See [Download and Installation](../download-and-installation/) for details.


## Writing a test with JUnit 4.x

To use WireMock's fluent API add the following import:

```java
import static com.github.tomakehurst.wiremock.client.WireMock.*;
```

WireMock ships with some JUnit rules to manage the server's lifecycle
and setup/tear-down tasks. To start and stop WireMock per-test case, add
the following to your test class (or a superclass of it):

```java
@Rule
public WireMockRule wireMockRule = new WireMockRule(8089); // No-args constructor defaults to port 8080
```

Now you're ready to write a test case like this:

```java
@Test
public void exampleTest() {
    stubFor(post("/my/resource")
        .withHeader("Content-Type", containing("xml"))
        .willReturn(ok()
            .withHeader("Content-Type", "text/xml")
            .withBody("<response>SUCCESS</response>")));

    Result result = myHttpServiceCallingObject.doSomething();
    assertTrue(result.wasSuccessful());

    verify(postRequestedFor(urlPathEqualTo("/my/resource"))
        .withRequestBody(matching(".*message-1234.*"))
        .withHeader("Content-Type", equalTo("text/xml")));
}
```

For many more examples of JUnit tests look no further than [WireMock's
own acceptance
tests](https://github.com/tomakehurst/wiremock/tree/master/src/test/java/com/github/tomakehurst/wiremock)

For more details on verifying requests and stubbing responses, see [Stubbing](../stubbing) and [Verifying](../verifying/)

For more information on the JUnit rule see [The JUnit Rule](../junit-rule/).

## Changing port numbers

For a bit more control over the settings of the WireMock server created
by the rule you can pass a fluently built Options object to either
(non-deprecated) rule's constructor:

```java
import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig;
...

@Rule
public WireMockRule wireMockRule = new WireMockRule(wireMockConfig().port(8089).httpsPort(8443));
```

### Random port numbers

You can have WireMock (or more accurately the JVM) pick random, free
HTTP and HTTPS ports (which is a great idea if you want to run your
tests concurrently):

```java
@Rule
public WireMockRule wireMockRule = new WireMockRule(wireMockConfig().dynamicPort().dynamicHttpsPort());
```

Then find out which ports to use from your tests as follows:

```java
int port = wireMockRule.port();
int httpsPort = wireMockRule.httpsPort();
```
