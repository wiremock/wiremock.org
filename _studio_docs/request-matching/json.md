---
layout: docs
title: Request Matching - Matching JSON requests
description: Matching JSON
---

When stubbing API functions that accept JSON request bodies we may want to
return different responses based on the JSON sent. MockLab provides two match types
to supports this case - `equalToJson` and `matchesJsonPath`, which are described
in detail in this article.

## Matching via JSON equality

The `equalToJson` match operator performs a semantic comparison of the input JSON
against the expected JSON. This has a number of advantages over a straight string
comparison:

* Ignores differences in whitespace
* Can be configured to ignore differences in array order
* Can be configured to ignore extra object attributes
* Supports placeholders so that specific attributes can be excluded from the comparison

By default `equalToJson` will match only if all of the elements in the input JSON
are the same as the expected JSON, arrays are in the same order and no additional
attributes are present.

For instance, given an expected JSON document like

<img src="/images/screenshots/default-equal-to-json.png" title="Default equal to JSON" />

You would need to send in the request body for the stub to match exactly that JSON
in order for the stub to be matched:

```
$ curl https://example.mocklab.io/json -d '{
  "itemId": 102938,
  "sizes": ["S", "M", "L"]
}'

{ "result": "OK" }
```

Changing the `sizes` order would cause a non-match:

```
$ curl https://example.mocklab.io/json -d '{
  "itemId": 102938,
  "sizes": ["L", "M", "S"]
}'

                                               Request was not matched
                                               =======================

-----------------------------------------------------------------------------------------------------------------------
| Closest stub                                             | Request                                                  |
-----------------------------------------------------------------------------------------------------------------------
                                                           |
JSON body matching                                         |
                                                           |
POST                                                       | POST
/json                                                      | /json
                                                           |
{                                                          | {                                                   <<<<< Body does not match
  "itemId" : 102938,                                       |   "itemId" : 102938,
  "sizes" : [ "S", "M", "L" ]                              |   "sizes" : [ "L", "M", "S" ]
}                                                          | }
                                                           |
-----------------------------------------------------------------------------------------------------------------------
```

Adding an extra attribute would also cause a non-match:

```
$ curl https://example.mocklab.io/json -d '{
  "itemId": 102938,
  "sizes": ["S", "M", "L"],
  "tag": "essentials"
}'

                                               Request was not matched
                                               =======================

-----------------------------------------------------------------------------------------------------------------------
| Closest stub                                             | Request                                                  |
-----------------------------------------------------------------------------------------------------------------------
                                                           |
JSON body matching                                         |
                                                           |
POST                                                       | POST
/json                                                      | /json
                                                           |
{                                                          | {                                                   <<<<< Body does not match
  "itemId" : 102938,                                       |   "itemId" : 102938,
  "sizes" : [ "S", "M", "L" ]                              |   "sizes" : [ "S", "M", "L" ],
}                                                          |   "tag" : "essentials"
                                                           | }
                                                           |
-----------------------------------------------------------------------------------------------------------------------
```

### Ignoring array order

Sometimes the order of elements in an array is unimportant and can change arbitrarily
between multiple requests. In this case it's undesirable for your stub match to fail
due to array order, so to remedy this you can simply tick "Ignore array order".

<img src="/images/screenshots/ignore-array-order.png" title="Equal to JSON ignoring array order" />

This will allow requests like the following to succeed:

```
$ curl https://example.mocklab.io/json -d '{
  "itemId": 102938,
  "sizes": ["S", "L", "M"]
}'                   

{ "result": "OK" }
```

### Ignoring extra elements

If you're only interested in matching a specific set of JSON elements and don't mind
if additional elements are present you can tick "Ignore extra elements".

<img src="/images/screenshots/ignore-extra-elements.png" title="Equal to JSON ignoring extra elements" />

This would permit the following to match:

```
$ curl https://example.mocklab.io/json -d '{
  "itemId": 102938,
  "sizes": ["S", "M", "L"],
  "tag": "essentials"
}'
```


### Using placeholders to ignore specific JSON attributes

If you want to check that an element is present, but don't care what the value is
then you can use JSONUnit placeholder syntax to achieve this.

Note: unlike with XML placeholders this is enabled by default.

For instance, given the following configuration:

<img src="/images/screenshots/json-placeholders.png" title="Equal to JSON with placeholder" />

This would permit the the following to match:

```
$ curl https://example.mocklab.io/json -d '{
  "itemId": 8888888888,
  "sizes": ["S", "M", "L"],
  "tag": "essentials"
}'
```

When using `${json-unit.ignore}`, the element's type is also ignored (in addition to its value),
so in the above case a string, boolean etc. could have been used in place of the numeric ID.

If you want to constrain an element to a specific type but still ignore the value
you can use one of the following placeholders:

* `${json-unit.regex}[A-Z]+` (any Java-style regular expression can be used)
* `${json-unit.any-string}`
* `${json-unit.any-boolean}`
* `${json-unit.any-number}`


## Matching via JSONPath - `matchesJsonPath`

[JSONPath](https://github.com/json-path/JsonPath){:target="{{site.data.misc.blank}}"} is an expression language,
similar in concept to XPath that permits elements or collections of elements
to be queried from a JSON document.

MockLab supports stub matching using JSONPath expressions, optionally sub-matching
the result using MockLab's own operators (`equalTo`, `matches` etc.).

Given the following configration:

<img src="/images/screenshots/jsonpath-with-submatch.png" title="JSONPath with equal to" />

The following JSON will be matched:

```
$ curl https://example.mocklab.io/json -d '{
  "itemId": 102938,
  "itemName": "Socks"
}'
```

### Expression only vs. expression + sub-match

It is possible to match a JSON document without a sub-match by selecting "is present"
from the drop-down:

<img src="/images/screenshots/jsonpath-no-submatch.png" title="JSONPath with equal to" />

If you do this, the JSON input will be considered a match if the expression returns
1 or more elements.

This feature is primarily present for compatibility with WireMock projects, and
generally it is better to use sub-matches as this results in simpler JSONPath
expressions and more useful debug output when there is a non-match.


### Common JSONPath examples

Matching on a specific array element by position.

`$.sizes[1]` `equal to` `M`

would match:

```json
{
  "sizes": ["S", "M", "L"]
}
```

Matching on an element of an object found via another element.

`$.addresses[?(@.type == 'business')].postcode` `contains` `N11NN`

would match:

```json
{
  "addresses": [
    {
      "type": "home",
      "postcode": "Z55ZZ"
    },
    {
      "type": "business",
      "postcode": "N11NN"
    }
  ]
}
```

It is necessary to use `contains` in this instance as a JSONPath expression containing
a query part (between the `[?` and `]`) will always return a collection
of results.


Matching an element found recursively.

`$..postcode` `contains` `N11NN`

would match:

```json
{
  "addresses": [
    {
      "type": "home",
      "postcode": "Z55ZZ"
    },
    {
      "type": "business",
      "postcode": "N11NN"
    }
  ]
}
```

and would also match:

```json
{
  "address": {
    "type": "business",
    "postcode": "N11NN"
  }
}
```
