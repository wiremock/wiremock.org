---
layout: docs
title: Response Templating - JSON Web Tokens (JWT)
redirect_from:
  - /docs/jwt/
description: Working with JSON Web Tokens (JWTs)
keywords: jwt,json web token,jwks
---

Many modern APIs, in particular those concerned with authentication and authorization,
generate [JSON Web Tokens (JWTs)](https://jwt.io/){:target="{{site.data.misc.blank}}"} for their clients to use.

JWTs must be cryptographically signed in order to be valid, which means they cannot
be simply be generated using ordinary templating primitives. Signing can be via
one of a number of algorithms, but by far the two most common are `HS256` (shared secret)
and `RS256` (public/private key).

In order to enable creation of valid JWTs MockLab provides a pair of template helpers
specifically for this purpose: `jwt` and `jwks`.

Both `HS256` and `RS256` signed tokens are supported.

If you'd like to see these features in action, take a look at the [OAuth2 mock](/docs/oauth2-mock/)
hosted by MockLab, which is also available to use as an template when creating your own mock API.

## Generating a token

You can generate a token in a stub response by enabling templating
and simply adding the following to the respobse body:

{% raw %}
```handlebars
{{{jwt maxAge='12 days'}}}
```
{% endraw %}

This will select defaults
for all the required values, set a 100 year expiry term and sign the token using `HS256` (shared secret).

### Expiry date

You can customise expiry term either by setting the `maxAge` parameter e.g.

{% raw %}
```handlebars
{{{jwt maxAge='12 days'}}}
```
{% endraw %}

or by setting an absolute expiry date e.g.

{% raw %}
```handlebars
{{{jwt exp=(parseDate '2040-02-23T21:22:23Z')}}}
```
{% endraw %}

You can similarly set the `nbf` (not before) date:

{% raw %}
```handlebars
{{{jwt nbf=(parseDate '2018-02-23T21:22:23Z')}}}
```
{% endraw %}

### Standard claims

Standard claims can be set as follows.

Issuer:

{% raw %}
```handlebars
{{{jwt iss='https://jwt-example.mocklab.io/'}}}
```
{% endraw %}

Audience:

{% raw %}
```handlebars
{{{jwt aud='https://jwt-target.mocklab.io/'}}}
```
{% endraw %}

Subject:

{% raw %}
```handlebars
{{{jwt sub='jonsmith'}}}
```
{% endraw %}

### Custom claims

You can also set any custom claim you wish via named parameters e.g.

{% raw %}
```handlebars
{{{jwt
    isAdmin=true
    quota=23
    score=0.96
    email='jonsmith@example.mocklab.io'
    signupDate=(parseDate '2017-01-02T03:04:05Z')
}}}
```
{% endraw %}

### Signing with RS256

By setting the `alg` parameter, the token can be signed using the public/private key
algorithm:

{% raw %}
```handlebars
{{{jwt alg='RS256'}}}
```
{% endraw %}

## Retrieving keys

For clients to be able to validate JWTs, they need to be able to retrieve either
the shared secret or the public key, depending on the signing algorithm.

### Getting all keys for your mock API

The keys used to sign tokens for a particular mock API can be retrieved via the
settings admin API resource. To fetch these via curl, you can do the following:

```
curl -H 'Authorization:Token <your MockLab API token>' https://your-mock-api.mocklab.io/__admin/settings
```

This will return a JSON document like this, from which you can retrieve the any of the
keys:

```json
{
  "settings": {
    "extended": {
      "jwt": {
        "hs256Secret": "...",
        "rs256PublicKeyId": "...",
        "rs256PublicKey": "-----BEGIN RSA PUBLIC KEY-----\n...\n-----END RSA PUBLIC KEY-----\n",
        "rs256PrivateKey": "-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----\n"
      }
    }
  }
}
```

### The JSON Web Key Set (JWKS)

When using `RS256` (public/private key) signing, it is common for clients to fetch
the public key for verification via a JSON Web Key Set (JWKS) endpoint. You serve
a JWKS from your mock API simply by adding a stub containing the following response
body (with templating enabled):

{% raw %}
```handlebars
{{{jwks}}}
```
{% endraw %}
