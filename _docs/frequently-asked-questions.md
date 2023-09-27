---
layout: docs
title: Frequently Asked Questions
meta_title: "Frequently Asked Questions in WireMock"
description: >
    Frequently asked questions and best practices regarding anything WireMock.
---

## Frequently Asked Questions

Here you can find answers to questions in various areas of WireMock, providing recommendations and best practices for different challenges.

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
