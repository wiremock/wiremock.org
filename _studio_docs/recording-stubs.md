---
layout: docs
title: Recording Stubs
toc_rank: 41
description: Creating new stubs by recording traffic to another API
---

If the API you're mocking already exists you can speed up the process of stubbing responses using WireMock's record feature.
This essentially involves telling WireMock to act as a proxy to the target API then directing some HTTP requests to WireMock 
representing the resources you'd like to stub.

## A simple recording example

Start by navigating to the Stubs page in your mock API (creating one first if necessary).

Then hit the <img src="/images/screenshots/record-button-screenshot.png" title="Record" style="height: 35px"/> button,
enter `https://api.github.com` as the target URL and hit <img src="/images/screenshots/start-button-screenshot.png" title="Start" style="height: 35px"/>.

<img src="/images/screenshots/record-dialog-screenshot-3.png" title="Record dialog" class="boxed-image" style="width:80%"/>

Now make a request to your mock API:

```bash
$ curl -v http://localhost:8000/users
```

This request will be proxied through WireMock, so that a `GET` request will be made to `https://api.github.com/users` and the result captured.

Now hit <img src="/images/screenshots/stop-button-screenshot.png" title="Stop" style="height: 35px; border: none"/>, and you should see that an extra stub has been added to the list.


## Request matching rules when recording

When a request with no body is received during recording, the recorder will create a stub matched on HTTP method and URL only.
 
When a request with a body is received a body pattern is also included. If the request body is a valid JSON document,
then the `equalToJson` operator will be used. If XML, the `equalToXml` operator will be used. Otherwise the operator will be `equalTo` i.e. simple string equality.
