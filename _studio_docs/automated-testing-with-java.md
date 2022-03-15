---
layout: docs
title: Automated Testing with Java
toc_rank: 40
description: Creating automated tests in Java and MockLab
---

Everything that can be done with MockLab's web UI can also be done via its APIs. This can be useful when automating
testing, as it allows stubs to be configured and torn down on-demans by individual test cases rather than it being
necessary to configure an entire test suite's stubs manually up-front. Working this way can make your tests a lot more
readable as it makes their preconditions expicit.

MockLab's API is 100% compatible with [WireMock's](http://wiremock.org/docs/api/). This means that WireMock
can be used as a Java client for MockLab.

## Adding WireMock to your project

WireMock is distributed in two different types of JAR - a standard "thin" JAR, and a "fat" standalone JAR. The latter of these
contains all of WireMock's dependencies and repackages (shades) most of these. Either can be used as a dependency in your
project and which you choose depends primarily on whether you have dependencies already present that conflict with WireMock's.
Picking the standalone version generally avoids these problems but at the cost of a larger JAR download.

If you're using Gradle you can add WireMock to your build file's dependencies as follows:

```
testCompile 'com.github.tomakehurst:wiremock-jre8:2.27.0' // thin JAR
testCompile 'com.github.tomakehurst:wiremock-jre8-standalone:2.27.0' // standalone JAR
```

Or if you're using Maven:

```xml
<!-- Thin JAR -->
<dependency>
  <groupId>com.github.tomakehurst</groupId>
  <artifactId>wiremock-jre8</artifactId>
  <version>2.27.0</version>
  <scope>test</scope>
</dependency>

<!-- Standalone JAR -->
<dependency>
  <groupId>com.github.tomakehurst</groupId>
  <artifactId>wiremock-jre8-standalone</artifactId>
  <version>2.27.0</version>
  <scope>test</scope>
</dependency>
```

## Configuring your test

After you've created a mock API in the MockLab UI, setting up a WireMock client to it is a one-line task (you can copy-paste this from
your mock API's Settings page):

```java
// If admin API security disabled
WireMock paymentGatewayMock = new WireMock("https", "payments-example.mocklab.io", 443);

// If admin API security enabled
WireMock paymentGatewayMock = new WireMockBuilder()
    .scheme("https")
    .host("payments-example.mocklab.io")
    .port(443)
    .authenticator(new ClientTokenAuthenticator("lksdr91283rsdjkfh981"))
    .build();
```

Then in your test cases you can create stubs as [documented on the WireMock site](http://wiremock.org/docs/stubbing/):

```java
paymentGatewayMock.register(post("/send-payment").willReturn(created()));
```

And make assertions about received requests:

```java
paymentGatewayMock.verifyThat(postRequestedFor(urlPathEqualTo("/send-payment")));
```

## Programmatic stub creation

The same approach can be taken if you want to create stubs in your API programmatically.
This can be useful when you require a large number of stubs and don't want to create
them all by hand.

The example in the previous section creates an ephemeral stub i.e. one that isn't
stored persistently and will be deleted when the API is reset. To ensure that stubs
created programmatically are saved, simply call `persistent()` during creation:

```java
myMockApi.register(get(urlPathEqualTo("/persist-this"))
    .persistent()
    .willReturn(ok("Some body content"))
);
```

## Example project

For a complete, working example of a Java web project using MockLab with automated tests see [the mocklab demo app](https://github.com/mocklab/mocklab-demo-app).
