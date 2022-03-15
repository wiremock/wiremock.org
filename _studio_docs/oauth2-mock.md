---
layout: docs
title: The OAuth2 / OpenID Connect Mock
toc_rank: 56
description: Using the OAuth2 / OpenID Connect Mock
keywords: oauth,oauth2,openid connect,google oauth,google login
---

<div style="display:flex;justify-content: center;margin-bottom:2em">
  <img src="/images/oauth-2-logo.png" alt="OAuth2" style="border:none;margin-right:10px;height: 90px;width: 92px;"/>
  <img src="/images/openid-icon-100x100.png" alt="OpenID Connect" style="border:none;margin-left:10px;height:90px"/>
</div>

This is a simulation of an **OAuth2** / **OpenID Connect** login service that you can use as a **drop-in replacement** for the real thing during testing. It's free to use, and completely stateless so can accommodate virtually any number of concurrent clients (at least until the server runs out of breath!).

Currently the `authorization_code` (server-side web) OAuth2 flow is supported.

## Using with your app
Start by finding the OAuth2 configuration in your app's server-side component. Where this is located
varies from app to app - sometimes it can be found in a configuration file, other times it is set
directly in code. If you're using an SDK from your login service, you may need to override the defaults this provides.

Set the following values:

* Authorization URI: `https://oauth.mocklab.io/oauth/authorize`
* Token URI: `https://oauth.mocklab.io/oauth/token`
* User info URI: `https://oauth.mocklab.io/userinfo`
* JWKS URI: `https://oauth.mocklab.io/.well-known/jwks.json`

You can [see here](https://github.com/mocklab/mocklab-demo-app/blob/master/src/main/resources/application.yml#L8){:target="{{site.data.misc.blank}}"} how this is done in a Spring Boot application.

After that, when you start the login process from your app you should be sent to
a simulated login page, rather than the one belonging to your real provider. You
can log in with any email address and password you like, real or not.

<img src="/images/screenshots/mock-oauth2-login.png" alt="Mock login form" style="border: none;width: 300px;" />

## Demo application
If you just want to see this simulation in action, this [demo app](https://mocklab-demo.herokuapp.com/login){:target="{{site.data.misc.blank}}"} shows the OAuth2 and OpenID Connect flows in action. [Full source code](https://github.com/mocklab/mocklab-demo-app){:target="{{site.data.misc.blank}}"} for the demo is available.

## Making and customising your own OAuth2 mock
If you'd like to enhance or modify this simulation, you can select OAuth2 / OpenID Connect
as a template when creating a new API in MockLab:

<img src="/images/screenshots/mock-api-templates.png" alt="Mock API templates" style="border: none;width: 400px;" />

This will pre-load your API with all the necessary stubs, which you can modify and
add to in the usual way.

## Questions and feedback
If you're not sure how something works or have a suggestion for improving this simulation, please get in touch with us
via [info@mocklab.io](mailto:info@mocklab.io) or the chat widget.
