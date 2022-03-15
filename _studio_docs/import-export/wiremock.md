---
layout: docs
title: Import & Export - WireMock
description: Importing and exporting mock APIs between WireMock and MockLab.
---

MockLab and WireMock share the same native JSON format for stubs, so mock APIs
can be imported and exported between the two.

JSON exports can also be stored in source control, and used to clone or move stubs
between MockLab APIs.

## Importing a mock API into MockLab from WireMock

Assuming you're running a WireMock instance on port 8080, you can export all the
stubs currently defined via the admin API:

```
curl --output example-stubs.json http://localhost:8080/__admin/mappings
```

Then to import into MockLab, open the Import dialog and drop or upload the `example-stubs.json`:

<img alt="Import file" src="/images/screenshots/import-file.png" style="width: 80%"/>

> **Note**
>
> A current limitation of this approach is that response bodies represented as
> files under the `__files` directory will not be imported.
> See how this can be worked around by [uploading a WireMock project folder](#uploading-a-wiremock-folder)
> and via the [WireMock Java API](#pushing-stubs-to-mocklab-using-wiremocks-java-api).

## Importing a mock API into WireMock from MockLab

First, export the stubs via the Export dialog in the Stubs page:

<img alt="Export dialog" src="/images/screenshots/export-stubs.png" style="width: 60%"/>

Then call the WireMock import API with the file you downloaded:

```
curl -v -d @example-stubs.json http://localhost:8080/__admin/mappings/import
```

Alternatively you can copy `example-stubs.json` into the `mappings` directory
under your WireMock root and either restart WireMock or make a `POST` request to the
reset API:

```
curl -v -X POST http://localhost:8080/__admin/mappings/reset
```

> **Note**
>
> If any of your stubs make use of **response templating** then you'll need to ensure WireMock
> is started with the `--local-response-templating` CLI parameter
> or [Java equivalent](http://wiremock.org/docs/response-templating/).


> **Note**
>
> It is not currently possible to import stubs that use the JWT and JWKS template helpers
> into WireMock.

## Uploading a WireMock folder

If you have a WireMock project that consists of individual JSON stub mapping
files under the `mappings` directory that refer to response body files under `__files`
you can import this by dragging and dropping the project folder into the dialog.
Unlike the method involving a single JSON file described above, this will cause the
response bodies under `__files` to be inlined.

<img alt="Import file" src="/images/screenshots/wiremock-folder-drop.png" style="width: 80%"/>


## Pushing stubs to MockLab using WireMock's Java API

Another way to import a WireMock project that has a `__files` directory is to push it using WireMock's Java API.
This method also inlines response bodies before sending them to MockLab:

```java
WireMock wireMock = WireMock.create()
    .scheme("https")
    // The domain name of the mock API you wish to import into
    .host("my-api.mocklab.io")
    .port(443)
    // API token from https://app.mocklab.io/account/api
    .authenticator(new ClientTokenAuthenticator("mytokenabc123"))
    .build();

// The root directory of the WireMock project, under which the mappings and __files directories should be found
wireMock.loadMappingsFrom("/wiremock");
```
