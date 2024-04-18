---
layout: solution
title: WireMock and Node.js
meta_title: Node.js Solutions | WireMock
description: Additional solutions for WireMock when using Node.js
logo: /images/logos/technology/nodejs.svg
---

<div class="cloud-callout"><a href="https://www.wiremock.io?utm_source=oss-docs&utm_medium=oss-docs&utm_campaign=cloud-callouts-solutionnode&utm_id=cloud-callouts&utm_term=cloud-callouts-solutionnode" target="_BLANK">Centralize and scale your API mocks with WireMock Cloud.</a></div>

## WireMock Captain

WireMock Captain provides an easy interface for testing HTTP-based APIs.
Tests are implemented in TypeScript or JavaScript with the Node.js runtime.
Mocking is performed by WireMock, which typically runs in a Docker container.
Note that this library is maintained outside the WireMock organization on GitHub.

- [GitHub Repository](https://github.com/HBOCodeLabs/wiremock-captain)

Example:

```javascript
import { WireMock } from 'wiremock-captain';

describe('Integration with WireMock', () => {
  // Connect to WireMock
  const wiremockEndpoint = 'http://localhost:8080';
  const mock = new WireMock(wiremockEndpoint);

  test('mocks downstream service', async () => {
    const request: IWireMockRequest = {
      method: 'POST',
      endpoint: '/test-endpoint',
      body: {
        hello: 'world',
      },
    };
    const mockedResponse: IWireMockResponse = {
      status: 200,
      body: { goodbye: 'world' },
    };
    await mock.register(request, mockedResponse);

    // rest of the test
  });
});
```

## WireMock REST Client

The WireMock REST client is a lightweight module to interact with a running
WireMock server based on its [OpenAPI 3.0 spec](../../api) via REST API.
Note that this library is maintained outside the WireMock organization on GitHub.

- [GitHUb Repository](https://github.com/kwoding/wiremock-rest-client)

```javascript
import { WireMockRestClient } from 'wiremock-rest-client';

const wireMock = new WireMockRestClient('http://localhost:8080');
const stubMappings = await wireMock.mappings.getAllMappings();
console.log(stubMappings);

await wireMock.global.shutdown();
```

## WireMock NPM package

The WireMock NPM package is the WireMock standalone JAR packaged inside an NPM package. It has the exact same features as WireMock standalone and uses the same versioning.

The main benefit of packaging it inside an NPM package is that the user will only need access to an NPM registry to use it. This is often the situation when working behind firewalls in organizations.

- [GitHUb Repository](https://github.com/wiremock/wiremock-npm)
