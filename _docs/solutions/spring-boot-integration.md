---
layout: solution
title: "Using WireMock with Spring Boot"
meta_title: Running WireMock with Spring Boot | WireMock
description: The team behind Spring Cloud Contract have created a library to support running WireMock using the “ambient” HTTP server
redirect_from:
- "/docs/solutions/spring-boot.html"
- "/docs/solutions/spring-boot/"
logo: /images/logos/technology/spring.svg
hide-disclaimer: true
---

<div class="cloud-callout"><a href="https://www.wiremock.io?utm_source=oss-docs&utm_medium=oss-docs&utm_campaign=cloud-callouts-solutionspringboot&utm_id=cloud-callouts&utm_term=cloud-callouts-solutionspringboot" target="_BLANK">Centralize and scale your API mocks with WireMock Cloud.</a></div>

## WireMock Spring Boot

WireMock's official Spring Boot integration library is the simplest way to configure Spring Boot, Junit 5 and WireMock to work together.


It includes fully declarative WireMock setup, supports multiple `WireMockServer` instances, automatically sets Spring environment properties,
and does not pollute Spring application context with extra beans.

See [WireMock Spring Boot Integration](/docs/spring-boot/) for details on installation and usage.

You can contribute or log an issue in the [GitHub project](https://github.com/wiremock/wiremock-spring-boot).

## Spring Cloud Contract

WireMock provides the mocking capabilities for the Spring Cloud Contract project (a consumer-driven contract testing tool).

See [Spring Cloud Contract WireMock](https://docs.spring.io/spring-cloud-contract/docs/current/reference/html/project-features.html#features-wiremock) for details.

## Jetty version issues when running WireMock and Spring together.

WireMock's main artifact is built on Jetty 11, largely so that Java 11 support can be maintained. However, many Spring applications depend on Jetty 12 and the presence of both on the classpath causes WireMock to fail with a `ClassNotFoundException` or `NoClassDefFoundError` for Servlet API classes thrown during startup.

To rectify this, WireMock now has a dedicated Jetty 12 artifact which can be added to your project's classpath. See the [Jetty 12 page](../../jetty-12/) for details.


## Useful pages

- [WireMock on Java and JVM](../jvm) - Most of JVM generic solutions are applicable to Spring Boot  development too
