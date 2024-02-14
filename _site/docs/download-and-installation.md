---
description: >
    download and install WireMock.
---

# Download, install, and integrate with your app

WireMock is available as a standalone service for:  

- Docker
- Java
- Java library
- NPM package
- SaaS

## Download options

WireMock ditributes Java packages in two flavours:

- a standard JAR containing just WireMock.
- a standalone uber JAR containing WireMock plus all its dependencies.

Most of the standalone JAR's dependencies are shaded--they are hidden in alternative packages. This allows WireMock to be used in projects with
conflicting versions of its dependencies. The standalone JAR is also runnable (see [Running as a Standalone Process](./running-standalone.md)).

## Standalone Service

Run the following in a terminal:

=== "Docker"

    ```bash
    docker run -it --rm -p 8080:8080 --name wiremock \
    wiremock/wiremock:{{ versions.wiremock_version }}
    ```

## Declaring a dependency in your code

=== "Maven"

    ```xml
    <dependency>
        <groupId>org.wiremock</groupId>
        <artifactId>wiremock-standalone</artifactId>
        <version>{{ versions.wiremock_version }}</version>
        <scope>test</scope>
    </dependency>
    ```

=== "Gradle Groovy"

    ```groovy
    testImplementation "org.wiremock:wiremock-standalone:{{ versions.wiremock_version }}"
    ```

Learn more in the [Docker guide](./standalone/docker.md).

### Direct download

To run WireMock as a standalone process you can
<a id="wiremock-standalone-download" href="https://repo1.maven.org/maven2/org/wiremock/wiremock-standalone/{{ versions.wiremock_version }}/wiremock-standalone-{{ versions.wiremock_version }}.jar">download the standalone JAR from
here</a>

For next steps, take a look at:

- the [Template library](https://library.wiremock.org).
- WireMock [tutorials](./getting-started.md).
- learn how to use [Request matching](./request-matching.md),
- learn how to use [Response templates](./response-templating.md).

## Integrate WireMock into your app

YOu have two options from which to choose:

*Option 1*. Configure alternative endpoints. 

For example, if your app’s config file contains the following:

`stripe.api.baseUrl=https://api.stripe.com`

replace it in your dev/test environment’s config with:

`stripe.api.baseUrl=https://<wiremock-host>:<port>`


*Option 2*. Forward proxying.

Set your HTTP client’s proxy host and port to the WireMock proxy/port and start wiremock with browser proxying enabled.

