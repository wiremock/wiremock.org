---
layout: splash
title: Admin API Reference
meta_title: WireMock Admin REST API Documentation | WireMock
toc_rank: 120
description: The WireMock admin API is described in OpenAPI 3.0.
redirect_from:
    - "/wiremock-admin-api.html"
    - "/docs/api.html"
    - "/docs/api/"
---

<div class="cloud-callout"><a href="https://www.wiremock.io?utm_source=oss-docs&utm_medium=oss-docs&utm_campaign=cloud-callouts-adminapi&utm_id=cloud-callouts&utm_term=cloud-callouts-adminapi" target="_BLANK">WireMock Cloud offers secure, publicly hosted mock APIs with nothing to install.</a></div>

The WireMock admin API is described in [OpenAPI 3.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md). The spec file plus an instance of Swagger UI can be accessed from a running WireMock instance under `/__admin/docs/`, e.g. `http://localhost:8080/__admin/docs/`.

Below is the full API reference:

<redoc hide-hostname="true" path-in-middle-panel="true" spec-url="{{ '/assets/js/wiremock-admin-api.json' | absolute_url }}"></redoc>

<script src="{{ '/assets/js/redoc.standalone.js' | absolute_url }}"></script>
