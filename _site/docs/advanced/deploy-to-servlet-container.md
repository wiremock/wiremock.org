---
title: Deploying into a servlet container
meta_title: Deploying into a servlet container | WireMock
description: "package as WAR and deploy into a servlet
container"
---

WireMock can be packaged up as a WAR and deployed into a servlet
container, with the following caveats: 

- fault injection and browser proxying won't work.
- \_\_files won't be treated as a docroot as with standalone, 
- the server cannot be remotely shut down.
- and the container must be configured to explode the WAR on deployment. 

!!! warinig 

	This has only really been tested in Tomcat 6 and Jetty, so YMMV. 
	Running standalone is definitely the preferred option.

The easiest way to create a WireMock WAR project is to clone the
[sample app](https://github.com/wiremock/wiremock/tree/master/sample-war).

### Deploying under a sub-path of the context root

If you want WireMock's servlet to have a non-root path, set the additional
init param `mappedUnder` with the sub-path `web.xml`, in
addition to configuring the servlet mapping appropriately).

See [the custom mapped WAR
example](https://github.com/wiremock/wiremock/blob/master/sample-war/src/main/webappCustomMapping/WEB-INF/web.xml)
for details.
