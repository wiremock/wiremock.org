---
layout: docs
title: Download and Installation
meta_title: "How to Download and Install WireMock"
toc_rank: 13
description: >
    WireMock is available as a standalone service (for Docker of Java), Java library
    and integrations for modern languages and technology stacks.
---


## Download options

WireMock Java is distributed in two flavours - a standard JAR containing just WireMock, and a standalone uber JAR containing
WireMock plus all its dependencies.

Most of the standalone JAR's dependencies are shaded i.e. they are hidden in alternative packages. This allows WireMock to be used in projects with
conflicting versions of its dependencies. The standalone JAR is also runnable (see [Running as a Standalone Process](./running-standalone.md)).

## Test dependencies

<div class="downloads-wrapper">
    {% include downloads.html %}
</div>

## Standalone Service

Run the following in a terminal:

=== "Docker"

    ```bash
    docker run -it --rm -p 8080:8080 --name wiremock \
    wiremock/wiremock:{{ site.wiremock_version }}
    ```

=== "Maven"

    ```xml
    <dependency>
        <groupId>org.wiremock</groupId>
        <artifactId>wiremock-standalone</artifactId>
        <version>{{ site.wiremock_version }}</version>
        <scope>test</scope>
    </dependency>
    ```

=== "Gradle Groovy"

    ```groovy
    testImplementation "org.wiremock:wiremock-standalone:{{ site.wiremock_version }}"
    ```

Learn more in the [Docker guide](./standalone/docker.md).

### Direct download

If you want to run WireMock as a standalone process you can
<a id="wiremock-standalone-download" href="https://repo1.maven.org/maven2/org/wiremock/wiremock-standalone/{{ site.wiremock_version }}/wiremock-standalone-{{ site.wiremock_version }}.jar">download the standalone JAR from
here</a>
