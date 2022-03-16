---
layout: docs
title: Response Templating - Working with JSON
description: Working with JSON and JSONPath
---

MockLab provides the `jsonPath` helper which will extract values from a JSON document
using the [JSONPath](https://github.com/json-path/JsonPath){:target="{{site.data.misc.blank}}"} expression language.

Similar in concept to XPath, JSONPath permits selection of individual values or sub-documents
via a query expression.

For example, given the JSON

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


## Iterating over JSON elements

The `jsonPath` helper outputs a "one or many" collection, which can either
be printed directly, or passed to further helpers such as [`each`](/docs/response-templating/conditional-logic-and-iteration/#iteration) or [`join`](/docs/response-templating/string-helpers/#join).

For instance, given a request body of the form:

```json
{
  "things": [
    {
      "id": 1
    },
    {
      "id": 2
    },
    {
      "id": 3
    }
  ]
}
```

And the following response body template:

{% raw %}
```handlebars
{{#each (jsonPath request.body '$.things') as |thing|}}
thing: {{{thing.id}}}{{/each}}
```
{% endraw %}


The response body will contain:

```
thing: 1
thing: 2
thing: 3
```

The above will only work if the JSONPath expression selects an array from the
request JSON. However, `each` can also be used to iterate over maps/objects, so given
the request JSON:

```json
{
  "things": {
    "one": 1,
    "two": 2,
    "three": 3
  }
}
```

And the template:

{% raw %}
```handlebars
{{#each (jsonPath request.body '$.things') as |value key|}}
{{{key}}}={{{value}}}{{/each}}
```
{% endraw %}


The output would contain:

```
one=1
two=2
three=3
```
