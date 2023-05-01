---
layout: docs
title: WireMock Quick Start
meta_title: WireMock Quick Start Guide
toc_rank: 10
redirect_from: "/getting-started.html"
description: WireMock is distributed via Maven Central and can be included in your project using common build tools’ dependency management. Get started with WireMock.
---



## Writing a test with JUnit 5.x

See [JUnit 5+ Jupiter Usage](../junit-jupiter/) for various JUnit 5 usage scenarios.

## Non-JUnit and general Java usage

If you're not using JUnit or neither of the WireMock rules manage its
lifecycle in a suitable way you can construct and start the server
directly:

```java
WireMockServer wireMockServer = new WireMockServer(wireMockConfig().port(8089)); //No-args constructor will start on port 8080, no HTTPS
wireMockServer.start();

// Do some stuff

WireMock.reset();

// Finish doing stuff

wireMockServer.stop();
```

If you've changed the port number and/or you're running the server on
another host, you'll need to tell the client:

```java
WireMock.configureFor("wiremock.host", 8089);
```

And if you've deployed it into a servlet container under a path other
than root you'll need to set that too:

```java
WireMock.configureFor("tomcat.host", 8080, "/wiremock");
```

## Running standalone

The WireMock server can be run in its own process, and configured via
the Java API, JSON over HTTP or JSON files.

This will start the server on port 8080:

You can <a id="wiremock-standalone-download" href="https://repo1.maven.org/maven2/com/github/tomakehurst/wiremock-jre8-standalone/{{ site.wiremock_version }}/wiremock-jre8-standalone-{{ site.wiremock_version }}.jar">download the standalone JAR from
here</a>.

See [Running as a Standalone Process](../running-standalone/) running-standalone for more details and commandline options.

## Fetching all of your stub mappings (and checking WireMock is working)

A GET request to the root admin URL e.g `http://localhost:8080/__admin`
will return all currently registered stub mappings. This is a useful way
to check whether WireMock is running on the host and port you expect:
