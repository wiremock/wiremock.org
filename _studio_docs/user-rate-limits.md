---
layout: docs
title: User Configurable Rate Limits
description: Configuring your own rate limiters in order to simulate the real thing.
---

You can configure your own rate limiters and apply them to your stubs, allowing
you to simulate the real-world rate limiters protecting the APIs you're mocking.

**Please note: this feature is in beta and is only accessible via the API.**

## Creating a rate limiter

A rate limiter is defined by an object in your mock API's settings document. The
JSON attribute key is then used to apply the rate limiter to specific stub mappings.

A rate limiter has two mandatory parameters:

* `unit` - the time unit the rate is being expressed in e.g. `nanoseconds`, `seconds`, `minutes`
* `rate` - the number of requests per the time unit permitted e.g. `15`

You can also optionally allow bursting by setting:

* `burst` - the number of requests that can be made in a burst over the set rate limit  


You set the rate limit by making a `PUT` request to `https://<your mock API>.mocklab.io/__admin/mocklab/settings/extended/rateLimits`
containing the JSON object configuring all of your rate limits e.g.

```json
{
  "rateLimits": {
    "management": {
      "rate": 15,
      "unit": "seconds",
      "burst": 50
    },
    "authentication": {
      "rate": 100,
      "unit": "seconds"
    }
  }
}
```

If you've got admin API security turned on you'll need to supply your API key e.g.

```bash
curl -H 'Authorization:Token <your API token>' \
  https://<your mock API>.mocklab.io/__admin/mocklab/settings/extended/rateLimits \
  -X PUT -d '{
 "rateLimits": {
   "management": {
     "rate": 15,
     "unit": "seconds",
     "burst": 50
   },
   "authentication": {
     "rate": 100,
     "unit": "seconds"
   }
  }
}'
```

## Applying to your stubs

To rate limit a particular stub according to one of your named configurations you
need to create or edit the stub via the API, so that you can enable the `rate-limit`
transformer and set the name of the rate limit to be used.

You do this by `POST`ing the JSON to `https://<your mock API>.mocklab.io/__admin/mappings`.

Taking the above example, if I wanted to use the "authentication" rate limit in my
login handler stub, I'd do as follows:

```json
{
  "name": "Login handler",
  "request": {
    "urlPath": "/login",
    "method": "POST"
  },
  "response": {
    "status": 200,
    "body": "{ \"message\": \"Successfully logged in {{jsonPath request.body '$.username'}}\"",
    "transformers": [
      "response-template",
      "rate-limit"
    ],
    "transformerParameters": {
      "rateLimitName": "authentication"
    }
  },
  "persistent": true
}
```

The critical parts here are the `rate-limit` element in the `transformers` array,
and `"rateLimitName": "authentication"` under `transformerParameters`.

Once you've created a stub this way you will start to see 429 responses when the
request rate to **all stubs associated with the named rate limit** exceeds the limit.
