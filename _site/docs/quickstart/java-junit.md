---
description: 
    A simple test API Client with WireMock and JUnit 4
---

# Quick Start: A simple test client

This topic demonstrates how to write a simple API Unit test with WireMock and JUnit 4, for an ongoing project.

## Prerequisites

- Java 11 or 17
- Recent version of Maven or Gradle
- A Java project, based on Maven and Gradle
- A Unit test file (example below) to use as a playground

<!-- TODO: Would be nice to introduce an archetype or a clone-able demo repo -->

## Add WireMock Dependencies to your project

Maven Central ditributes WireMock, which can be included in your project using common build tools' dependency management.

In this test use:

- AssertJ to verify the responses.
- the embedded HTTP client available in Java 11+ to send the requests.

To add the standard WireMock JAR as a project dependency, you can use one of the following dependencies snippets in your build file:

=== "Maven"

    ```xml
    <dependency>
        <groupId>org.wiremock</groupId>
        <artifactId>wiremock</artifactId>
        <version>{{ versions.wiremock_version }}</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.assertj</groupId>
        <artifactId>assertj-core</artifactId>
        <version>3.24.2</version>
        <scope>test</scope>
    </dependency>
    ```

=== "Gradle Groovy"

    ```groovy
    testImplementation "org.wiremock:wiremock:{{ versions.wiremock_version }}"
    testImplementation "org.assertj:assertj-core:3.24.2"
    ```

To support using a Java 1.8 test, you must add an external HTTP Client implementation
like [Apache HttpClient](https://hc.apache.org/httpcomponents-client-5.2.x/#).


## Add the WireMock rule

To use WireMock's fluent API, add the following import:

```java
import static com.github.tomakehurst.wiremock.client.WireMock.*;
```

WireMock ships with some JUnit rules to manage the server's lifecycle
and setup/tear-down tasks.

To automatically start and stop WireMock per test case, add
the following, either to your test class, or a superclass of it:

```java
@Rule
public WireMockRule wireMockRule = new WireMockRule(8089); // No-args constructor defaults to port 8080
```

## Write a test

Now you're ready to write a test case like this example:

```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

// ...

@Test
public void exampleTest() {
    // Setup the WireMock mapping stub for the test
    stubFor(post("/my/resource")
        .withHeader("Content-Type", containing("xml"))
        .willReturn(ok()
            .withHeader("Content-Type", "text/xml")
            .withBody("<response>SUCCESS</response>")));

    // Setup HTTP POST request (with HTTP Client embedded in Java 11+)
    final HttpClient client = HttpClient.newBuilder().build();
    final HttpRequest request = HttpRequest.newBuilder()
        .uri(wiremockServer.getRequestURI("/my/resource"))
        .header("Content-Type", "text/xml")
        .POST().build();

    // Send the request and receive the response
    final HttpResponse<String> response =
            client.send(request, HttpResponse.BodyHandlers.ofString());

    // Verify the response (with AssertJ)
    assertThat(response.statusCode()).as("Wrong response status code").isEqualTo(200);
    assertThat(response.body()).as("Wrong response body").contains("<response>SUCCESS</response>");
}
```

## Extend the test

For more control over the WireMock server settings that the rule creates, 
you can pass a fluently built Options object to the rule's constructor.

In the following example, we change the port numbers.

### Change the port numbers

```java
import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig;
///...

@Rule
public WireMockRule wireMockRule = new WireMockRule(wireMockConfig().port(8089).httpsPort(8443));
```

### Use random port numbers

You can have WireMock (or more accurately the JVM) pick random, free
HTTP and HTTPS ports.

This works well when running your tests concurrently.

```java
@Rule
public WireMockRule wireMockRule = new WireMockRule(wireMockConfig().dynamicPort().dynamicHttpsPort());
```

Then find out which ports to use from your tests, as follows:

```java
int port = wireMockRule.port();
int httpsPort = wireMockRule.httpsPort();
```

## Further reading

- For more details on verifying requests and stubbing responses, see [Stubbing](./../stubbing.md) and [Verifying](./../verifying.md)
- For more information on the JUnit rules see [The JUnit 4 Rule](./../junit-extensions.md).
- For many more examples of JUnit tests check out the
[WireMock's own acceptance tests](https://github.com/wiremock/wiremock/tree/master/src/test/java/com/github/tomakehurst/wiremock)
