---
layout: docs
title: How to build a mock REST API [Tutorial]
description: How to build an online mock REST API in MockLab for functional, integration and performance testing
categories: ['API Mocking', 'Mock API', 'REST', 'Mock REST API', 'JSON']
---

REST is the dominant style of API at present and it's common for web,
mobile and microservice developers to have to integrate with at least a few and
sometimes many REST APIs to the the job done.

Inevitably this means that teams are delayed shipping new features when APIs aren't
finished, sandbox environments are down or test scenarios can't be run, so being
able to quickly deploy a mock API is essential to keep things moving.

In this tutorial you'll build a mock REST API from a fictitious contact manager,
which is suitable for integration, functional and performance testing.
You'll also implement common REST patterns and see how to solve common problems.

## Prerequisites

In order to follow this tutorial you'll need:

* A basic working knowledge of HTTP and REST
* An HTTP client for testing, such as [Postman](https://www.postman.com/){:target="{{site.data.misc.blank}}"}
or [Insomnia](https://insomnia.rest/){:target="{{site.data.misc.blank}}"}
* Basic familiarity with [Regular Expressions](https://www.regular-expressions.info/){:target="{{site.data.misc.blank}}"}
* Ideally, some familiarity with [JSONPath](https://goessner.net/articles/JsonPath/){:target="{{site.data.misc.blank}}"}, but
this is not esssential as it'll be explained in the places it's used.

## Setting up

Firstly, you'll need to [sign up for a MockLab account](https://app.mocklab.io/login?for=signup){:target="{{site.data.misc.blank}}"} if you don't already have one.

Once you've signed up or logged back in, create a blank mock API by hitting <img style="padding:0;vertical-align: middle; border: none; height: 30px" src="/images/screenshots/new-mock-api-button.png" alt="New mock API"/>
in the app. Make sure you choose the "blank" template on the new API form.

<div style="width:80%;border:1px solid #bbc3cd;padding:10px;margin-left:auto;margin-right:auto;margin-bottom:1rem">
  <h3 style="margin-top:-1rem">tl;dr</h3>

  If you just want to take a look at the end result of this tutorial you can select
  the <strong>"rest-example"</strong> API template instead of "blank" when when creating a new mock API.

  <img alt="Example REST API template" src="/images/screenshots/mock-rest-api/rest-api-template.png" style="width:80%;border:none;"/>
</div>

After creating a new mock API you'll be taken to the Settings page where you can find
its base URLs (one for HTTP one for HTTPS):

<img alt="Base URL" src="/images/screenshots/base-url-box.png" style="width: 60%;border:none;"/>

You can check that your new API is live by copying the base URL by clicking the icon
to the right of the box and making a request from your HTTP client (e.g. Postman):

<img alt="Postman request to empty API" src="/images/screenshots/postman-empty-api.png" style="width: 80%;border:none;"/>


## Basic contact list

A contact manager application is likely to have the ability to list all stored contacts.
Let's assume our imaginary API responds to `GET /v1/contacts` with JSON like:

```json
{
  "contacts": [
    {
      "id": "11111",
      "firstName": "Tom",
      "lastName": "Smith",
      "email": "tom.smith@example.com",
      "dateAdded": "2021-01-03",
      "companyId": "123"
    },
    {
      "id": "22222",
      "firstName": "Suki",
      "lastName": "Patel",
      "email": "spatel@example.com",
      "dateAdded": "2020-11-12",
      "companyId": "123"
    },
    {
      "id": "33333",
      "firstName": "Lexine",
      "lastName": "Barnfield",
      "email": "barnfield8@example.com",
      "dateAdded": "2021-01-03",
      "companyId": "234"
    }
  ]
}
```

We can simulate this by creating a basic stub, matched on a `GET` with the exact
URL path `/v1/contacts`. Go to the Stubs page under your new mock API and hit the
new stub button:
<img style="padding:0;vertical-align: middle; border: none; height: 30px" src="/images/screenshots/new-stub-button.png" alt="Create new stub"/>.

Then in the request section, set the method to `GET`, the URL to `/v1/contacts`
and the URL match type to `Path`:

<img alt="Contact list stub request" src="/images/screenshots/mock-rest-api/contact-list-request.png" style="width: 80%;border:none;"/>

In the response section put the JSON in the body field, and for good measure
we'll also send a `Content-Type: application/json` header:

<img alt="Contact list stub response" src="/images/screenshots/mock-rest-api/contact-list-response.png" style="width: 80%;border:none;"/>

After hitting Save, you can now test the stub using MockLab's Test Requester or
your preferred HTTP client:

<img alt="Contact list test request" src="/images/screenshots/mock-rest-api/contact-list-test-request.png" style="width: 60%;border:none;"/>


## Filtering via query parameters

REST APIs often allow collection resources like the contact list to be filtered
using parameters in the request's query string.

For instance, so that we can find contacts for a specific company our contact
manager might support filtering by company ID. For instance `/v1/contacts?companyId=123`
would return:

```json
{
  "contacts": [
    {
      "id": "11111",
      "firstName": "Tom",
      "lastName": "Smith",
      "email": "tom.smith@example.com",
      "dateAdded": "2021-01-03",
      "companyId": "123"
    },
    {
      "id": "22222",
      "firstName": "Suki",
      "lastName": "Patel",
      "email": "spatel@example.com",
      "dateAdded": "2020-11-12",
      "companyId": "123"
    }
  ]
}
```

We'll simulate this by creating a similar stub to the first one, but with a
query parameter match and the filtered JSON document in the response body. To save some time we can
clone the first stub rather than starting from scratch, which can be done by
clicking <img style="padding:0;vertical-align: middle; border: none; height: 30px" src="/images/screenshots/clone-stub-button.png" alt="Clone stub"/> at the bottom of the stub form.

Then we add a query parameter match for `companyId` equalling `123`:

<img alt="Query parameter matching" src="/images/screenshots/mock-rest-api/query-parameter-match.png" style="width: 80%;border:none;"/>

And finally paste the filtered JSON in the body field:

<img alt="Query parameter matching" src="/images/screenshots/mock-rest-api/filtered-contacts-response.png" style="width: 80%;border:none;"/>

You can find more detail on [matching different parts of incoming requests here](/docs/advanced-stubbing/#advanced-request-parameter-matching).

[See here for the full list of available request matchers](/docs/request-matching/matcher-types/) (such as `equalTo` and `contains`).


## Getting an individual contact

It's also very common for REST APIs to support retrieval of individual items of
data specified by an identifier in the URL path, so in our case we might fetch an
individual contact via a `GET` to `/v1/contacts/22222`.

We can stub a single data item in a very similar manner to the contact list we
created first, relying on exact URL path equality to match the request:

<img alt="Single contact request" src="/images/screenshots/mock-rest-api/single-contact-request.png" style="width: 80%;border:none;"/>

<img alt="Single contact response" src="/images/screenshots/mock-rest-api/single-contact-response.png" style="width: 80%;border:none;"/>


## Using URL regex matching and response templating to simulate many data records

If you only need to be able to return a small number of individual contacts then the above
approach of creating a stub per contact will work OK.

However, you may need return many
unique contact records e.g. because you're performance testing and want to spread
the load across realistic data volumes. In this instance you can use URL regex
matching and response templating to simulate the presence of many data items.

Let's modify the single contact stub we've already created. First we'll switch to
a looser URL match using the `Path regex` URL match type with the regular expression `/v1/contacts/[0-9]{1,10}` as the value.
This will match any URL path starting with `/v1/contacts` and ending with any
numeric ID between 1 and 10 characters long:

<img alt="Templated contact request" src="/images/screenshots/mock-rest-api/templated-contact-request.png" style="width: 80%;border:none;"/>

Then we'll enable templating in the response by ticking "Enable templating" and
make the response body more dynamic by replacing some elements with template helpers, giving us:

{% raw %}
```json
{
  "contact": {
      "id": "{{{request.pathSegments.2}}}",
      "firstName": "{{{randomValue length=6 type='ALPHANUMERIC'}}}",
      "lastName": "{{{randomValue length=10 type='ALPHANUMERIC'}}}",
      "email": "{{{randomValue length=12 type='ALPHANUMERIC'}}}@example.com",
      "dateAdded": "{{{now offset='-3 months' format='yyyy-MM-dd'}}}",
      "companyId": "123"
    }
}
```
{% endraw %}

<img alt="Templated contact response" src="/images/screenshots/mock-rest-api/templated-contact-response.png" style="width: 80%;border:none;"/>

Now we can make a test request with any valid ID value (numeric, 1-10 characters)
and will receive a response with the ID field matching the value in the request URL
and some of the data randomised:

<img alt="Templated contact test request" src="/images/screenshots/mock-rest-api/templated-contact-test-request.png" style="width: 80%;border:none;"/>

Unpacking what we've done here:

* `id` is now set from the 3rd segment of the incoming request URL's path, so it will always be the same as the requested contact ID.
* `firstName`, `lastName` and `email` are now random alphanumeric text (with a fixed domain name in the case of `email`).
* `dateAdded` is set to 3 months before today's date.

You can [learn more about response templating here](/docs/response-templating/basics/) and [more about URL matching here](/docs/request-matching/url/).


## Creating a new contact

At some point our contact manager API will need to be able to accept new contacts
in addition to just returning them. Commonly, REST APIs support sending a `POST`
request to the URL for a collection resource as a means to add new data items.

So our contact manager might accept `POST /v1/contacts`, returning a
response with status code `201 Created` and an empty body:

<img alt="New contact POST" src="/images/screenshots/mock-rest-api/new-contact-post-stub.png" style="width: 80%;border:none;"/>


### More specific matching
In its current state, this stub will be matched regardless of the contents
of the request body, so a body with incorrectly structured JSON, XML or even no body
at all will still yield the `201` response.

If we want to ensure the stub is only matched when correctly structured JSON is
sent in the request but without requiring a set of exact values, we can add a body
matcher by clicking <img style="padding:0;vertical-align: middle; border: none; height: 30px" src="/images/screenshots/new-body-pattern-button.png" alt="New body matcher"/>
 and use [JSONUnit placeholders](/docs/request-matching/json/#using-placeholders-to-ignore-specific-json-attributes)
as wildcards:

{% raw %}
```json
{
  "contact": {
      "id": "${json-unit.any-string}",
      "firstName": "${json-unit.any-string}",
      "lastName": "${json-unit.any-string}",
      "email": "${json-unit.regex}[a-z0-9+_.-]+@[^.]+\\.[^.]+$",
      "dateAdded": "${json-unit.regex}[0-9]{4}-[0-9]{2}-[0-9]{2}",
      "companyId": "${json-unit.any-string}"
    }
}
```
{% endraw %}

<img alt="New contact body pattern" src="/images/screenshots/mock-rest-api/new-contact-body-pattern.png" style="width: 80%;border:none;"/>

Now if we make a request containing an incorrect JSON field (`name` instead of
`firstName` and `lastName`), we'll get a `404 Not Found` response
containing a diff report showing which part of the request didn't match:

<img alt="Contact POST mismatch" src="/images/screenshots/mock-rest-api/new-contact-postman-mismatch.png" style="border:none;"/>


## Simulating state changes

When posting a new item of data to a real API we'd expect it to be
stored and therefore returned on a subsequent `GET` request for
the collection or the individual resource. However, mock APIs by default don't
store any state, so making a request to add a new contact will have no effect on
the data returned later.

For most testing scenarios this isn't an issue, but in cases where more realistic
behaviour is required MockLab supports the concept of "stateful scenarios" whereby
the state of a scenario can be used to determine which stub to match.

If we wanted to, for instance, create a test case in which posting a new company
results in it appearing in the companies collection we can achieve this by creating three
stubs, all associated with the same scenario.

Firstly, we'd stub the initial response for `GET /v1/companies` (in much the same manner as we did
for contacts), returning a single company in the collection:

```json
{
  "companies": [
    {
      "id": 123,
      "name": "Boring Corp"
    }
  ]
}
```

This time we'd put the stub in a scenario called "Companies" (the name is not important)
and require that the scenario be in the "Started" state in order for the stub to match:

<img alt="Companies scenario 1" src="/images/screenshots/mock-rest-api/companies-scenario-1.png" style="width:80%;border:none;"/>

Next, we'd create a second `GET` stub cloned from the first but with a second
company added to the collection:

```json
{
  "companies": [
    {
      "id": 123,
      "name": "Boring Corp"
    },
    {
      "id": 234,
      "name": "Az Tech"
    }
  ]
}
```

This stub would also be in the "Companies" scenario but this time with a different
required state:

<img alt="Companies scenario 2" src="/images/screenshots/mock-rest-api/companies-scenario-2.png" style="width:80%;border:none;"/>

Finally, we'd configure the stub that handles the `POST` to advance the state of the scenario
so that it appears to have the effect of storing the new company:

<img alt="Companies scenario 2" src="/images/screenshots/mock-rest-api/companies-scenario-state-change.png" style="width:80%;border:none;"/>

### Testing the scenario

The first time we make a request to `GET` our companies we should see a single item in the collection:

<img alt="Companies list in state 1" src="/images/screenshots/mock-rest-api/companies-list-1.png" style="width:80%;border:none;"/>

Then we `POST` a new company:

<img alt="New company POST with state change" src="/images/screenshots/mock-rest-api/new-company-post.png" style="width:80%;border:none;"/>

Then when we fetch the companies list a second time we should see two companies
returned:

<img alt="Companies list in state 2" src="/images/screenshots/mock-rest-api/companies-list-2.png" style="width:80%;border:none;"/>

The scenario will now remain in state "2 companies" until it is manually reset,
which you can do by clicking <img style="padding:0;vertical-align: middle; border: none; height: 40px" src="/images/screenshots/scenario-reset-button.png" alt="Reset all scenarios"/>, which resets all scenarios to "Started".


You can [find out more about Scenarios here](/docs/stateful-scenarios/).


## Returning errors for specific requests

Sometimes we want to be able to support negative tests, for instance when the
API we're calling returns an error rather than the expected response. We can configure our mock API to return errors in response to specific requests
with the help of the priority stub parameter.

Let's suppose we want to test the case where our app tries to post a new contact
but the API returns a `503 Service Unavailable` response instead of the expected `201`.
If we configure a stub that expects specific data in the request body and give it
a higher priority than the existing `POST` stub that returns `201` then we can
send a request with appropriate data and see the error returned.

Start by cloning the existing `POST` stub for new contacts. Change the Priority value to a number
lower than `5` (`1` is highest).

<img alt="Raised stub priority" src="/images/screenshots/mock-rest-api/raised-priority.png" style="width:50%"/>

Then we'll modify the body matcher so that it'll only
match when a specific piece of data is sent. One option here would be to substitute
the placeholders in the `equalToJson` body match we already have and this would
work fine if we were confident our test could produce exactly the same values each time.
However, we can give ourselves a bit more flexibility by choosing one specific bit of
data and matching it using `matchesJsonPath`.

Let's say that if we receive a specific contact ID then we'll trigger the error.
To do this, change the body match type to `matchesJsonPath` and the expression to
`$.contact.id` `equalTo` `666`:

<img alt="Matching on JSONPath" src="/images/screenshots/mock-rest-api/matches-json-path.png" style="width:80%"/>

Finally, change the response status code to `503`, and let's also add a plain text
error message supported by a `Content-Type: text/plain` header:

<img alt="Error 503 response" src="/images/screenshots/mock-rest-api/503-response.png" style="width:80%;border:none;"/>

### Testing the error response

Now we can send a test request and see the error response returned:

<img alt="Error 503 response" src="/images/screenshots/mock-rest-api/503-error-test-request.png" style="width:80%;border:none;"/>

> **note**
>
> The message in the red text in this case indicates that MockLab couldn't
> automatically generate a valid request body to match our JSONPath expression.
> This can be safely ignored as we've created our own request body.

### Other types of error

You can also simulate lower-level errors with MockLab such as dropped network
connections and delays. You can [learn more about faults here](/docs/simulating-faults/).


## Conclusion

You've now built a mock of a REST API which can be used in a variety of testing scenarios,
and it hopefully it's possible to see how this approach could be applied to mocking
your own APIs or those of your suppliers and partners.

You could also try expanding the scope of the API by mocking more resources and test more
negative cases using faults, delays and other not-OK HTTP status codes.
