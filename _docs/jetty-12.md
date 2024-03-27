---
layout: docs
title: "Using WireMock with Jetty 12"
meta_title: Using WireMock with Jetty 12 | WireMock
description: WireMock ships with Jetty 11 by default but fully supports Jetty 12 as well.
---

WireMock ships with Jetty 11 by default but fully supports Jetty 12 as well. In this tutorial we are going to see how Wiremock could be configured to use Jetty 12.

## Prerequisites

- Java 17
- Maven or Gradle, recent versions
- A Java project, based on Maven or Gradle

## Add WireMock Dependency to your project

{% codetabs %}

{% codetab Maven %}

```xml
<dependency>
    <groupId>org.wiremock</groupId>
    <artifactId>wiremock</artifactId>
    <version>{{ site.wiremock_version }}</version>
    <scope>test</scope>
    <exclusion>
        <exclusion>
            <groupId>org.eclipse.jetty</groupId>
            <artifactId>*</artifactId>
        </exclusion>
    </exclusion>
</dependency>
<dependency>
    <groupId>org.wiremock</groupId>
    <artifactId>wiremock-jetty12</artifactId>
    <version>{{ site.wiremock_version }}</version>
    <scope>test</scope>
</dependency>
```

{% endcodetab %}

{% codetab Gradle Groovy %}

```groovy
testImplementation("org.wiremock:wiremock:{{ site.wiremock_version }}") {
  exclude group: "org.eclipse.jetty"
}
testImplementation "org.wiremock:wiremock-jetty12:{{ site.wiremock_version }}"
```

{% endcodetab %}

{% endcodetab %}