---
layout: docs
title: Import & Export - Via the API
meta_title: Import and export mock API stubs using the WireMock admin API | Wiremock
description: Automating import and export of mock API stubs via WireMock's API.
---

A mock API's stubs can be exported in bulk via the admin API. This can be useful for backing
up your API to source control, or cloning the contents of one API into another.

## Importing

To import any of the supported formats (Swagger, OpenAPI, Postman, WireMock JSON),
execute a `POST` request to the stub import URL e.g.:

```bash
curl -v \
  --data-binary @my-swagger-spec.yaml \
  http://localhost:8000/__admin/mocklab/imports
```

## Exporting in WireMock JSON format

To export an API's stubs, execute a `GET` request to the stub mappings admin URL e.g.:

```bash
curl --output my-stubs.json \
  http://localhost:8000/__admin/mappings
```