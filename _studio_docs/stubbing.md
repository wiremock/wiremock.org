---
layout: docs
title: Stubbing Basics
toc_rank: 20
description: Overview of MockLab's stubbing capabilities
---


MockLab at its core, like [WireMock](http://wiremock.org) which underpins it is an HTTP stubbing tool. This means that
it can be configured to return specific canned responses depending on the request.

This can be a simple as just matching the URL, right up to a combination of URL, header and body matches using regexes,
JSONPath, XPath and others.


## Creating a basic stub
Select the mock API you'd like to work in, then navigate to the Stubs page and hit the <img style="margin-bottom: 0.8rem; vertical-align: middle; border: none; height: 45px" src="/images/screenshots/new-stub-button.png" title="New stub"/> button. Change the URL field from the
default value to whatever you'd like to match on e.g. `/hello-world`.

<img src="/images/screenshots/basic-new-stub.png" title="New Stub Request" >

In the Response section, set HTTP status, headers and body text. Typically it is a good idea to send a
`Content-Type` header in HTTP responses, so add one by clicking <img style="margin-bottom: 0.8rem; vertical-align: middle; border: none; height: 45px" src="/images/screenshots/new-header-button.png" title="New header"/> and setting `Content-Type` to `application/json`.


![Basic response](/images/screenshots/basic-response.png)

Hit Save, then you're ready to test your stub. Point your browser to `http://<your-subdomain>.mocklab.io/hello-world`.
You should see the body text `Hello World!!!` that you entered into the body text box. You can find out what your
subdomain is on the Settings page for the mock API.

![Mock response served](/images/screenshots/mock-api-browser-screenshot.png)
