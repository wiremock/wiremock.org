---
layout: solution
title: "WireMock for Java and JVM languages"
meta_title: "Java and Java Virtual Machine Solutions | WireMock"
description: "Additional solutions for WireMock when using Java or other JVM based languages"
logo: /images/logos/technology/java.svg
hide-disclaimer: true
---

<div class="cloud-callout"><a href="https://www.wiremock.io?utm_source=oss-docs&utm_medium=oss-docs&utm_campaign=cloud-callouts-solutionjvm&utm_id=cloud-callouts&utm_term=cloud-callouts-solutionjvm" target="_BLANK">Centralize and scale your API mocks with WireMock Cloud.</a></div>

WireMock was originally created for Java development,
and there are plenty of solutions when developing applications powered by the Java Virtual Machine.

## WireMock

_WireMock_, also known as _WireMock Java_ is the flagman implementation of WireMock functionality and specifications,
maintained on the WireMock GitHub organization.
It is included into many distributions (including [WireMock Docker](../docker)), test framework adapters and products.
Most of the documentation on this website is about _WireMock Java_, unless specified explicitly.

Usage:

- [Running WireMock as a Standalone server](../../running-standalone)
- [Using WireMock in plain Java without frameworks](../../java-usage)

References:

- [WireMock Java on GitHub](https://github.com/wiremock/wiremock)

## Integrations with test frameworks

WireMock has integrations with many popular Java test frameworks
for unit and integration testing.

- [JUnit 5+ and Jupiter](../../junit-5)
- [JUnit 4 and Vintage](../../junit-4)
- [Testcontainers Java](https://github.com/wiremock/wiremock-testcontainers-java)
- [Spock](https://github.com/felipefzdz/spock-wiremock-extension) - maintained outside WireMock's organization on GitHub

## WireMock Extensions

_WireMock Java_ is [extensible](../../extending-wiremock),
and there is a number of available extensions that can be included into WireMock
to extend its functionality, including but not limited to request filters, observability, storage, etc.

A few popular extensions:

- Response Template Transformer
  - [Documentation](../../response-templating)
  - This extension is a built-in part of the WireMock Java, but needs to be enabled explicitly
- Webhooks
  - [Documentation](../../webhooks-and-callbacks/)
- JSON Body Transformer, Callback Simulator, Request time matcher
  - [9cookies/wiremock-extensions](https://github.com/9cookies/wiremock-extensions)
Active
- CORS Protection Extension
  - [RichieLoco/WiremockCorsExtension](https://github.com/RichieLoco/WiremockCorsExtension)

## Solutions specific to JVM technologies

Here are references to particular JVM technologies and languages,
sorted by alphabet:

- [Android](../android)
- [Clojure](https://docs.google.com/document/d/1TQccT9Bk-o2lvRVN8_mMaGttaOnwbYFLkn0DsmwGIOA/edit#heading=h.gvb3rxc1ab9p)
- [Groovy](../groovy)
- [Kotlin](../kotlin)
- [Pact](../pact)
- [Scala](https://docs.google.com/document/d/1TQccT9Bk-o2lvRVN8_mMaGttaOnwbYFLkn0DsmwGIOA/edit#heading=h.gvb3rxc1ab9p)
- [Spring Boot](../spring-boot)
