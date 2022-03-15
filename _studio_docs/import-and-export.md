---
layout: docs
title: Import & Export - Overview
description: Importing and exporting mock API stubs in Swagger, OpenAPI and MockLab/WireMock format.
---

You can import your and [Swagger](/docs/swagger/) and [OpenAPI](/docs/swagger/) specifications and [Postman](/docs/import-export/postman) collections into MockLab in order
to auto-generate stubs in your mock API. Swagger 2.x and OpenAPI 3.x are supported,
in both JSON and YAML format.

You can also import and export stubs in [WireMock](/docs/import-export/wiremock/) JSON format. This can be used
to move projects between WireMock and MockLab, store your mock APIs in source control
and make copies of MockLab APIs.

## Importing - basics

To import from any of the supported formats, navigate to the Stubs page of the
mock API you'd like to import into, then click the Import button.

<img alt="Import button" src="/images/screenshots/import-button-on-toolbar.png" style="width: 80%;border:none;"/>

Then either paste the content to be imported:

<img alt="Import text" src="/images/screenshots/import-text.png" style="width: 80%"/>

Or upload it as a file:

<img alt="Import file" src="/images/screenshots/import-file.png" style="width: 80%"/>

The WireMock JSON format is also MockLab's native format, so when a file of this type is imported
it the stubs created correspond exactly to the file contents.

However, when importing from Swagger and OpenAPI stubs are generated according to
a set of conversion rules. These can be [tweaked and customised in a number of ways](/docs/swagger/#customising-the-import).

You can also automate imports via [MockLab's API](/docs/import-export/api).


## Exporting

To export the current mock API's stubs in MockLab/WireMock JSON format, click the Export button:

<img alt="Export button" src="/images/screenshots/export-button-on-toolbar.png" style="width: 80%;border:none;"/>

Then click the download link:

<img alt="Export dialog" src="/images/screenshots/export-stubs.png" style="width: 60%"/>
