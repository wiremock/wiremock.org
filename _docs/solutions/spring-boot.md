---
layout: solution
title: "Using WireMock with Spring Boot"
meta_title: Running WireMock with Spring Boot | WireMock
toc_rank: 116
description: The team behind Spring Cloud Contract have created a library to support running WireMock using the “ambient” HTTP server
redirect_from:
- "/docs/spring-boot.html"
logo: /images/logos/technology/spring.svg
---

<div class="cloud-callout"><a href="https://www.wiremock.io?utm_source=oss-docs&utm_medium=oss-docs&utm_campaign=cloud-callouts-solutionspringboot&utm_id=cloud-callouts&utm_term=cloud-callouts-solutionspringboot" target="_BLANK">Centralize and scale your API mocks with WireMock Cloud.</a></div>

<div class="cloud-callout"><a href="https://www.wiremock.io?utm_source=oss-docs&utm_medium=oss-docs&utm_campaign=cloud-callouts-solutionsspringboot&utm_id=cloud-callouts&utm_term=cloud-callouts-solutionsspringboot" target="_BLANK">Centralize and scale your API mocks with WireMock Cloud.</a></div>

## WireMock Spring Boot

[WireMock Spring Boot](https://github.com/wiremock/wiremock-spring-boot)
simplifies testing HTTP clients in Spring Boot & Junit 5 based integration tests.
It includes fully declarative WireMock setup,
supports multiple `WireMockServer` instances,
automatically sets Spring environment properties,
and does not pollute Spring application context with extra beans.

Example:

```java
@SpringBootTest
@EnableWireMock
class DefaultInstanceTest {

    @Value("${wiremock.server.baseUrl}")
    private String wiremockUrl;

    @Test
    void returnsTodos() {
        WireMock.stubFor(get("/ping")
            .willReturn(aResponse()
                .withStatus(200)));

        RestAssured
        .when()
            .get(this.wiremockUrl + "/ping")
        .then()
            .statusCode(200);
    }
}
```

## Spring Cloud Contract

The team behind Spring Cloud Contract have created a library to support running WireMock using the "ambient" HTTP server.
It also simplifies some aspects of configuration and eliminates some common issues that occur when running Spring Boot and WireMock together.

See [Spring Cloud Contract WireMock](https://docs.spring.io/spring-cloud-contract/docs/current/reference/html/project-features.html#features-wiremock) for details.

The article [Faking OAuth2 Single Sign-on in Spring](https://engineering.pivotal.io/post/faking_oauth_sso/)
from Pivotal's blog shows how WireMock can be used to test Spring apps that use 3rd party OAuth2 login.


## Jetty version issues when running WireMock and Spring together.

WireMock's main artifact is built on Jetty 11, largely so that Java 11 support can be maintained. However, many Spring applications depend on Jetty 12 and the presence of both on the classpath causes WireMock to fail with a `ClassNotFoundException` or `NoClassDefFoundError` for Servlet API classes thrown during startup.

To rectify this, WireMock now has a dedicated Jetty 12 artifact which can be added to your project's classpath. See the [Jetty 12 page](../../jetty-12/) for details.


## Useful pages

- [WireMock on Java and JVM](../jvm) - Most of JVM generic solutions are applicable to Spring Boot  development too
