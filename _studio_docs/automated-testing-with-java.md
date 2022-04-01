---
layout: docs
title: Automated Testing with Java
description: Creating automated tests in Java and WireMock Studio
---

Everything that can be done with WireMock Studio's web UI can also be done via its APIs. This can be useful when automating
testing, as it allows stubs to be configured and torn down on-demand by individual test cases rather than it being
necessary to configure an entire test suite's stubs manually up-front. Working this way can make your tests a lot more
readable as it makes their preconditions expicit.

WireMock Studio's API is 100% compatible with [WireMock's](http://wiremock.org/docs/api/). This means that WireMock
can be used as a Java client for WireMock Studio.

## Setup

To follow this guide you first need to add WireMock open source as a dependency to your project. See the [download and installation](/docs/download-and-installation/) page for details on how to do this.

## Configuring your test

After you've created a mock API in the WireMock Studio UI, setting up a WireMock client to it is a one-line task (you can copy-paste this from
your mock API's Settings page). Use the port number you allocated when creating the mock API (which you can also find on the top bar in the base URL):

```java
WireMock paymentGatewayMock = new WireMock("localhost", 8000);
```

Then in your test cases you can create stubs as [documented here](/docs/stubbing/):

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


## Further reading
You can see a more detailed example of this kind of test automation in action in the [MockLab demo app](https://github.com/mocklab/mocklab-demo-app/blob/master/src/test/java/mocklab/demo/ToDoWebTest.java){:target="{{site.data.misc.blank}}"}.