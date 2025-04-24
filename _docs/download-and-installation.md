---
layout: docs
title: Download and Installation
meta_title: "How to Download and Install WireMock"
toc_rank: 13
description: >
  WireMock is available as a standalone service (for Docker of Java), Java library
  and integrations for modern languages and technology stacks.
redirect_from:
  - "/download.html"
  - "/download/"
  - "/downloads.html"
  - "/downloads/"
  - "/docs/download.html"
  - "/docs/download/"
---

<div class="cloud-callout"><a href="https://www.wiremock.io?utm_source=oss-docs&utm_medium=oss-docs&utm_campaign=cloud-callouts-install&utm_id=cloud-callouts&utm_term=cloud-callouts-install" target="_BLANK">To create publicly hosted mock APIs without anything to install, learn more about WireMock Cloud.</a></div>

## Download options

WireMock Java is distributed in two flavours - a standard JAR containing just WireMock, and a standalone uber JAR containing
WireMock plus all its dependencies.

Most of the standalone JAR's dependencies are shaded i.e. they are hidden in alternative packages. This allows WireMock to be used in projects with
conflicting versions of its dependencies. The standalone JAR is also runnable (see [Running as a Standalone Process](../running-standalone/)).

WireMock currently has two releases available.  The `3.x` release (below) and the new `4.x` beta releases.

## 3.x Release Downloads

### Test dependencies

<div class="downloads-wrapper">
    {% include downloads.html %}
</div>

### Standalone Service

Run the following in a terminal:

{% codetabs %}

{% codetab Docker %}

```bash
docker run -it --rm -p 8080:8080 --name wiremock \
  wiremock/wiremock:{{ site.wiremock_version }}
```

{% endcodetab %}

{% codetab Maven %}

```xml
<dependency>
    <groupId>org.wiremock</groupId>
    <artifactId>wiremock-standalone</artifactId>
    <version>{{ site.wiremock_version }}</version>
    <scope>test</scope>
</dependency>
```

{% endcodetab %}

{% codetab Gradle %}

```groovy
testImplementation "org.wiremock:wiremock-standalone:{{ site.wiremock_version }}"
```

{% endcodetab %}

{% endcodetabs %}

Learn more in the [Docker guide](../docker).

### Direct download

If you want to run WireMock as a standalone process you can
<a id="wiremock-standalone-download" href="https://repo1.maven.org/maven2/org/wiremock/wiremock-standalone/{{ site.wiremock_version }}/wiremock-standalone-{{ site.wiremock_version }}.jar">download the standalone JAR from
here</a>

## 4.x Beta Release Downloads

The `4.x` release of WireMock is currently in beta.  These releases are under active development and we recommend you try it out.  We would love 
to hear your feedback over on the community slack - [https://slack.wiremock.org/](https://slack.wiremock.org/)

We have given these releases a beta label due to the fact that as we move forwards with the `4.x` release there **will be 
breaking changes**.  These are the current updates to the `4.x` release:

* Java 17 is now the baseline java version
* Jetty 12 is shipped by default so there is no longer a specific jetty 12 release of `4.x` and Jetty 11 is no longer supported

### Test dependencies

<div class="downloads-wrapper">
    {% include downloads-v4.html %}
</div>

### Standalone Service

Run the following in a terminal:

{% codetabs %}

{% codetab Maven %}

```xml
<dependency>
    <groupId>org.wiremock</groupId>
    <artifactId>wiremock-standalone</artifactId>
    <version>{{ site.wiremock_4_version }}</version>
    <scope>test</scope>
</dependency>
```

{% endcodetab %}

{% codetab Gradle %}

```groovy
testImplementation "org.wiremock:wiremock-standalone:{{ site.wiremock_4_version }}"
```

{% endcodetab %}

{% endcodetabs %}

### Direct download

If you want to run WireMock as a standalone process you can
<a id="wiremock-standalone-download" href="https://repo1.maven.org/maven2/org/wiremock/wiremock-standalone/{{ site.wiremock_4_version }}/wiremock-standalone-{{ site.wiremock_4_version }}.jar">download the standalone JAR from
here</a>
