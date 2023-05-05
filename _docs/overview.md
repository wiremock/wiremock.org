---
layout: docs
title: Overview
meta_title: WireMock Overview and Basics
toc_rank: 1
description: Top-level overview of WireMock
---

**WireMock** is a popular open-source tool for API mock testing
with over 5 million downloads per month.
It can help you to create stable test and development environments,
isolate yourself from flakey 3rd parties
and simulate APIs that don't exist yet.

Started in 2011 as a Java library by [Tom Akehurst](https://github.com/tomakehurst),
now WireMock spans across multiple programming languages and technology stacks.
It can run as a library or client wrapper in many languages, or as a standalone server.
There is a big community behind the project and its ecosystem.

WireMock supports several approaches for creating mock APIs -
in code, via its REST API, as JSON files and by recording HTTP traffic proxied to another destination.
WireMock has a rich matching system, allowing any part of an incoming request to be matched against complex and precise criteria.
Responses of any complexity can be dynamically generated via the Handlebars based templating system.
Finally, WireMock is easy to integrate into any workflow due to its numerous extension points and comprehensive APIs.

## Key features

- HTTP response stubbing, matchable on URL, header and body content patterns
- Request verification
- Runs in unit tests, as a standalone process or as a WAR app
- Record/playback of stubs
- Configurable response delays and Fault injection
- Per-request conditional proxying
- Browser proxying for request inspection and replacement
- Stateful behaviour simulation

All the features are configurable via a fluent Java API and JSON files,
or via JSON over HTTP for the standalone service.

## Getting Started

Check out WireMock Quick-starts and tutorials [here](../getting-started).

## WireMock Ecosystem

WireMock has implementations and adapters for other languages and test frameworks.
It supports adapters and implementations for various technology stacks, including Python, .NET, Golang, and Rust.
For the JVM ecosystem, there are libraries for Spring Boot, Quarkus, Kotlin, Testcontainers and other.
WireMock can also run on Android support, and soon to provide official gRPC and GraphQL adapters.

You can learn more about [WireMock Ecosystem here](https://github.com/wiremock/ecosystem).
