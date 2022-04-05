---
layout: docs
title: WireMock Studio - Getting Started - Desktop
description: How to download and run WireMock Studio on your local machine.
---

WireMock Studio can be run on your own workstation either directly with Java or via Docker.

## Running with Java

The WireMock Studio Java standalone JAR requires a minimum of **Java 11**.

After ensuring you've got a suitable Java version installed, download the
<a href="https://releases.wiremock.studio/wiremock-studio-{{site.data.misc.wiremock_studio_version}}.jar" id="wiremock-studio-download">WireMock Studio standalone JAR</a>.

Then open a terminal in the directory containing the JAR file and run:

```bash
java -jar wiremock-studio-{{site.data.misc.wiremock_studio_version}}.jar
```

You should see something like the following in the console:

<img src="{{ base_path}}/images/wiremockBYUP9.png"  alt="WireMock Studio console" />

You can now visit the console URL shown, which defaults to [http://localhost:9000](http://localhost:9000){:target="{{site.data.misc.blank}}"}.


## Running in Docker

See [Getting Started - Docker](/studio/docs/getting-started/docker/) for details.