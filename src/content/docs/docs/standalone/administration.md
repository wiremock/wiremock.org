---
title: "Administration API"
---

<!-- TODO: Review and update relative links for Starlight structure -->


<br>


:::note[WireMock Cloud]

    [WireMock Cloud offers secure, publicly hosted mock APIs with nothing to install.](https://www.wiremock.io?utm_source=oss-docs&utm_medium=oss-docs&utm_campaign=cloud-callout-administrations&utm_id=cloud-callouts&utm_term=cloud-callouts-administration)

:::

WireMock Standalone offers the REST API for administration, troubleshooting and analysis purposes.
You can find the key use-cases and the full specification below.

## Fetching all of your stub mappings (and checking WireMock is working)

A GET request to the mappings admin URL e.g `http://localhost:8080/__admin/mappings`
will return all currently registered stub mappings.
This is a useful way to check whether WireMock is running on the host and port you expect.

### Shutting Down

To shutdown the server,
post a request with an empty body to `http://<host>:<port>/__admin/shutdown`.

## Full specification

The full specification is available [here](../../standalone/admin-api-reference/).
