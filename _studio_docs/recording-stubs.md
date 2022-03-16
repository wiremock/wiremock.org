---
layout: docs
title: Recording Stubs
toc_rank: 41
description: Creating new stubs by recording traffic to another API
---

If the API you're mocking already exists you can speed up the process of stubbing responses using MockLab's record feature.
This essentially involves telling MockLab to act as a proxy to the target API then directing some HTTP requests to MockLab 
representing the resources you'd like to stub.

## A simple recording example

Once you have logged into MockLab and created a mock API, navigate to the Stubs page.

Then hit the <img src="/images/screenshots/record-button-screenshot.png" title="Record" style="height: 42px; border: none"/> button,
enter `http://ip-api.com` as the target URL and hit <img src="/images/screenshots/start-button-screenshot.png" title="Start" style="height: 46px; border: none"/>.

<img src="/images/screenshots/record-dialog-screenshot-3.png" title="Record dialog" style="width: 80%"/>

Now make a request to your mock API (substituting `my-mock-api` for your own sub domain name):

```bash
$ curl -v http://my-mock-api.mocklab.io/json
```

This request will be proxied through MockLab, so that a `GET` request will be made to `http://ip-api.com/json` and the result captured.

Now hit <img src="/images/screenshots/stop-button-screenshot.png" title="Stop" style="height: 46px; border: none"/>, and you should see that an extra stub has been added to the list.


## Request matching rules when recording

When a request with no body is received during recording, the recorder will create a stub matched on HTTP method and URL only.
 
When a request with a body is received a body pattern is also included. If the request body is a valid JSON document,
then the `equalToJson` operator will be used. If XML, the `equalToXml` operator will be used. Otherwise the operator will be `equalTo` i.e. simple string equality.
