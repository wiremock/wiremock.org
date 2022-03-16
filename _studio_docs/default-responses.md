---
layout: docs
title: "Serving a Default Response"
toc_rank: 51
description: Serving default responses when no specific match is found
---

By default MockLab will serve a generic 404 page if an incoming HTTP request is not matched to any stub mapping.
Often this is not a problem, but in some instances it is desirable to serve your own response.

This can be achieved using the Priority parameter when creating stubs. By creating a stub which has loose (non-specific)
matching criteria and a low priority setting, requests will "fall through" to this if they're not matched to a more specific stub.

## Example

Suppose you want to serve a `403 Unauthorized` response with a meaningful response body when a request is not matched rather than the default 404. Additionally you
want to serve 200 response when a `GET` request is made to `/examples/12`.

Start by creating a stub with `ANY` as the method. Open the Advanced section and change the URL match type to `Any URL`.
Also in the Advanced section set the Priority to 10 (the lowest).

<img src="/images/screenshots/default-response-example-request.png" title="Default request"/>

In the Response section, set the Status to `403` and the body content to `"Sorry, you can't do that"`.

<img src="/images/screenshots/default-response-example-response.png" title="Default response"/>

Create a second stub with the method set to `GET`, the URL to `/examples/12` and the response body to `"Example 12 body"` (keeping the Status as `200`).


Now if you make a request that matches the specific stub you will see a response with a `200` status and the success message:

```
$ curl -v http://example.mocklab.io/examples/12

> GET /examples/12 HTTP/1.1
> Host: example.mocklab.io
> User-Agent: curl/7.54.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Transfer-Encoding: chunked
<
Example 12 body
```


Whereas if you make a request to a URL with no stub to match you will see the default `403` response.

```
$ curl -v http://example.mocklab.io/examples/12222222

> GET /examples/12222222 HTTP/1.1
> Host: example.mocklab.io
> User-Agent: curl/7.54.0
> Accept: */*
>
< HTTP/1.1 403 Forbidden
< Transfer-Encoding: chunked
<
Sorry, you can't do that
```
