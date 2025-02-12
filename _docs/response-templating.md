---
layout: docs
title: Response Templating
meta_title: Mock API Response Templating | WireMock
toc_rank: 71
description: Response headers and bodies, as well as proxy URLs, can optionally be rendered using Handlebars templates.
---

Response headers and bodies, as well as proxy URLs, can optionally be rendered using [Handlebars templates](http://handlebarsjs.com/). This enables attributes of the request
to be used in generating the response e.g. to pass the value of a request ID header as a response header or
render an identifier from part of the URL in the response body.

## Enabling/disabling response templating

Response templating is enabled by default in local mode when WireMock is started programmatically, meaning that it will only be applied to stubs that have the `response-template` transformer added to them (see [below](#applying-templating-in-local-mode) for details).

Templating can be applied globally (without having to explicitly add `response-template`) via a startup option:

```java
WireMockServer wm =
    new WireMockServer(options().globalTemplating(true));
```

It can also be disabled completely via a startup option:

```java
WireMockServer wm =
    new WireMockServer(options().templatingEnabled(false));
```

See [the command line docs](../standalone/java-jar/#command-line-options) for the standalone equivalents of these parameters.

Response templating can also be disabled on a per-stub basis when using the `bodyFileName` element by adding the 
`disableBodyFileTemplating` parameter to the `transformerParameters` object in the stub response definition.

```json
{
  "request": {
    "method": "GET",
    "urlPath": "/test"
  },
  "response": {
    "status": 200,
    "bodyFileName": "response.json",
    "transformerParameters": {
      "disableBodyFileTemplating": true
    }
  }
}
```

## Customising and extending the template engine

Custom Handlebars helpers can be registered via an extension point. See [Adding Template Helpers](../extensibility/adding-template-helpers/) for details.

Similarly custom model data providers can be registered as extensions. See [Adding Template Model Data](../extensibility/adding-template-model-data/) for details.

## Applying templating in local mode

When templating is enabled in local mode you must add it to each stub to which you require templating to be applied.
This is done by adding `response-template` to the set of transformers on the response.

### Java

{% raw %}

```java
wm.stubFor(get(urlPathEqualTo("/templated"))
  .willReturn(aResponse()
      .withBody("{{request.path.[0]}}")
      .withTransformers("response-template")));
```

{% endraw %}

{% raw %}


### JSON

```json
{
    "request": {
        "urlPath": "/templated"
    },
    "response": {
        "body": "{{request.path.[0]}}",
        "transformers": ["response-template"]
    }
}
```

{% endraw %}

## Template caching

All templated fragments (headers, bodies and proxy URLs) are cached in their compiled form for performance,
since compilation can be expensive for larger templates.

By default the capacity of this cache is not limited but a limit can be set via the startup options:

```java
WireMockServer wm =
    new WireMockServer(options().withMaxTemplateCacheEntries(10000));
```

See [the command line docs](../standalone/java-jar/#command-line-options) for the equivalent configuration setting when running standalone.

## Proxying

Templating also works when defining proxy URLs, e.g.

### Java

{% raw %}

```java
wm.stubFor(get(urlPathEqualTo("/templated"))
  .willReturn(aResponse()
      .proxiedFrom("{{request.headers.X-WM-Proxy-Url}}")
      .withTransformers("response-template")));
```

{% endraw %}

{% raw %}

### JSON

```json
{
    "request": {
        "urlPath": "/templated"
    },
    "response": {
        "proxyBaseUrl": "{{request.headers.X-WM-Proxy-Url}}",
        "transformers": ["response-template"]
    }
}
```

{% endraw %}

## Templated body file

The body file for a response can be selected dynamically by templating the file path:

### Java

{% raw %}

```java
wm.stubFor(get(urlPathMatching("/static/.*"))
  .willReturn(ok()
    .withBodyFile("files/{{request.pathSegments.[1]}}")));

```

{% endraw %}

{% raw %}

### JSON

```json
{
    "request": {
        "urlPathPattern": "/static/.*",
        "method": "GET"
    },
    "response": {
        "status": 200,
        "bodyFileName": "files/{{request.pathSegments.[1]}}"
    }
}
```

{% endraw %}

## The request model

The model of the request is supplied to the header and body templates. The following request attributes are available:

`request.id` - The unique ID of each request (introduced in WireMock version `3.7.0`)

`request.url` - URL path and query

`request.path` - URL path. This can be referenced in full or it can be treated as an array of path segments (like below) e.g. `request.path.3`.
When the path template URL match type has been used you can additionally reference path variables by name e.g. `request.path.contactId`.

`request.pathSegments.[<n>]`- URL path segment (zero indexed) e.g. `request.pathSegments.2`

`request.query.<key>`- First value of a query parameter e.g. `request.query.search`

`request.query.<key>.[<n>]`- nth value of a query parameter (zero indexed) e.g. `request.query.search.5`

`request.method`- request method e.g. `POST`

`request.host`- hostname part of the URL e.g. `my.example.com`

`request.port`- port number e.g. `8080`

`request.scheme`- protocol part of the URL e.g. `https`

`request.baseUrl`- URL up to the start of the path e.g. `https://my.example.com:8080`

`request.headers.<key>`- First value of a request header e.g. `request.headers.X-Request-Id`

`request.headers.[<key>]`- Header with awkward characters e.g. `request.headers.[$?blah]`

`request.headers.<key>.[<n>]`- nth value of a header (zero indexed) e.g. `request.headers.ManyThings.1`

`request.cookies.<key>` - First value of a request cookie e.g. `request.cookies.JSESSIONID`

`request.cookies.<key>.[<n>]` - nth value of a request cookie e.g. `request.cookies.JSESSIONID.2`

`request.body` - Request body text (avoid for non-text bodies)

`request.bodyAsBase64` - As of WireMock `3.8.0`, the Base64 representation of the request body.

`request.multipart` - As of WireMock `3.8.0`, if the request is a multipart request (boolean).

`request.parts` - As of WireMock `3.8.0`, the individual parts of a multipart request are exposed via the template
model. Each part can be referenced by its name and exposes a number of properties in the template model.  For example, 
a multipart request with a name of `text` has the following properties available:
* `request.parts.text.binary` - if the part is a binary type.
* `request.parts.text.headers.<key>` - first value of a part header - `request.parts.text.headers.content-type`
* `request.parts.text.body` - part body as text.
* `request.parts.text.bodyAsBase64` - part body as base64.

### Values that can be one or many

A number of HTTP elements (query parameters, form fields, headers) can be single or multiple valued. The template request model and built-in helpers attempt to make
this easy to work with by wrapping these in a "list or single" type that returns the first (and often only) value when no index is specified, but also support index access.

For instance, given a request URL like `/multi-query?things=1&things=2&things=3` I can extract the query data in the following ways:

{% raw %}

```handlebars
{{request.query.things}} // Will return 1
{{request.query.things.0}} // Will return 1
{{request.query.things.first}} // Will return 1
{{request.query.things.1}} // Will return 2
{{request.query.things.[-1]}} // Will return 2
{{request.query.things.last}} // Will return 3
```

{% endraw %}

> **Note**
>
> When using the `eq` helper with one-or-many values, it is necessary to use the indexed form, even if only one value is present.
> The reason for this is that the non-indexed form returns the wrapper type and not a String, and will therefore fail any comparison
> with another String value.

### Getting values with keys containing special characters

Certain characters have special meaning in Handlebars and therefore can't be used in key names when referencing values.
If you need to access keys containing these characters you can use the `lookup` helper, which permits you to pass the key
name as a string literal and thus avoid the restriction.

Probably the most common occurrence of this issue is with array-style query parameters, so for instance if your request
URLs you're matching are of the form `/stuff?ids[]=111&ids[]=222&ids[]=333` then you can access these values like:

{% raw %}

```handlebars
{{lookup request.query 'ids[].1'}} // Will return 222
```

{% endraw %}

## Using transformer parameters

Parameter values can be passed to the transformer as shown below (or dynamically added to the parameters map programmatically in custom transformers).

### Java

{% raw %}

```java
wm.stubFor(get(urlPathEqualTo("/templated"))
  .willReturn(aResponse()
      .withBody("{{request.path.[0]}}")
      .withTransformers("response-template")
      .withTransformerParameter("MyCustomParameter", "Parameter Value")));
```

{% endraw %}

{% raw %}

### JSON

```json
{
    "request": {
        "urlPath": "/templated"
    },
    "response": {
        "body": "{{request.path.[0]}}",
        "transformers": ["response-template"],
        "transformerParameters": {
            "MyCustomParameter": "Parameter Value"
        }
    }
}
```

{% endraw %}

These parameters can be referenced in template body content using the `parameters.` prefix:

{% raw %}

```handlebars
<h1>The MyCustomParameter value is {{parameters.MyCustomParameter}}</h1>
```

{% endraw %}

## Handlebars helpers

All of the standard helpers (template functions) provided by the [Java Handlebars implementation by jknack](https://github.com/jknack/handlebars.java)
plus all of the [string helpers](https://github.com/jknack/handlebars.java/blob/master/handlebars/src/main/java/com/github/jknack/handlebars/helper/StringHelpers.java)
and the [conditional helpers](https://github.com/jknack/handlebars.java/blob/master/handlebars/src/main/java/com/github/jknack/handlebars/helper/ConditionalHelpers.java)
are available e.g.

{% raw %}

```handlebars
{{capitalize request.query.search}}
```

{% endraw %}

## Number and assignment helpers

Variable assignment and number helpers are available:

{% raw %}

```handlebars
{{#assign 'myCapitalisedQuery'}}{{capitalize request.query.search}}{{/assign}}

{{isOdd 3}}
{{isOdd 3 'rightBox'}}

{{isEven 2}}
{{isEven 4 'leftBox'}}

{{stripes 3 'row-even' 'row-odd'}}
```

{% endraw %}

## Val helper

Released in WireMock version `3.6.0`, the `val` helper can be used to access values or provide a default if the value 
is not present. It can also be used to assign a value to a variable much like the `assign` helper.  The main difference 
between `val` and `assign` is that `val` will maintain the type of the date being assigned whereas `assign` will always 
assign a string.

{% raw %}

```handlebars
{{val request.query.search or='default'}} // the value of request.query.search or 'default' if it's not present
{{val request.query.search default='default'}} // the value of request.query.search or 'default' if it's not present
{{val request.query.search}} // the value of request.query.search or null if it's not present
{{val request.query.search or='default' assign='myVar'}} // assign the value of request.query.search or 'default' to myVar
{{val request.query.search assign='myVar'}} // assign the value of request.query.search to myVar


{{val (array 1 2 3) default='123'}} // [1, 2, 3]
{{val 'value for myVar' assign='myVar'}}{{myVar}} // value for myVar
{{val null or='other value for myVar' assign='myVar'}}{{myVar}} // other value for myVar
{{val 10 assign='myVar'}}{{#lt myVar 20}}Less Than{{else}}More Than{{/lt}} // Less Than
```

{% endraw %}

## XPath helpers

Additionally some helpers are available for working with JSON and XML.

When the incoming request contains XML, the `xPath` helper can be used to extract values or sub documents via an XPath 1.0 expression. For instance, given the XML

```xml
<outer>
    <inner>Stuff</inner>
</outer>
```

The following will render "Stuff" into the output:

{% raw %}

```handlebars
{{xPath request.body '/outer/inner/text()'}}
```

{% endraw %}

And given the same XML the following will render `<inner>Stuff</inner>`:

{% raw %}

```handlebars
{{xPath request.body '/outer/inner'}}
```

{% endraw %}

As a convenience the `soapXPath` helper also exists for extracting values from SOAP bodies e.g. for the SOAP document:

```xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope/">
    <soap:Body>
        <m:a>
            <m:test>success</m:test>
        </m:a>
    </soap:Body>
</soap:Envelope>
```

The following will render "success" in the output:

{% raw %}

```handlebars
{{soapXPath request.body '/a/test/text()'}}
```

{% endraw %}

### Using the output of `xPath` in other helpers

Since version 2.27.0 the XPath helper returns collections of node objects rather than a single string, meaning that the result
can be used in further helpers.

The returned node objects have the following properties:

`name` - the local XML element name.

`text` - the text content of the element.

`attributes` - a map of the element's attributes (name: value)

Referring to the node itself will cause it to be printed.

A common use case for returned node objects is to iterate over the collection with the `each` helper:

{% raw %}

```handlebars
{{#each (xPath request.body '/things/item') as |node|}}
  name: {{node.name}}, text: {{node.text}}, ID attribute: {{node.attributes.id}}
{{/each}}
```

{% endraw %}

## Format XML helper

Introduced in WireMock version `3.10.0`, the `formatXml` helper will rewrite the input XML into a format of your choice.

{% raw %}

```handlebars
{{#formatXml}}
<foo><bar
>wh</bar></foo
>
{{/formatXml}}
```

{% endraw %}

By default, the input will be rewritten to a "pretty" format (new lines and indentation):

{% raw %}

```xml
<foo>
    <bar>wh</bar>
</foo>
```

{% endraw %}

The format can be controlled by supplying a `format` option:

{% raw %}

```handlebars
{{#formatXml format='compact'}}
<foo><bar
>wh</bar></foo
>
{{/formatXml}}
```

{% endraw %}

The available `format` options are `compact` (all whitespace removed) and `pretty`.

The input XML can alternatively be supplied inline, or as a variable:

{% raw %}

```handlebars
{{formatXml ' <foo>  <bar>wh</bar>  </foo> '}}

{{#assign 'someXml'}} <foo>  <bar>wh</bar>  </foo> {{/assign}}
{{formatXml someXml format='compact'}}
```

{% endraw %}

## JSONPath helper

Like the `xPath` helper, it is similarly possible to extract JSON values or sub documents via JSONPath using the `jsonPath` helper. Given the JSON

```json
{
    "outer": {
        "inner": "Stuff"
    }
}
```

The following will render "Stuff" into the output:

{% raw %}

```handlebars
{{jsonPath request.body '$.outer.inner'}}
```

{% endraw %}

And for the same JSON the following will render `{ "inner": "Stuff" }`:

{% raw %}

```handlebars
{{jsonPath request.body '$.outer'}}
```

{% endraw %}

Default value can be specified if the path evaluates to null or undefined:

{% raw %}

```handlebars
{{jsonPath request.body '$.size' default='M'}}
```

{% endraw %}

## Parse JSON helper

The `parseJson` helper will parse the input into a map-of-maps. It will assign the result to a variable if a name is specified,
otherwise the result will be returned.

It can accept the JSON from a block:

{% raw %}

```handlebars
{{#parseJson 'parsedObj'}}
{
  "name": "transformed"
}
{{/parseJson}}

{{!- Now we can access the object as usual --}}
{{parsedObj.name}}
```

{% endraw %}

Or as a parameter:

{% raw %}

```handlebars
{{parseJson request.body 'bodyJson'}}
{{bodyJson.name}}
```

{% endraw %}

Without assigning to a variable:

{% raw %}

```handlebars
{{lookup (parseJson request.body) 'name'}}
```

{% endraw %}

## Write as JSON helper

Introduced in WireMock version `3.10.0`, the `toJson` helper will convert any object into a JSON string.

{% raw %}

```handlebars
{{toJson (array 1 2 3)}}
```

{% endraw %}

emits

{% raw %}

```json
[ 1, 2, 3 ]
```

{% endraw %}

Given a request with the following headers:

{% raw %}

```
Authorization: whatever
Content-Type: text/plain
```

{% endraw %}

{% raw %}

```handlebars
{{toJson request.headers}}
```

{% endraw %}

will produce

{% raw %}

```json
{
  "Authorization" : "whatever",
  "Content-Type" : "text/plain"
}
```

{% endraw %}

## Format JSON helper

As of WireMock version `3.10.0`, the `formatJson` helper will rewrite the input JSON into a format of your choice.

{% raw %}

```handlebars
{{#formatJson}}{"foo":true,"bar":{"baz":false}}{{/formatJson}}
```

{% endraw %}

By default, the input will be rewritten to a "pretty" format (new lines and indentation):

{% raw %}

```json
{
  "foo" : true,
  "bar" : {
    "baz" : false
  }
}
```

{% endraw %}

The format can be controlled by supplying a `format` option:

{% raw %}

```handlebars
{{#formatJson format='compact'}}
{
    "foo" : true,
    "bar" : {
        "baz" : false
    }
}
{{/formatJson}}
```

{% endraw %}

The available `format` options are `compact` (all whitespace removed) and `pretty`.

The input JSON can alternatively be supplied inline, or as a variable:

{% raw %}

```handlebars
{{formatJson '{"foo":true,"bar":{"baz":false}}'}}

{{#assign 'someJson'}} { "foo": true, "bar": { "baz": false } } {{/assign}}
{{formatJson someJson format='compact'}}
```

{% endraw %}

## Adding to a JSON Array

Introduced in WireMock version `3.10.0`, the `jsonArrayAdd` helper allows you to append an element to an existing json array.

Its simplest form just takes two parameters, the JSON array to append to and the JSON item to be added:

{% raw %}

```handlebars
{{#assign 'existingArray'}}
[
    {
        "id": 123,
        "name": "alice"
    }
]
{{/assign}}

{{#assign 'newItem'}}
{
    "id": 321,
    "name": "sam"
}
{{/assign}}

{{jsonArrayAdd existingArray newItem}}
```

{% endraw %}

The above template will produce the following JSON:

{% raw %}

```json
[
    {
        "id": 123,
        "name": "alice"
    },
    {
        "id": 321,
        "name": "sam"
    }
]
```

{% endraw %}

You can also use it in block form to parse the contents of the block as the new item to add:

{% raw %}

```handlebars
{{#jsonArrayAdd existingArray}}
{
    "id": 321,
    "name": "sam"
}
{{/jsonArrayAdd}}
```

{% endraw %}

It may be convenient to default the array to an empty array if it does not exist:

{% raw %}

```handlebars
{{#jsonArrayAdd (val existingArray or='[]')}}
{
    "id": 321,
    "name": "sam"
}
{{/jsonArrayAdd}}
```

{% endraw %}


The number of items in the array can be limited by using the `maxItems` parameter:

{% raw %}

```handlebars
{{#assign 'existingArray'}}
[
    {
        "id": 123,
        "name": "alice"
    },
    {
        "id": 321,
        "name": "sam"
    }
]
{{/assign}}

{{#jsonArrayAdd existingArray maxItems=2}}
{
    "id": 456,
    "name": "bob"
}
{{/jsonArrayAdd}}
```

{% endraw %}

The above template will produce the following JSON.  The first item in the array has been removed to maintain the
number of items in the array as specified by the `maxItems` parameter:

{% raw %}

```json
[
  {
    "id": 321,
    "name": "sam"
  },
  {
    "id": 456,
    "name": "bob"
  }
]
```

{% endraw %}


You can add arrays to the existing json array using this helper:

{% raw %}

```handlebars
{{#assign 'existingArray'}}
[
    {
        "id": 123,
        "name": "alice"
    },
    {
        "id": 321,
        "name": "sam"
    }
]
{{/assign}}

{{#jsonArrayAdd existingArray}}
[
    {
        "id": 456,
        "name": "bob"
    }
]
{{/jsonArrayAdd}}
```

{% endraw %}

The above template will produce the following JSON:

{% raw %}

```json
[
  {
    "id": 123,
    "name": "alice"
  },
  {
    "id": 321,
    "name": "sam"
  },
  [
    {
      "id": 456,
      "name": "bob"
    }
  ]
]
```

{% endraw %}

If you want the end result to be a single json array, you can use the `flatten` attribute:


{% raw %}

```handlebars
{{#assign 'existingArray'}}
[
    {
        "id": 123,
        "name": "alice"
    },
    {
        "id": 321,
        "name": "sam"
    }
]
{{/assign}}

{{#jsonArrayAdd existingArray flatten=true}}
[
    {
        "id": 456,
        "name": "bob"
    }
]
{{/jsonArrayAdd}}
```

{% endraw %}

The above template will produce the following JSON:

{% raw %}

```json
[
  {
    "id": 123,
    "name": "alice"
  },
  {
    "id": 321,
    "name": "sam"
  },
  {
    "id": 456,
    "name": "bob"
  }
]
```

{% endraw %}

You can use the `jsonArrayAdd` helper to add items to a nested array.  This is achieved using the `jsonPath` property
and referencing the array you want to add an item to:

{% raw %}

```handlebars
{{#assign 'existingArray'}}
[
    {
        "id": 123,
        "names":["alice", "sam"]
    },
    {
        "id": 321,
        "names":["fred", "neil"]
    }
]
{{/assign}}

{{#assign 'itemToAdd'}}"bob"{{/assign}}

{{jsonArrayAdd existingArray itemToAdd jsonPath='$[0].names'}}
```

{% endraw %}

The above template will produce the following JSON:

{% raw %}

```json
[
  {
    "id": 123,
    "names": [ "alice", "sam", "bob" ]
  },
  {
    "id": 321,
    "names": [ "fred", "neil" ]
  }
]
```

{% endraw %}

## Merging JSON objects

Introduced in WireMock version `3.10.0`, the `jsonMerge` helper allows you to merge two json objects.
Merging will recurse into any common keys where the values are both objects, but not into any array values,
where the value in the second object will overwrite that in the first.

Given these two objects:

{% raw %}

```handlebars
{{#assign 'object1'}}
{
    "id": 456,
    "forename": "Robert",
    "surname": "Smith",
    "address": {
        "number": "12"
    },
    "hobbies": [ "chess", "football" ]
}
{{/assign}}
{{#assign 'object2'}}
{
    "forename": "Robert",
    "nickname": "Bob",
    "address": {
        "street": "High Street"
    },
    "hobbies": [ "rugby" ]
}
{{/assign}}
```

{% endraw %}

{% raw %}

```handlebars
{{jsonMerge object1 object2}}
```

{% endraw %}

will return this object:

{% raw %}

```json
{
    "id": 456,
    "forename": "Robert",
    "surname": "Smith",
    "nickname": "Bob",
    "address": {
        "number": "12",
        "street": "High Street"
    },
    "hobbies": [ "rugby" ]
}
```

{% endraw %}

Like the `jsonArrayAdd` helper, the second object can be provided as a block:

{% raw %}

```handlebars
{{#jsonMerge object1}}
{
    "forename": "Robert",
    "nickname": "Bob",
    "address": {
        "street": "High Street"
    },
    "hobbies": [ "rugby" ]
}
{{/jsonMerge}}
```

{% endraw %}

### Removing attributes
Starting with WireMock version `3.12.0`, the `jsonMerge` helper has an optional `removeNulls` parameter which, when 
set to true will remove any attributes from the resulting JSON that have null values in the second JSON document.

So for instance, given the following template:

{% raw %}

```handlebars
{{#assign 'object1'}}
{
    "keepMe": 1,
    "removeMe": 2
}
{{/assign}}

{{#jsonMerge object1 removeNulls=true}}
{
    "removeMe": null
}
{{/jsonMerge}}
```

{% endraw %}

The resulting JSON would be:

{% raw %}

```json
{
    "keepMe": 1
}
```

{% endraw %}

## Removing from a JSON Array or Object

The `jsonRemove` helper was introduced in WireMock `3.10.0` and allows you to remove an element from an existing json 
array, or remove a key from an existing json object, by identifying it using a [json path](https://datatracker.ietf.org/doc/rfc9535/) expression.

For instance, given an existing array like this:

{% raw %}

```handlebars
{{#assign 'existingArray'}}
[
    { "id": 456, "name": "bob"},
    { "id": 123, "name": "alice"},
    { "id": 321, "name": "sam"}
]
{{/assign}}
```

{% endraw %}

application of this helper, which selects the object with id `123`:

{% raw %}

```handlebars
{{jsonRemove existingArray '$.[?(@.id == 123)]'}}
```

{% endraw %}

will return this array:

{% raw %}

```json
[
    { "id": 456, "name": "bob"},
    { "id": 321, "name": "sam"}
]
```

{% endraw %}

Given an object like this:

{% raw %}

```handlebars
{{#assign 'existingObject'}}
    { "id": 456, "name": "bob"}
{{/assign}}
```

{% endraw %}

application of this helper, which selects the key name:

{% raw %}

```handlebars
{{jsonRemove existingObject '$.name'}}
```

{% endraw %}

will return this object:

{% raw %}

```json
{ "id": 456 }
```

{% endraw %}

## Date and time helpers

A helper is present to render the current date/time, with the ability to specify the format ([via Java's SimpleDateFormat](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html)) and offset.

{% raw %}

```handlebars
{{now}}
{{now offset='3 days'}}
{{now offset='-24 seconds'}}
{{now offset='1 years'}}
{{now offset='10 years' format='yyyy-MM-dd'}}
```

{% endraw %}

Dates can be rendered in a specific timezone (the default is UTC):

{% raw %}

```handlebars
{{now timezone='Australia/Sydney' format='yyyy-MM-dd HH:mm:ssZ'}}
```

{% endraw %}

Pass `epoch` as the format to render the date as UNIX epoch time (in milliseconds), or `unix` as the format to render
the UNIX timestamp in seconds.

{% raw %}

```handlebars
{{now offset='2 years' format='epoch'}}
{{now offset='2 years' format='unix'}}
```

{% endraw %}

Dates can be parsed using the `parseDate` helper:

{% raw %}

```handlebars
// Attempts parsing using ISO8601, RFC 1123, RFC 1036 and ASCTIME formats.
// We wrap in the date helper in order to print the result as a string.
{{date (parseDate request.headers.MyDate)}}

// Parse using a custom date format
{{date (parseDate request.headers.MyDate format='dd/MM/yyyy')}}

// Format can also be unix (epoch seconds) or epoch (epoch milliseconds)
{{date (parseDate request.headers.MyDate format='unix')}}
```

{% endraw %}

Dates can be truncated to e.g. first day of month using the `truncateDate` helper:

{% raw %}

```handlebars
// If the MyDate header is Tue, 15 Jun 2021 15:16:17 GMT
// then the result of the following will be 2021-06-01T00:00:00Z
{{date (truncateDate (parseDate request.headers.MyDate) 'first day of month')}}
```

{% endraw %}

See the [full list of truncations here](../request-matching#all-truncations).

## Random value helper

Random strings of various kinds can be generated:

{% raw %}

```handlebars
{{randomValue length=33 type='ALPHANUMERIC'}}
{{randomValue length=12 type='ALPHANUMERIC' uppercase=true}}
{{randomValue length=55 type='ALPHABETIC'}}
{{randomValue length=27 type='ALPHABETIC' uppercase=true}}
{{randomValue length=10 type='NUMERIC'}}
{{randomValue length=5 type='ALPHANUMERIC_AND_SYMBOLS'}}
{{randomValue type='UUID'}}
{{randomValue length=32 type='HEXADECIMAL' uppercase=true}}
```

{% endraw %}

## Pick random helper

A value can be randomly selected from a literal list:

{% raw %}

```handlebars
{{pickRandom '1' '2' '3'}}
```

{% endraw %}

Or from a list passed as a parameter:

{% raw %}

```handlebars
{{pickRandom (jsonPath request.body '$.names')}}
```

{% endraw %}

If you desire multiple unique elements to be randomly pulled from the list, a `count` option can be supplied to the
helper.
In this case, the result will be a list, instead of a single value.
For example, the following template:

{% raw %}

```handlebars
{{pickRandom 1 2 3 4 5 count=3}}
```

{% endraw %}

will produce a list similar to the following:

{% raw %}

```
[3, 5, 2]
```

{% endraw %}

## Random number helpers

These helpers produce random numbers of the desired type. By returning actual typed numbers rather than strings
we can use them for further work e.g. by doing arithemetic with the `math` helper or randomising the bound in a `range`.

Random integers can be produced with lower and/or upper bounds, or neither:

{% raw %}

```handlebars
{{randomInt}}
{{randomInt lower=5 upper=9}}
{{randomInt upper=54323}}
{{randomInt lower=-24}}
```

{% endraw %}

Likewise decimals can be produced with or without bounds:

{% raw %}

```handlebars
{{randomDecimal}}
{{randomDecimal lower=-10.1 upper=-0.9}}
{{randomDecimal upper=12.5}}
{{randomDecimal lower=-24.01}}
```
{% endraw %}

## Formatting numbers

The `numberFormat` helper allows you to specify how numbers are printed. It supports
a number of predefined formats, custom format strings and various other options
including rounding mode, decimal places and locale.

### Predefined formats
`numberFormat` supports the following predefined formats:

* `integer`
* `currency`
* `percent`

Predefined formats can be affected by locale, so it's usually a good idea to explicitly
specify this.

For example, to format a decimal number as currency, specifically British pounds:

{% raw %}
```handlebars
{{{numberFormat 123.4567 'currency' 'en_GB'}}}
```
{% endraw %}

Output: `£123.46`.

Alternatively, if we wanted to output the number as a percentage:

{% raw %}
```handlebars
{{{numberFormat 123.4567 'percent' 'en_GB'}}}
```
{% endraw %}

Output: `12,346%`.

### Custom format string
For maximum control over the number format you can specify a format string:

{% raw %}
```handlebars
{{{numberFormat 123.4567 '###.000000' 'en_GB'}}}
```
{% endraw %}

Output: `123.456700`.

See the [Java DecimalFormat documentation](https://docs.oracle.com/javase/8/docs/api/java/text/DecimalFormat.html)
for details on how to use format strings.


### Configuring number of digits
Separate from the format parameter, the number of digits before and after the
decimal place can be bounded using one or more of four parameters:
`maximumFractionDigits`, `minimumFractionDigits`, `maximumIntegerDigits`, `minimumIntegerDigits`.

{% raw %}
```handlebars
{{{numberFormat 1234.567 maximumIntegerDigits=3 minimumFractionDigits=6}}}
```
{% endraw %}

Output: `234.567000`.


### Disabling grouping
By default `numberFormat` will insert commas, periods etc. per the locale between
groups of digits e.g. `1,234.5`.

This behaviour can be disabled with `groupingUsed`.

{% raw %}
```handlebars
{{{numberFormat 12345.678 groupingUsed=false}}}
```
{% endraw %}

Output: `12345.678`.


### Rounding mode
The `roundingMode` parameter affects how numbers will be rounded up or down when
it's necessary to do so.

For instance, to always round down:

{% raw %}
```handlebars
{{{numberFormat 1.239 roundingMode='down' maximumFractionDigits=2}}}
```
{% endraw %}

Output: `1.23`.

Available rounding modes are:

* `up`
* `down`
* `half_up`
* `half_down`
* `half_even`
* `ceiling`
* `floor`.

See the [Java RoundingMode documentation](https://docs.oracle.com/javase/8/docs/api/java/math/RoundingMode.html)
for the exact meaning of each of these.


## Fake data helpers

This helper produces random fake data of the desired types available in the [Data Faker library](https://github.com/datafaker-net/datafaker). Due to the size of this library, this helper has been provided via [`RandomExtension`](https://github.com/wiremock/wiremock-faker-extension).    
{% raw %}

```handlebars
{{random 'Name.first_name'}}
{{random 'Address.postcode_by_state.AL' }}
```

{% endraw %}

## Math helper

The `math` (or maths, depending where you are) helper performs common arithmetic operations. It can accept integers, decimals
or strings as its operands and will always yield a number as its output rather than a string.

Addition, subtraction, multiplication, division and remainder (mod) are supported:

{% raw %}

```handlebars
{{math 1 '+' 2}}
{{math 4 '-' 2}}
{{math 2 '*' 3}}
{{math 8 '/' 2}}
{{math 10 '%' 3}}
```

{% endraw %}

## Range helper

The `range` helper will produce an array of integers between the bounds specified:

{% raw %}

```handlebars
{{range 3 8}}
{{range -2 2}}
```

{% endraw %}

This can be usefully combined with `randomInt` and `each` to output random length, repeating pieces of content e.g.

{% raw %}

```handlebars
{{#each (range 0 (randomInt lower=1 upper=10)) as |index|}}
id: {{index}}
{{/each}}
```

{% endraw %}

## Array literal helper

The `array` helper will produce an array from the list of parameters specified. The values can be any valid type.
Providing no parameters will result in an empty array.

{% raw %}

```handlebars
{{array 1 'two' true}}
{{array}}
```

{% endraw %}

## Array add & remove helpers
As of WireMock version `3.6.0`, the `arrayAdd` and `arrayRemove` helpers can be used to add or remove elements from an 
array based on a position value or the `start` or `end` keywords. If no position is specified, the element will be 
added or removed from the end of the array.

{% raw %}

```handlebars
{{arrayAdd (array 1 'three') 2 position=1}} // [1, 2, three]
{{arrayAdd (array 1 'three') 2 position='start'}} // [2, 1, three]
{{arrayAdd (array 1 'three') 2 position='end'}} // [1, three, 2]
{{arrayAdd (array 1 'three') 2}} // [1, three, 2]

{{arrayRemove (array 1 2 'three') position=1}} // [1, three]
{{arrayRemove (array 1 2 'three') position='start'}} // [2, three]
{{arrayRemove (array 1 2 'three') position='end'}} // [1, 2]
{{arrayRemove (array 1 2 'three')}} // [1, 2]
```

{% endraw %}

## arrayJoin helper

Released in WireMock version `3.6.0`, the `arrayJoin` helper will concatenate the values passed to it with the 
separator specified:

{% raw %}

```handlebars
{{arrayJoin ',' (array 'One' 'Two' 'Three')}} // One,Two,Three
{{arrayJoin ' - ' 'a' 'b' 'c'}} // a - b - c
{{arrayJoin ', ' (range 1 5)}} // 1, 2, 3, 4, 5
{{arrayJoin (pickRandom ':') (array 'One' 'Two' 'Three')}} // One:Two:Three
{{arrayJoin '' (array 'W' 'i' 'r' 'e' 'M' 'o' 'c' 'k' ' ' 'R' 'o' 'c' 'k' 's')}} // WireMock Rocks
```

{% endraw %}

You can also specify a `prefix` and `suffix` to be added to the start and end of the result:

{% raw %}

```handlebars
{{arrayJoin ',' (array 'One' 'Two' 'Three') prefix='[' suffix=']'}} // [One,Two,Three]
{{arrayJoin ' * ' (array 1 2 3) prefix='(' suffix=')'}} // (1 * 2 * 3)
```

{% endraw %}

The `arrayJoin` helper can also be used as a block helper:

{% raw %}

```handlebars
{{#parseJson 'myThings'}}
[
  { "id": 1, "name": "One" },
  { "id": 2, "name": "Two" },
  { "id": 3, "name": "Three" }
]
{{/parseJson}}
[{{#arrayJoin ',' myThings as |item|}}
{
"name{{item.id}}": "{{item.name}}"
}
{{/arrayJoin}}] // [{ "name1": "One" }, { "name2": "Two" }, { "name3": "Three" }]


// or the same example with the prefix and suffix parameters
{{#parseJson 'myThings'}}
    [
    { "id": 1, "name": "One" },
    { "id": 2, "name": "Two" },
    { "id": 3, "name": "Three" }
    ]
{{/parseJson}}
{{#arrayJoin ',' myThings prefix='[' suffix=']' as |item|}}
    {
    "name{{item.id}}": "{{item.name}}"
    }
{{/arrayJoin}} // [{ "name1": "One" }, { "name2": "Two" }, { "name3": "Three" }]
```

{% endraw %}


## Contains helper

The `contains` helper returns a boolean value indicating whether the string or array passed as the first parameter
contains the string passed in the second.

It can be used as parameter to the `if` helper:

{% raw %}

```handlebars
{{#if (contains 'abcde' 'abc')}}YES{{/if}}
{{#if (contains (array 'a' 'b' 'c') 'a')}}YES{{/if}}
```

{% endraw %}

Or as a block element on its own:

{% raw %}

```handlebars
{{#contains 'abcde' 'abc'}}YES{{/contains}}
{{#contains (array 'a' 'b' 'c') 'a'}}YES{{/contains}}
```

{% endraw %}

## Matches helper

The `matches` helper returns a boolean value indicating whether the string passed as the first parameter matches the
regular expression passed in the second:

Like the `contains` helper it can be used as parameter to the `if` helper:

{% raw %}

```handlebars
{{#if (matches '123' '[0-9]+')}}YES{{/if}}
```

{% endraw %}

Or as a block element on its own:

{% raw %}

```handlebars
{{#matches '123' '[0-9]+'}}YES{{/matches}}
```

{% endraw %}

## String trim helper

Use the `trim` helper to remove whitespace from the start and end of the input:

{% raw %}

```handlebars
{{trim request.headers.X-Padded-Header}}

{{#trim}}

    Some stuff with whitespace

{{/trim}}
```

{% endraw %}

## Base64 helper

The `base64` helper can be used to base64 encode and decode values:

{% raw %}

```handlebars
{{base64 request.headers.X-Plain-Header}}
{{base64 request.headers.X-Encoded-Header decode=true}}

{{#base64}}
Content to encode
{{/base64}}

{{#base64 padding=false}}
Content to encode without padding
{{/base64}}

{{#base64 decode=true}}
Q29udGVudCB0byBkZWNvZGUK
{{/base64}}
```

{% endraw %}

## URL encoding helper

The `urlEncode` helper can be used to URL encode and decode values:

{% raw %}

```handlebars
{{urlEncode request.headers.X-Plain-Header}}
{{urlEncode request.headers.X-Encoded-Header decode=true}}

{{#urlEncode}}
Content to encode
{{/urlEncode}}

{{#urlEncode decode=true}}
Content%20to%20decode
{{/urlEncode}}
```

{% endraw %}

## Form helper

The `formData` helper parses its input as an HTTP form, returning an object containing the individual fields as attributes.
The helper takes the input string and variable name as its required parameters, with an optional `urlDecode` parameter
indicating that values should be URL decoded. The folowing example will parse the request body as a form, then output a single field `formField3`:

{% raw %}

```handlebars
{{formData request.body 'form' urlDecode=true}}{{form.formField3}}
```

{% endraw %}

If the form submitted has multiple values for a given field, these can be accessed by index:

{% raw %}

```handlebars
{{formData request.body 'form' urlDecode=true}}{{form.multiValueField.1}}, {{form.multiValueField.2}}
{{formData request.body 'form' urlDecode=true}}{{form.multiValueField.first}}, {{form.multiValueField.last}}
```

{% endraw %}

## Regular expression extract helper

The `regexExtract` helper supports extraction of values matching a regular expresson from a string.

A single value can be extracted like this:

{% raw %}

```handlebars
{{regexExtract request.body '[A-Z]+'}}"
```

{% endraw %}

Regex groups can be used to extract multiple parts into an object for later use (the last parameter is a variable name to which the object will be assigned):

{% raw %}

```handlebars
{{regexExtract request.body '([a-z]+)-([A-Z]+)-([0-9]+)' 'parts'}}
{{parts.0}},{{parts.1}},{{parts.2}}
```

{% endraw %}

Optionally, a default value can be specified for when there is no match. When the regex does not match and no default is specified, an error will be thrown instead.

{% raw %}

```handlebars
{{regexExtract 'abc' '[0-9]+' default='my default value'}}
```

{% endraw %}

## Size helper

The `size` helper returns the size of a string, list or map:

{% raw %}

```handlebars
{{size 'abcde'}}
{{size request.query.things}}
```

{% endraw %}

## Hostname helper

The local machine's hostname can be printed:

{% raw %}

```handlebars
{{hostname}}
```

{% endraw %}

## System property helper

Environment variables and system properties can be printed:

{% raw %}

```handlebars
{{systemValue key='PATH'}} <!-- type defaults to ENVIRONMENT -->
{{systemValue type='ENVIRONMENT' key='PATH'}}
{{systemValue type='PROPERTY' key='os.path'}}
```

{% endraw %}

Since 3.5 a default value can be supplied:

{% raw %}

```handlebars
{{systemValue key='PATH' default='DEFAULT'}} <!-- type defaults to ENVIRONMENT -->
{{systemValue type='ENVIRONMENT' key='PATH' default='DEFAULT'}}
{{systemValue type='PROPERTY' key='os.path' default='DEFAULT'}}
```

{% endraw %}

If you want to add permitted extensions to your rule,
then you can use the `ResponseTemplateTransformer` when constructing the response template extension.

The `ResponseTemplateTransformer` accepts four arguments:
1. The `TemplateEngine`
2. If templating can be applied globally
3. The `FileSource` which is a list of files that can be used for relative references in stub definitions
4. A list of `TemplateModelDataProviderExtension` objects which are additional metadata providers which will be injected into the model and consumed in the downstream resolution if needed

```java
@Rule
public WireMockRule wm = new WireMockRule(options()
        .dynamicPort()
        .withRootDirectory(defaultTestFilesRoot())
        .extensions(new ResponseTemplateTransformer(
              getTemplateEngine(),
              options.getResponseTemplatingGlobal(),
              getFiles(),
              templateModelProviders
            )
        )
);
```

The regular expressions are matched in a case-insensitive manner.
If no permitted system key patterns are set, a single default of `wiremock.*` will be used.

