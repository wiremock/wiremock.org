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
 request made to `http://localhost:8000/things/1` would result in a proxy request to `http://my-site.com/base/things/1`.


## Templating the base URL

When the Enable templating check box is ticked, the base URL can be a handlebars template, meaning that properties from the
incoming request can be used to determine the URL. See [Response Templating](/studio/docs/response-templating/) for details of the
model and syntax used.

<img src="/images/screenshots/templated-proxy-response.png" title="Proxy response with templating"/>


## The proxy/intercept pattern (proxy by default)

It is often desirable to proxy all requests to another endpoint by default, then stubbing a few specific cases.
This enables a few useful workflows including stubbing API features that haven't been implemented yet, and stubbing specific
errors that are hard to reliably replicate in the target API e.g.

* Return an HTTP 503 response
* Return response data in a format not expected by your app's client
* Close the connection prematurely without sending a response (see [Simulating Faults](/studio/docs/simulating-faults/))

This can be achieved using a variation of the [Default Responses](/studio/docs/default-responses/) approach and setting the default response to Proxy:


<img src="/images/screenshots/proxy-all-by-default-stub.png" title="Proxy all by default stub"/>


Note how the priority is set to 9, so that the proxy stub has lower precendence than other stubs you create, which will default to a priority of 5.