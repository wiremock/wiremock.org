---
title: "Using WireMock with Jetty 12"
meta_title: Using WireMock with Jetty 12 | WireMock
---

<br>

WireMock ships with Jetty 11 by default but fully supports Jetty 12 as well with a new module `wiremock-jetty12`. In this tutorial we are going to see how Wiremock could be configured to use Jetty 12.

## Prerequisites

- Java 17
- Maven or Gradle, recent versions
- A Java project, based on Maven or Gradle

## Add WireMock Dependency to your project

=== "Maven"

    ```xml
    <dependency>
        <groupId>org.wiremock</groupId>
        <artifactId>wiremock-jetty12</artifactId>
        <version>{{ wiremock_version }}</version>
        <scope>test</scope>
    </dependency>
    ```

=== "Gradle"

    ```groovy
    testImplementation "org.wiremock:wiremock-jetty12:{{ wiremock_version }}"
    ```



## Limitations

There are few limitations that usage of Jetty 12 is imposing with respect to stubbing behavior.

- status message will not be returned to the client even if set by the stub explicitly
    ```java
        stubFor(get("/my/resource")
            .willReturn(status(400)
                .withStatusMessage("ERROR")));

        URI uri = URI.create(wireMockRule.url("/my/resource"));
        HttpURLConnection connection = (HttpURLConnection) uri.toURL ().openConnection ();
        connection.setRequestMethod ("GET");

        assertThat(connection.getResponseCode()).isEqualTo(400);
        assertThat(connection.getResponseMessage()).isEqualTo("Bad Request"); /* the status message is not returned */
    ```
- when using multipart form data, the body is not decoded into plain text in case of `base64` (or other encodings) 

- serving files from configured file locations always ends up with redirect when folder (without trailing `/`) is requested
