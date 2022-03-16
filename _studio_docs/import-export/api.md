---
layout: docs
title: Import & Export - Via the API
description: Automating import and export of mock API stubs via MockLab's API.
---

A mock API's stubs can be exported in bulk via the admin API. This can be useful for backing
up your API to source control, or cloning the contents of one API into another.

## Importing

To import any of the supported formats (Swagger, OpenAPI, MockLab WireMock JSON),
execute a `POST` request to the stub import URL e.g.:

```bash
curl -v \
  --data-binary @my-swagger-spec.yaml \
  -H 'Authorization:Token my-api-token' \
  https://my-api.mocklab.io/__admin/mocklab/imports
```

## Exporting in MockLab/WireMock JSON format

To export an API's stubs, execute a `GET` request to the stub mappings admin URL e.g.:

```bash
curl --output my-stubs.json \
  -H 'Authorization:Token my-api-token' \
  https://my-api.mocklab.io/__admin/mappings
```


You can find your API token at [https://app.mocklab.io/account/api](https://app.mocklab.io/account/api){:target="{{site.data.misc.blank}}"}.
