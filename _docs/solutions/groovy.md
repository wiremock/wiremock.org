---
layout: solution
title: "WireMock and Groovy"
meta_title: "Groovy Solutions | WireMock"
description: "Additional solutions for WireMock when using Groovy"
logo: /images/logos/technology/groovy.svg
---

<div class="cloud-callout"><a href="https://www.wiremock.io?utm_source=oss-docs&utm_medium=oss-docs&utm_campaign=cloud-callouts-solutionsgroovy&utm_id=cloud-callouts&utm_term=cloud-callouts-solutionsgroovy" target="_BLANK">Centralize and scale your API mocks with WireMock Cloud.</a></div>

## DSL Bindings

There is a [Groovy DSL binding library](https://github.com/tomjankes/wiremock-groovy) 
that allows to manage the WireMock JUnit rule via declarative Spock-alike definitions.
Note that this library is maintained outside the WireMock organization on GitHub,
and likely to be obsolete.

```groovy
@Rule
WireMockRule wireMockRule = new WireMockRule()

def wireMockStub = new WireMockGroovy()

def "example verifying test" () {
    ...
    then:
    1 == wireMockStub.count {
        method "GET"
        url "/some/url"
    }
}

def "test using groovy truth if you need at least one request and shows example matcher" () {
    ...
    then:
    wireMockStub.count {
        method "POST"
        url "/some/url"
        headers {
            "Content-Type" {
                matches ".*xml"
            }
        }
    }
}
```

## Useful pages

- [WireMock on Java and JVM](../solutions/jvm) - Most of JVM generic solutions are applicable to Groovy development too
