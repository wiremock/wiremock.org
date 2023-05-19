---
layout: docs
title: Plain Java
meta_title: Use WireMock from Java or other JVM languages | WireMock
redirect_from: 
  - "/java-usage.html"
  - "/docs/plain-java.html"
description: If you want to use WireMock from Java (or any other JVM language) outside of JUnit you can programmatically create, start and stop the server.
---

If you're not using JUnit or neither of the WireMock rules manage its
lifecycle in a suitable way you can construct and start the server
directly.

## The Server

If you want to use WireMock from Java (or any other JVM language)
outside of JUnit you can programmatically create, start and stop the
server:

```java
WireMockServer wireMockServer = new WireMockServer(options().port(8089)); //No-args constructor will start on port 8080, no HTTPS
wireMockServer.start();

// Sometime later

wireMockServer.stop();
```

For more details of the `options()` builder accepted by the constructor see [Configuration](../configuration/) for details.

As with stubbing and verification via the [JUnit rule](../junit-rule/) you can call the
stubbing/verifying DSL from the server object as an alternative to
calling the client.

### Managing ports

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

## The Client

The `WireMock` class provides an over-the-wire client to a WireMock
server (the local one by default).

### Configuring for static calls

To configure the static client for an alternative host and port:

```java
import static com.github.tomakehurst.wiremock.client.WireMock.*;

configureFor("wiremock.host", 8089);
stubFor(get(....));
```

If you've deployed the server into a servlet container under a path
other than root you'll need to set that too:

```java
WireMock.configureFor("tomcat.host", 8080, "/wiremock");
```

### Newing up

Instances of `WireMock` can also be created. This is useful if you need
to talk to more than one server instance.

```java
WireMock wireMock = new WireMock("some.host", 9090, "/wm"); // As above, 3rd param is for non-root servlet deployments
wireMock.register(get(....)); // Equivalent to stubFor()
```
