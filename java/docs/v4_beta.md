---
title: WireMock v4 Beta
meta_title: "Changes to WireMock in version 4.x"
---



!!! wiremock-cloud "WireMock Cloud"

    [To create publicly hosted mock APIs without anything to install, learn more about WireMock Cloud.](https://www.wiremock.io?utm_source=oss-docs&utm_medium=oss-docs&utm_campaign=cloud-callouts-install&utm_id=cloud-callouts&utm_term=cloud-callouts-install)



## v4 Beta

Version 4 of WireMock is currently in beta.  It is under active development and we recommend you try it out.  We would love
to hear your feedback over on the community slack - [https://slack.wiremock.org/](https://slack.wiremock.org/)

We have given these releases a beta label due to the fact that as we move forwards with the `4.x` release there **will be
breaking changes**.  These are the current updates to the `4.x` release:

* Java 17 is now the baseline java version
* Jetty 12 is shipped by default so there is no longer a specific jetty 12 release of `4.x` and Jetty 11 is no longer supported

## Breaking changes and how to migrate

### Multiple Content-Type headers

In v3 using Jetty 11, if you configured a stub with multiple `Content-Type` headers, Jetty 11 stripped out all but the
last.

In v4.x WireMock will return all the `Content-Type` headers. This may break some clients which do not know what to do if
an HTTP response has multiple `Content-Type` headers.

Solution: only configure a single `Content-Type` header on a stub.

### Removed transitive dependencies

v4 no longer has transitive dependencies on the following libraries:

* org.eclipse.jetty:jetty-webapp (package org.eclipse.jetty.webapp) - Jetty 12 equivalent is org.eclipse.jetty.ee10:jetty-ee10-webapp
* org.eclipse.jetty.ee10:jetty-ee10-webapp (package org.eclipse.jetty.ee10.webapp)
* org.eclipse.jetty:jetty-alpn-client (package org.eclipse.jetty.alpn.client)
* org.eclipse.jetty:jetty-alpn-java-client (package org.eclipse.jetty.alpn.java.client)
* org.eclipse.jetty:jetty-client (package org.eclipse.jetty.client)
* org.eclipse.jetty:jetty-ee (package org.eclipse.jetty.ee)
* org.eclipse.jetty:jetty-proxy (package org.eclipse.jetty.proxy)
* org.eclipse.jetty:jetty-xml (package org.eclipse.jetty.xml)

If your code depends on classes in these packages you will need to bring the dependencies in directly.

The following transitive dependencies have been replaced and may require changes to package names:

* org.eclipse.jetty:jetty-servlet -> org.eclipse.jetty.ee10:jetty-ee10-servlet
* org.eclipse.jetty:jetty-servlets -> org.eclipse.jetty.ee10:jetty-ee10-servlets
* org.eclipse.jetty.http2:http2-common -> org.eclipse.jetty.http2:jetty-http2-common
* org.eclipse.jetty.http2:http2-hpack -> org.eclipse.jetty.http2:jetty-http2-hpack
* org.eclipse.jetty.http2:http2-server -> org.eclipse.jetty.http2:jetty-http2-server