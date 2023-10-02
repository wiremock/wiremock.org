---
layout: docs
title: Frequently Asked Questions
meta_title: "Frequently Asked Questions in WireMock"
description: >
    Frequently asked questions and best practices regarding anything WireMock.
---

Here, you can find information about what API mocking and WireMock are, as well as recommendations and best practices for different challenges in various areas of WireMock.

## API mocking and WireMock as a service

### What is WireMock?

WireMock is a free API mocking tool that can be run as a standalone server, or in a hosted version via the [WireMock Cloud](https://wiremock.io/) managed service.

### What is API mocking?

API mocking involves creating a simple simulation of an API, accepting the same types of request and returning identically structured responses as the real thing,
enabling fast and reliable development and testing.

### When do you need to mock APIs?

API mocking is typically used during development and testing as it allows you to build your app without worrying about 3rd party APIs or sandboxes breaking.
It can also be used to rapidly prototype APIs that don’t exist yet.

### How do you create an API mock?

WireMock supports several approaches for creating mock APIs - in code, via its REST API, as JSON files and by recording HTTP traffic proxied to another destination.

### What makes WireMock unique?

WireMock has a rich [matching system](../request-matching/), allowing any part of an incoming request to be matched against complex and precise criteria.
Responses of any complexity can be dynamically generated via the Handlebars based templating system.
Finally, WireMock is easy to integrate into any workflow due to its numerous [extension points](../extending-wiremock/) and comprehensive APIs.

### Is WireMock open source?

Yes, WireMock is a completely open source API mocking tool [GitHub repository](https://github.com/wiremock/wiremock).
If you’re looking for a hosted version of WireMock, check out [WireMock Cloud](https://wiremock.io/).

### Is WireMock a free service?

WireMock is completely free under the Apache 2.0 license.

## Technical questions

### How to manage many mocks across different use cases and teams?

This question is valid especially when it is getting difficult to keep track of what test case(s) a particular mock was meant for.

#### Potential solutions
- Create your stubs (or most of them at least) in the test cases themselves, then [reset them](../stubbing/#reset) each time.
- Use the [`metadata` element](../stub-metadata/) in the stub data to tag stubs with info relating them to specific test cases.

#### Potential solutions for WireMock standalone
- Use configuration-as-code, and store your definitions in a repository. You can have a hierarchical structure of Mappings and Files to specify teams.
    - Disabling the modifying APIs after moving to configuration-as-code is also highly recommended, so that teams cannot break each other's mocks.
- Introduce "subprojects" by having each app/team to use `$WIREMOCK_URL/$PROJECT_ID` or even `$WIREMOCK_URL/$TEAM_ID/$PROJECT_ID`.
- Do performance monitoring for your instance, because a single shared WireMock instance can be overloaded if multiple teams execute performance/stress tests on it.
If the workload is exceeded, you can split it into multiple instances, or consider [WireMock Cloud](https://www.wiremock.io/) which is scalable.
