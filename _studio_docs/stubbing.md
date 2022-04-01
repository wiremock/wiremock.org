---
layout: docs
title: Stubbing Basics
description: How to set up a basic stub in WireMock Studio
---


WireMock is an HTTP stubbing tool. This means that
it can be configured to return specific canned responses depending on the request.

This can be a simple as just matching the URL, right up to a combination of URL, header and body matches using regexes,
JSONPath, XPath and others.


## Creating a basic stub
Select the mock API you'd like to work in, then navigate to the Stubs page and hit the <img style="margin-bottom: 0.8rem; vertical-align: middle; border: none; height: 30px" src="/images/screenshots/new-stub-button.png" title="New stub"/> button. Change the URL field from the
default value to whatever you'd like to match on e.g. `/hello-world`.

<img src="/images/screenshots/basic-new-stub.png" title="New stub request" class="boxed-image">

In the Response section, set HTTP status, headers and body text. Typically it is a good idea to send a
`Content-Type` header in HTTP responses, so add one by clicking <img style="margin-bottom: 0.8rem; vertical-align: middle; border: none; height: 30px" src="/images/screenshots/new-header-button.png" title="New header"/> and setting `Content-Type` to `application/json`.


<img src="/images/screenshots/basic-response.png" title="Basic stub response" class="boxed-image">

Hit Save, then you're ready to test your stub. Point your browser to `http://localhost:8000/hello-world`.
You should see the body text `Hello World!!!` that you entered into the body text box. You can find out what your
subdomain is on the Settings page for the mock API.

<img src="/images/screenshots/mock-api-browser-screenshot.png" title="Mock response served in browser">
