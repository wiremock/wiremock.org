---
layout: docs
title: Proxying
toc_rank: 46
description: Proxying requests to other systems
---

When working with an existing API it can be useful to pass some requests through to it for testing, while
serving stubbed responses for others.
 
For instance, if an API is not yet fully implemented then testing progress can still be made
for the calling application by stubbing the parts not yet completed.

Additionally, proxying all but a selection of requests enables testing of edge and failure cases that would be hard to
replicate predictably in the target API.

## Usage

Proxying is configured per-stub. When a stub is configured to serve a proxy response, all of the normal request matching rules
apply, but instead of returning a canned response, the request is forwarded to the target.

Proxying is enabled by selecting the Proxy tab in the stub's Response section and completing (at a minimum) the base URL field.

Additional request headers can optionally be specified. These will be added to the proxy request if not already present,
or will override the existing value if present.

<img src="/images/screenshots/plain-proxy-response.png" title="Proxy response"/>
 
The relative part of a request's URL will be appended onto the base URL, so given a proxy base URL of `http://my-site.com/base`, a
 request made to `http://my-mock-api.mocklab.io/things/1` would result in a proxy request to `http://my-site.com/base/things/1`.


## Templating the base URL

When the Enable templating check box is ticked, the base URL can be a handlebars template, meaning that properties from the
incoming request can be used to determine the URL. See [Response Templating](/docs/response-templating/) for details of the
model and syntax used.

<img src="/images/screenshots/templated-proxy-response.png" title="Proxy response with templating"/>


## The proxy/intercept pattern

It is often desirable to proxy requests by default while stubbing a few specific cases. This can be achieved using a variation
of the [Default Responses](/docs/default-responses/) approach.

In summary, the proxy stub is created to be the default, with broad request matching criteria and a low priority value. Then
 individual stubs are created at higher priorities with specific request URLs, bodies or anything else distinguishing.
 
Examples of things these specific stubs can be used for are:

* Return an HTTP 503 response
* Return response data in a format not expected by your app's client
* Close the connection prematurely without sending a response (see [Simulating Faults](/docs/simulating-faults/))