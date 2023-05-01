---
layout: docs
title: WireMock Quick Start
meta_title: WireMock Quick Start Guide
toc_rank: 10
redirect_from: "/getting-started.html"
description: WireMock is distributed via Maven Central and can be included in your project using common build tools’ dependency management. Get started with WireMock.
---


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
