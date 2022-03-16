---
layout: docs
title: Advanced Stubbing
toc_rank: 21
description: Advanced request matching and response definition
---

In some cases matching on the URL alone is not specific enough. For instance you may want to simulate creation of a new
to-do item in a RESTful API by stubbing `POST` to `/api/to-do`. In order to test both success and failure cases it will be
necessary to return different responses depending on the post body (since the URL would always be the same).

We can do this by adding a body matching clause in the Advanced portion of the Request section.

Click the <img style="margin-bottom: 0.8rem; vertical-align: middle; border: none; height: 45px" src="/images/screenshots/new-body-pattern-button.png" title="New body pattern"/> button to add the clause,
select the match type from the drop-down, then write (or paste) the expected value or expression into the text area.

If your API uses JSON as its serialisation format you might want to match using `equalToJson`:

<img src="/images/screenshots/advanced-section-body-match.png" title="Advanced" />


The remainder of this article describes each stubbing parameter in detail:


## Request method matching
The HTTP method that required for this stub to match. This defaults to `ANY`, meaning that a request with any method
will match.

## Request priority matching
Requests of a higher priority (i.e. lower number) will be matched first, in cases where more than one stub mapping in the
list would match a given request.

Normally it's fine to leave the priority at its default. However it can sometimes be useful to so create a low priority,
broadly matching stub defining some default behaviour e.g. a 404 page, and then create a set of higher priority, more specific
stubs for testing individual cases. See [Serving Default Responses](/docs/default-responses/) for more details.

## URL matching
Determines how the URL will be matched. The options are:

* **Path and query** - exactly matches the path and query string parts of the URL
* **Path and query regex** - matches the path and query string parts of the URL against a regular expression
* **Path** - exactly matches the path part of the URL
* **Path regex** - matches the path part of the URL against a regular expression
* **Any URL** - matches any URL

<img src="/images/screenshots/url-match-type-screenshot.png" title="URL match types" style="height: 150px"/>


## Advanced request parameter matching
In addition to the URL and body, requests can be matched on:

* Headers
* Query parameters
* Cookies

Parameter match clauses can use the same set of match operations as body clauses:

![Request parameters](/images/screenshots/request-parameters-screenshot.png)

It's usually a good idea to use path only URL matching with query parameter matches.

When multiple match clauses are added a request must match all of them for the response to be served (they are combined
with logical AND).


## Matching JSON request bodies

Two specific match types exist for JSON formatted request bodies: equality (`equalToJson`) and JSONPath (`matchesJsonPath`).

### Equality

`equalToJson` performs a semantic comparison between the incoming JSON and the expected value, meaning that
it will return a match even when, for instance, the two documents have different amounts of whitespace.

You can also specify that array order an additional elements in the request JSON be ignored.

![JSON equality](/images/screenshots/equal-to-json.png)

### JSON Placeholders

JSON equality matching is implemented by [JsonUnit](https://github.com/lukas-krecan/JsonUnit), and
therefore supports placeholder syntax, allowing looser specification of fields within the document.

For instance, consider a request body like this, where `transaction_id` is unique to
each request:

```json
{
  "event": "details-updated",
  "transaction_id": "abc-123-def"
}
```

Requiring an exact match on this document would ensure no match could ever be made, since
the same transaction ID would never be repeated.

This can be solved using a placeholder:

```json
{
  "event": "details-updated",
  "transaction_id": "${json-unit.ignore}"
}
```

If you want to constrain the value to a specific type or pattern the following placeholders are also valid:

* `${json-unit.regex}[A-Z]+` (any Java-style regular expression can be used)
* `${json-unit.any-string}`
* `${json-unit.any-boolean}`
* `${json-unit.any-number}`


### JSONPath

`matchesJsonPath` allows request bodies to be matched according to a [JSONPath](https://github.com/json-path/JsonPath) expression. The
JSONPath expression is used to select one or more values from the request body, then the result is matched against sub-matcher (`equal to`, `contains` etc.).
It is also possible to simply assert that the expression returns something, by selecting `is present` from the list.

![JSONPath matching](/images/screenshots/matches-json-path.png)

The expression in the above screenshot (`$.event` `equal to` `description-updated`) would match a request body of

```json
{
  "event": "description-updated"
}
```

but not

```json
{
  "event": "document-created"
}
```


## Matching XML request bodies

As with JSON matching, there are two match types available for working with XML: `equalToXml` and `matchesXPath`.

### Equality

`equalToXml` performs a semantic comparison between the incoming and expected XML documents, meaning that it will return a match regardless of whitespace, comments and node order.

### XML placeholders

When using `equalToXml` it is possible to ignore the value of specific elements using [XMLUnit](https://github.com/xmlunit/user-guide/wiki/Placeholders){:target="{{site.data.misc.blank}}"}'s placeholder syntax. For instance if you
expected to receive an XML request body containing a transaction ID that changed on every request you could ignore that value like this:

```xml
<transaction>
  <id>${xmlunit.ignore}</id>
  <value>1234</value>
</transaction>
```

To use XML placeholders you must enable them by ticking the box:

<img src="/images/screenshots/enable-xml-placeholders.png" title="Enable XML placeholders" style="width:300px"/>


### XPath

`matchesXPath` allows XML request bodies to be matched according to an [XPath](https://www.w3schools.com/xml/xpath_syntax.asp){:target="{{site.data.misc.blank}}"} expression.

For instance, an XML request body like

```xml
<stuff>
  <id>abc123</id>
</stuff>
```

could be matched using the XPath expression

```
//stuff[id='abc123']
```

## Setting the response status
The HTTP status code to be sent with the response.


## Sending response headers
Headers can be set on the response:

![Response headers](/images/screenshots/response-headers-screenshot.png)


## Response body
A response body can optionally be specified. If [response templating](/docs/response-templating/)
is enabled, certain parts can be dynamically generated using request attributes and random data.
