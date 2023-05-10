---
layout: docs
title: Download and Installation
meta_title: "How to Download and Install WireMock"
toc_rank: 13
description: WireMock is distributed in two flavours - a standard JAR containing just WireMock, and a standalone fat JAR containing WireMock plus all its dependencies.
---

WireMock is distributed in two flavours - a standard JAR containing just WireMock, and a standalone uber JAR containing
WireMock plus all its dependencies.

Most of the standalone JAR's dependencies are shaded i.e. they are hidden in alternative packages. This allows WireMock to be used in projects with
conflicting versions of its dependencies. The standalone JAR is also runnable (see [Running as a Standalone Process](../running-standalone/)).




## 3.x beta

Maven:

```xml
<dependency>
    <groupId>com.github.tomakehurst</groupId>
    <artifactId>wiremock</artifactId>
    <version>{{ site.wiremock_beta_version }}</version>
    <scope>test</scope>
</dependency>
```

Maven (standalone):

```xml
<dependency>
    <groupId>com.github.tomakehurst</groupId>
    <artifactId>wiremock-standalone</artifactId>
    <version>{{ site.wiremock_beta_version }}</version>
    <scope>test</scope>
</dependency>
```

Gradle:

```groovy
testImplementation "com.github.tomakehurst:wiremock:{{ site.wiremock_beta_version }}"
```

Gradle (standalone):

```groovy
testImplementation "com.github.tomakehurst:wiremock-standalone:{{ site.wiremock_beta_version }}"
```



## Stable

Maven:

```xml
<dependency>
    <groupId>com.github.tomakehurst</groupId>
    <artifactId>wiremock-jre8</artifactId>
    <version>{{ site.wiremock_version }}</version>
    <scope>test</scope>
</dependency>
```

Maven (standalone):

```xml
<dependency>
    <groupId>com.github.tomakehurst</groupId>
    <artifactId>wiremock-jre8-standalone</artifactId>
    <version>{{ site.wiremock_version }}</version>
    <scope>test</scope>
</dependency>
```

Gradle:

```groovy
testImplementation "com.github.tomakehurst:wiremock-jre8:{{ site.wiremock_version }}"
```

Gradle (standalone):

```groovy
testImplementation "com.github.tomakehurst:wiremock-jre8-standalone:{{ site.wiremock_version }}"
```

## Direct download

If you want to run WireMock as a standalone process you can
<a id="wiremock-standalone-download" href="https://repo1.maven.org/maven2/com/github/tomakehurst/wiremock-jre8-standalone/{{ site.wiremock_version }}/wiremock-jre8-standalone-{{ site.wiremock_version }}.jar">download the standalone JAR from
here</a>