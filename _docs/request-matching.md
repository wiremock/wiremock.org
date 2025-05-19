---
layout: docs
title: Request Matching
meta_title: Matching and filtering HTTP requests in WireMock | WireMock
toc_rank: 61
description: WireMock supports matching of requests to stubs and verification queries using the following attributes.
---

<div class="cloud-callout"><a href="https://www.wiremock.io?utm_source=oss-docs&utm_medium=oss-docs&utm_campaign=cloud-callouts-requestmatching&utm_id=cloud-callouts&utm_term=cloud-callouts-requestmatching" target="_BLANK">If you need to protect your mock APIs with Enterprise-grade security options, learn about WireMock Cloud.</a></div>

WireMock enables flexible definition of a [mock API](/) by supporting rich matching of incoming requests. Stub matching and verification queries can use the following request attributes:

- URL
- HTTP Method
- Query parameters
- Form parameters
- Headers
- Basic authentication (a special case of header matching)
- Cookies
- Request body
- Multipart/form-data
- Client IP (as of WireMock version `3.13.0`)

Here's an example showing all attributes being matched using WireMock's in-built match operators. It is also possible to write [custom matching logic](../extending-wiremock#custom-request-matchers) if
you need more precise control:

## Request with XML Body

{% codetabs %}

{% codetab Java %}
```java
stubFor(any(urlPathEqualTo("/everything"))
  .withHeader("Accept", containing("xml"))
  .withCookie("session", matching(".*12345.*"))
  .withQueryParam("search_term", equalTo("WireMock"))
  .withBasicAuth("jeff@example.com", "jeffteenjefftyjeff")
  .withRequestBody(equalToXml("<search-results />"))
  .withRequestBody(matchingXPath("//search-results"))
  .withMultipartRequestBody(
  	aMultipart()
  		.withName("info")
  		.withHeader("Content-Type", containing("charset"))
  		.withBody(equalToJson("{}"))
  )
  .withClientIp(equalTo("127.0.0.1"))
  .willReturn(aResponse()));
```
{% endcodetab %}

{% codetab JSON %}
```json
{
    "request": {
        "urlPath": "/everything",
        "method": "ANY",
        "headers": {
            "Accept": {
                "contains": "xml"
            }
        },
        "queryParameters": {
            "search_term": {
                "equalTo": "WireMock"
            }
        },
        "cookies": {
            "session": {
                "matches": ".*12345.*"
            }
        },
        "bodyPatterns": [
            {
                "equalToXml": "<search-results />"
            },
            {
                "matchesXPath": "//search-results"
            }
        ],
        "multipartPatterns": [
            {
                "matchingType": "ANY",
                "headers": {
                    "Content-Disposition": {
                        "contains": "name=\"info\""
                    },
                    "Content-Type": {
                        "contains": "charset"
                    }
                },
                "bodyPatterns": [
                    {
                        "equalToJson": "{}"
                    }
                ]
            }
        ],
        "basicAuthCredentials": {
            "username": "jeff@example.com",
            "password": "jeffteenjefftyjeff"
        },
        "clientIp": {
            "equalTo": "127.0.0.1"
        }
    },
    "response": {
        "status": 200
    }
}
```
{% endcodetab %}

{% endcodetabs %}

## Request with Form Parameters

{% codetabs %}

{% codetab Java %}
```java
stubFor(post(urlPathEqualTo("/mock"))
        .withFormParam("tool", equalTo("WireMock")
).willReturn(ok()));
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    "urlPath": "/mock",
    "method": "POST",
    "formParameters": {
      "tool": {
        "equalTo": "WireMock"
      }
    }
  },
  "response": {
    "status": 200
  }
}
```
{% endcodetab %}

{% endcodetabs %}

The following sections describe each type of matching strategy in detail.

## URL matching

URLs can be matched either by equality or by regular expression. You also have a choice of whether to match just the path part of the URL or the path and query together.

It is usually preferable to match on path only if you want to match multiple query parameters in an order invariant manner.

### Equality matching on path and query

{% codetabs %}

{% codetab Java %}
```java
urlEqualTo("/your/url?and=query")
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    "url": "/your/url?and=query"
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

### Regex matching on path and query

{% codetabs %}

{% codetab Java %}
```java
urlMatching("/your/([a-z]*)\\?and=query")
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    "urlPattern": "/your/([a-z]*)\\?and=query"
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

### Equality matching on the path only

{% codetabs %}

{% codetab Java %}
```java
urlPathEqualTo("/your/url")
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    "urlPath": "/your/url"
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

### Regex matching on the path only

{% codetabs %}

{% codetab Java %}
```java
urlPathMatching("/your/([a-z]*)")
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    "urlPathPattern": "/your/([a-z]*)"
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

### Path templates

WireMock from 3.0.0 onwards supports matching on URL path templates conforming to the [RFC 6570](https://www.rfc-editor.org/rfc/rfc6570) standard.

When the path template URL match type is used this enables

1. The ability to match path variables in the same way as query parameters, headers etc.
2. The ability to reference path variables by name in [response templates](../response-templating/#the-request-model).

To match any request URL that conforms to the path template, you can do the following.

{% codetabs %}

{% codetab Java %}
```java
stubFor(
    get(urlPathTemplate("/contacts/{contactId}/addresses/{addressId}"))
      .willReturn(ok()));
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    "urlPathTemplate": "/contacts/{contactId}/addresses/{addressId}"
    "method" : "GET"
  },
  "response" : {
    "status" : 200
  }
}
```
{% endcodetab %}

{% endcodetabs %}

To further constrain the match to specific values of the path variables you can add match clauses for some or all of the variables in the path expression.

{% codetabs %}

{% codetab Java %}
```java
stubFor(
    get(urlPathTemplate("/contacts/{contactId}/addresses/{addressId}"))
      .withPathParam("contactId", equalTo("12345"))
      .withPathParam("addressId", equalTo("99876"))
      .willReturn(ok()));
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request" : {
    "urlPathTemplate" : "/v1/contacts/{contactId}/addresses/{addressId}",
    "method" : "GET",
    "pathParameters" : {
      "contactId" : {
        "equalTo" : "12345"
      },
      "addressId" : {
        "equalTo" : "99876"
      }
    }
  },
  "response" : {
    "status" : 200
  }
}
```
{% endcodetab %}

{% endcodetabs %}

## Matching other attributes

All request attributes other than the URL can be matched using the following set of operators.

### Equality

Deems a match if the entire attribute value equals the expected value.

{% codetabs %}

{% codetab Java %}
```java
.withHeader("Content-Type", equalTo("application/json"))
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "headers": {
      "Content-Type": {
        "equalTo": "application/json"
      }
    }
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

### Case-insensitive equality

Deems a match if the entire attribute value equals the expected value, ignoring case.

{% codetabs %}

{% codetab Java %}
```java
.withHeader("Content-Type", equalToIgnoreCase("application/json"))
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "headers": {
      "Content-Type": {
        "equalTo": "application/json",
        "caseInsensitive": true
      }
    }
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

### Binary Equality

Deems a match if the entire binary attribute value equals the expected value. Unlike the above equalTo operator, this compares byte arrays (or their equivalent base64 representation).

{% codetabs %}

{% codetab Java %}
```java
// Specifying the expected value as a byte array
.withRequestBody(binaryEqualTo(new byte[] { 1, 2, 3 }))

// Specifying the expected value as a base64 String
.withRequestBody(binaryEqualTo("AQID"))
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "bodyPatterns" : [{
        "binaryEqualTo" : "AQID" // Base 64
    }]
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

### Substring (contains)

Deems a match if the a portion of the attribute value equals the expected value.

{% codetabs %}

{% codetab Java %}
```java
.withCookie("my_profile", containing("johnsmith@example.com"))
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "cookies" : {
      "my_profile" : {
        "contains" : "johnsmith@example.com"
      }
    }
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

### Negative substring (does not contain)

Deems a match if the attribute value does not contain the expected value.

{% codetabs %}

{% codetab Java %}
```java
.withCookie("my_profile", notContaining("johnsmith@example.com"))
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "cookies" : {
      "my_profile" : {
        "doesNotContain" : "johnsmith@example.com"
      }
    }
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

### Regular expression

Deems a match if the entire attribute value matched the expected regular expression.

{% codetabs %}

{% codetab Java %}
```java
.withQueryParam("search_term", matching("^(.*)wiremock([A-Za-z]+)$"))
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "queryParameters" : {
      "search_term" : {
        "matches" : "^(.*)wiremock([A-Za-z]+)$"
      }
    }
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

It is also possible to perform a negative match i.e. the match succeeds when the attribute value does not match the regex:

{% codetabs %}

{% codetab Java %}
```java
.withQueryParam("search_term", notMatching("^(.*)wiremock([A-Za-z]+)$"))
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "queryParameters" : {
      "search_term" : {
        "doesNotMatch" : "^(.*)wiremock([A-Za-z]+)$"
      }
    }
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

### JSON equality

Deems a match if the attribute (most likely the request body in practice) is valid JSON and is a semantic match for the expected value.

{% codetabs %}

{% codetab Java %}
```java
.withRequestBody(equalToJson("{ \"total_results\": 4 }"))
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "bodyPatterns" : [ {
      "equalToJson" : { "total_results": 4 }
    } ]
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

With string literal:

{% codetabs %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "bodyPatterns" : [ {
      "equalToJson" : "{ \"total_results\": 4 }"
    } ]
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

#### Less strict matching

By default different array orderings and additional object attributes will trigger a non-match. However, both of these conditions can be disabled individually.

{% codetabs %}

{% codetab Java %}
```java
.withRequestBody(equalToJson("{ \"total_results\": 4  }", true, true))
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "bodyPatterns" : [ {
      "equalToJson" : "{ \"total_results\": 4  }",
      "ignoreArrayOrder" : true,
      "ignoreExtraElements" : true
    } ]
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

#### Placeholders

JSON equality matching is based on [JsonUnit](https://github.com/lukas-krecan/JsonUnit) and therefore supports placeholders.
This allows specific attributes to be treated as wildcards, rather than an exactly value being required for a match.

For instance, the following:

```json
{ "id": "${json-unit.any-string}" }
```

would match a request with a JSON body of:

```json
{ "id": "abc123" }
```

It's also possible to use placeholders that constrain the expected value by type or regular expression.
See [the JsonUnit placeholders documentation](https://github.com/lukas-krecan/JsonUnit#typeplc) for the full syntax.

### JSON Path

Deems a match if the attribute value is valid JSON and matches the [JSON Path](http://goessner.net/articles/JsonPath/) expression supplied. A JSON body will be considered to match a path expression if the expression returns either a non-null single value (string, integer etc.), or a non-empty object or array.

#### Presence matching

Deems a match if the attribute value is present in the JSON.

{% codetabs %}

{% codetab Java %}
```java
.withRequestBody(matchingJsonPath("$.name"))
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "bodyPatterns" : [ {
      "matchesJsonPath" : "$.name"
    } ]
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

Request body example:

```
// matching
{ "name": "Wiremock" }
// not matching
{ "price": 15 }
```

#### Equality matching

Deems a match if the attribute value equals the expected value.

{% codetabs %}

{% codetab Java %}
```java
.withRequestBody(matchingJsonPath("$.things[?(@.name == 'RequiredThing')]"))
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "bodyPatterns" : [ {
      "matchesJsonPath" : "$.things[?(@.name == 'RequiredThing')]"
    } ]
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

Request body example:

```
// matching
{ "things": { "name": "RequiredThing" } }
{ "things": [ { "name": "RequiredThing" }, { "name": "Wiremock" } ] }
// not matching
{ "price": 15 }
{ "things": { "name": "Wiremock" } }
```

#### Regex matching

Deems a match if the attribute value matches the regex expected value.

{% codetabs %}

{% codetab Java %}
```java
.withRequestBody(matchingJsonPath("$.things[?(@.name =~ /Required.*/i)]"))
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "bodyPatterns" : [ {
      "matchesJsonPath" : "$.things[?(@.name =~ /Required.*/i)]"
    } ]
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

Request body example:

```json
// matching
{ "things": { "name": "RequiredThing" } }
{ "things": [ { "name": "Required" }, { "name": "Wiremock" } ] }
// not matching
{ "price": 15 }
{ "things": { "name": "Wiremock" } }
{ "things": [ { "name": "Thing" }, { "name": "Wiremock" } ] }
```

#### Size matching

Deems a match if the attribute size matches the expected size.

{% codetabs %}

{% codetab Java %}
```java
.withRequestBody(matchingJsonPath("$[?(@.things.size() == 2)]"))
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "bodyPatterns" : [ {
      "matchesJsonPath" : "$[?(@.things.size() == 2)]"
    } ]
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

Request body example:

```json
// matching
{ "things": [ { "name": "RequiredThing" }, { "name": "Wiremock" } ] }
// not matching
{ "things": [ { "name": "RequiredThing" } ] }
```

#### Nested value matching

The JSONPath matcher can be combined with another matcher, such that the value returned from the JSONPath query is evaluated against it:

{% codetabs %}

{% codetab Java %}
```java
.withRequestBody(matchingJsonPath("$..todoItem", containing("wash")))
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "bodyPatterns" : [ {
      "matchesJsonPath" : {
         "expression": "$..todoItem",
         "contains": "wash"
      }
    } ]
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

Since WireMock's matching operators all work on strings, the value selected by the JSONPath expression will be coerced to a string before the match is evaluated. This true even if the returned value
is an object or array. A benefit of this is that this allows a sub-document to be selected using JSONPath, then matched using the `equalToJson` operator. E.g. for the following request body:

```json
{
    "outer": {
        "inner": 42
    }
}
```

The following will match:

{% codetabs %}

{% codetab Java %}
```java
.withRequestBody(matchingJsonPath("$.outer", equalToJson("{                \n" +
                                                         "   \"inner\": 42 \n" +
                                                         "}")))
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "bodyPatterns" : [ {
      "matchesJsonPath" : {
         "expression": "$.outer",
         "equalToJson": "{ \"inner\": 42 }"
      }
    } ]
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

### JSON schema

Deems a match if the value conforms to the expected JSON schema.

By default the [V202012](https://json-schema.org/draft/2020-12/schema){:target="{{site.data.misc.blank}}"} version of the JSON schema spec will be used, but this can be changed to one of `V4`, `V6`, `V7`, `V201909`, `V202012` via the `schemaVersion` parameter.

{% codetabs %}

{% codetab Java %}
```java
stubFor(
  post(urlPathEqualTo("/schema-match"))
    .withRequestBody(matchingJsonSchema("{\n" +
        "  \"type\": \"object\",\n" +
        "  \"required\": [\n" +
        "    \"name\"\n" +
        "  ],\n" +
        "  \"properties\": {\n" +
        "    \"name\": {\n" +
        "      \"type\": \"string\"\n" +
        "    },\n" +
        "    \"tag\": {\n" +
        "      \"type\": \"string\"\n" +
        "    }\n" +
        "  }\n" +
        "}"))
    .willReturn(ok()));
```
{% endcodetab %}

{% codetab JSON %}
(supported in 3.4+):
```json
{
  "request" : {
    "urlPath" : "/schema-match",
    "method" : "POST",
    "bodyPatterns" : [ {
      "matchesJsonSchema" : {
        "type": "object",
        "required": [
          "name"
        ],
        "properties": {
          "name": {
            "type": "string"
          },
          "tag": {
            "type": "string"
          }
        }
      },
      "schemaVersion" : "V202012"
    } ]
  },
  "response" : {
    "status" : 200
  }
}
```
{% endcodetab %}

{% endcodetabs %}

With string literal:

{% codetabs %}

{% codetab JSON %}

```json
{
  "request" : {
    "urlPath" : "/schema-match",
    "method" : "POST",
    "bodyPatterns" : [ {
      "matchesJsonSchema" : "{\n  \"type\": \"object\",\n  \"required\": [\n    \"name\"\n  ],\n  \"properties\": {\n    \"name\": {\n      \"type\": \"string\"\n    },\n    \"tag\": {\n      \"type\": \"string\"\n    }\n  }\n}",
      "schemaVersion" : "V202012"
    } ]
  },
  "response" : {
    "status" : 200
  }
}
```
{% endcodetab %}

{% endcodetabs %}

### XML equality

Deems a match if the attribute value is valid XML and is semantically equal to the expected XML document. The underlying engine for determining XML equality is [XMLUnit](http://www.xmlunit.org/).

{% codetabs %}

{% codetab Java %}
```java
.withRequestBody(equalToXml("<thing>Hello</thing>"))
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "bodyPatterns" : [ {
      "equalToXml" : "<thing>Hello</thing>"
    } ]
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

#### Use of placeholders

The XMLUnit [placeholders](https://github.com/xmlunit/user-guide/wiki/Placeholders) feature is supported in WireMock. For example, when comparing the XML documents, you can ignore some text nodes.

{% codetabs %}

{% codetab Java %}
```java
.withRequestBody(
    equalToXml("<message><id>${xmlunit.ignore}</id><content>Hello</content></message>", true)
)
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "bodyPatterns" : [ {
      "equalToXml" : "<message><id>${xmlunit.ignore}</id><content>Hello</content></message>",
      "enablePlaceholders" : true
    } ]
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

When the actual request body is `<message><id>123456</id><content>Hello</content></message>`, it will be deemed a match.

If the default placeholder delimiters `${` and `}` can not be used, you can specify custom delimiters (using regular expressions). For example:

{% codetabs %}

{% codetab Java %}
```java
.withRequestBody(
    equalToXml("<message><id>[[xmlunit.ignore]]</id><content>Hello</content></message>",
               true,
               "\\[\\[",
               "]]"
    )
)
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "bodyPatterns" : [ {
      "equalToXml" : "<message><id>[[xmlunit.ignore]]</id><content>Hello</content></message>",
      "enablePlaceholders" : true,
      "placeholderOpeningDelimiterRegex" : "\\[\\[",
      "placeholderClosingDelimiterRegex" : "]]"
    } ]
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

#### Excluding specific types of comparison

You can further tune how XML documents are compared for equality by disabling specific [XMLUnit comparison types](https://www.xmlunit.org/api/java/2.7.0/org/xmlunit/diff/ComparisonType.html).

{% codetabs %}

{% codetab Java %}
```java
import static org.xmlunit.diff.ComparisonType.*;

...

.withRequestBody(equalToXml("<thing>Hello</thing>")
    .exemptingComparisons(NAMESPACE_URI, ELEMENT_TAG_NAME)
)
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "bodyPatterns" : [ {
      "equalToXml" : "<thing>Hello</thing>",
      "exemptedComparisons": ["NAMESPACE_URI", "ELEMENT_TAG_NAME"]
    } ]
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

The full list of comparison types used by default is as follows:

`ELEMENT_TAG_NAME`
`SCHEMA_LOCATION`
`NO_NAMESPACE_SCHEMA_LOCATION`
`NODE_TYPE`
`NAMESPACE_PREFIX`
`NAMESPACE_URI`
`TEXT_VALUE`
`PROCESSING_INSTRUCTION_TARGET`
`PROCESSING_INSTRUCTION_DATA`
`ELEMENT_NUM_ATTRIBUTES`
`ATTR_VALUE`
`CHILD_NODELIST_LENGTH`
`CHILD_LOOKUP`
`ATTR_NAME_LOOKUP`

#### Same child nodes with different content
By default, WireMock takes into account an order of identical child nodes. Meaning if actual request has different order of same node on same level than stub it won't be matched.
As of WireMock version `3.7.0`, this can be changed by passing additional argument to the `equalToXml` method

{% codetabs %}

{% codetab Java %}
```java
    .withRequestBody(equalToXml("<body>" +
            "   <entry>1</entry>" +
            "   <entry>2</entry>" +
            "</body>",false,true))
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "bodyPatterns" : [ {
      "equalToXml" : "<body><entry>1</entry><entry>2</entry></body>",
      "ignoreOrderOfSameNode": true
    } ]
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

This will make sure that stub above matches both of following requests:
```xml
<body>
    <entry>2</entry>
    <entry>1</entry>
</body>
```
and 
```xml
<body>
    <entry>1</entry>
    <entry>2</entry>
</body>
```
If third argument is passed as `false` then first xml will not match the stub

#### Namespace awareness

To configure how [XML namespaces](https://www.w3schools.com/xml/xml_namespaces.asp) are handled, as of WireMock 
`3.12.0`, the `namespaceAwareness` property can be set.

{% codetabs %}

{% codetab Java %}
```java
    .withRequestBody(equalToXml("<body>" +
            "   <entry>1</entry>" +
            "   <entry>2</entry>" +
            "</body>").withNamespaceAwareness(EqualToXmlPattern.NamespaceAwareness.STRICT))
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "bodyPatterns" : [ {
      "equalToXml" : "<body><entry>1</entry><entry>2</entry></body>",
      "namespaceAwareness": "STRICT"
    } ]
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

The available options for namespace awareness behaviour are `STRICT`, `NONE` and `LEGACY`.

`STRICT` adheres to strict XML namespace comparison.
Namespace prefixes must be bound to a namespace URI.
Namespace prefixes as well as namespace URIs must match (for both elements and attributes), unless explicitly excluded
by the `exemptedComparisons` parameter.

`NONE` does not consider XML namespaces when reading and comparing XML documents.
Namespace prefixes do not need to be bound to a namespace URI and are not considered a separate part of an
element/attribute name (i.e. the entire element/attribute name must match, not just the local name, regardless of
the `exemptedComparisons` parameter).
`xmlns` namespaced attributes are treated no differently to any other attribute.

`LEGACY` is not recommended and is only kept as an option for backwards compatibility.

### XPath

Deems a match if the attribute value is valid XML and matches the XPath expression supplied. An XML document will be considered to match if any elements are returned by the XPath evaluation. WireMock delegates to Java's in-built XPath engine (via XMLUnit), therefore up to (at least) Java 8 it supports XPath version 1.0.

{% codetabs %}

{% codetab Java %}
```java
.withRequestBody(matchingXPath("/todo-list[count(todo-item) = 3]"))
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "bodyPatterns" : [ {
      "matchesXPath" : "/todo-list[count(todo-item) = 3]"
    } ]
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

The above example will select elements based on their local name if used with a namespaced XML document.

If you need to be able to select elements based on their namespace in addition to their name you can declare the prefix
to namespace URI mappings and use them in your XPath expression:

{% codetabs %}

{% codetab Java %}
```java
.withRequestBody(matchingXPath("/stuff:outer/more:inner[.=111]")
  .withXPathNamespace("stuff", "http://stuff.example.com")
  .withXPathNamespace("more", "http://more.example.com"))
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "bodyPatterns" : [ {
      "matchesXPath" : "/stuff:outer/more:inner[.=111]",
      "xPathNamespaces" : {
        "stuff" : "http://stuff.example.com",
        "more"  : "http://more.example.com"
      }
    } ]
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

#### Nested value matching

The XPath matcher described above can be combined with another matcher, such that the value returned from the XPath query is evaluated against it:

{% codetabs %}

{% codetab Java %}
```java
.withRequestBody(matchingXPath("//todo-item/text()", containing("wash")))
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "bodyPatterns" : [ {
      "matchesXPath" : {
         "expression": "//todo-item/text()",
         "contains": "wash"
      }
    } ]
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

If multiple nodes are returned from the XPath query, all will be evaluated and the returned match will be the one with the shortest distance.

If the XPath expression returns an XML element rather than a value, this will be rendered as an XML string before it is passed to the value matcher.
This can be usefully combined with the `equalToXml` matcher e.g.

{% codetabs %}

{% codetab Java %}
```java
.withRequestBody(matchingXPath("//todo-item", equalToXml("<todo-item>Do the washing</todo-item>")))
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "bodyPatterns" : [ {
      "matchesXPath" : {
         "expression": "//todo-item",
         "equalToXml": "<todo-item>Do the washing</todo-item>"
      }
    } ]
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

### Absence

Deems a match if the attribute specified is absent from the request.

{% codetabs %}

{% codetab Java %}
```java
.withCookie("session", absent())
.withQueryParam("search_term", absent())
.withHeader("X-Absent", absent())
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "headers" : {
      "X-Absent" : {
        "absent" : true
      }
    },
    "queryParameters" : {
      "search_term" : {
        "absent" : true
      }
    },
    "cookies" : {
      "session" : {
        "absent" : true
      }
    }
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

## Multipart/form-data

Deems a match if a multipart value is valid and matches any or all the multipart pattern matchers supplied. As a Multipart is a 'mini' HTTP request in itself all existing Header and Body content matchers can by applied to a Multipart pattern.
A Multipart pattern can be defined as matching `ANY` request multiparts or `ALL`. The default matching type is `ANY`.

{% codetabs %}

{% codetab Java %}
```java
stubFor(...)
  ...
  .withMultipartRequestBody(
  	aMultipart()
  		.withName("info")
  		.withHeader("Content-Type", containing("charset"))
  		.withMultipartBody(equalToJson("{}"))
  )
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "request": {
    ...
    "multipartPatterns" : [ {
      "matchingType" : "ANY",
      "headers" : {
        "Content-Disposition" : {
          "contains" : "name=\"info\""
        },
        "Content-Type" : {
          "contains" : "charset"
        }
      },
      "bodyPatterns" : [ {
        "equalToJson" : "{}"
      } ]
    } ],
    ...
  },
  ...
}
```
{% endcodetab %}

{% endcodetabs %}

## Basic Authentication

Although matching on HTTP basic authentication could be supported via a
correctly encoded `Authorization` header, you can also do this more simply
via the API.

{% codetabs %}

{% codetab Java %}
```java
stubFor(get(urlEqualTo("/basic-auth")).withBasicAuth("user", "pass")
```
{% endcodetab %}

{% codetab JSON %}
```json
{
    "request": {
        "method": "GET",
        "url": "/basic-auth",
        "basicAuth": {
            "username": "user",
            "password": "pass"
        }
    },
    "response": {
        "status": 200
    }
}
```
{% endcodetab %}

{% endcodetabs %}

## Dates and times

Dates and times can be matched in several ways. Three comparison operators are available: `before`, `after` and
`equalToDateTime`, all of which have the same set of parameters.

Additionally, the expected value can be either literal (fixed) or an offset from the current date. Both the expected and
actual dates can be truncated in various ways.

### Literal date/times

You can match an incoming date/time against a fixed value e.g. "match if the X-Munged-Date request header is after x":

{% codetabs %}

{% codetab Java %}
```java
stubFor(post("/dates")
  .withHeader("X-Munged-Date", after("2021-05-01T00:00:00Z"))
  .willReturn(ok()));

// You can also use a ZonedDateTime or LocalDateTime object
stubFor(post("/dates")
  .withHeader("X-Munged-Date", after(ZonedDateTime.parse("2021-05-01T00:00:00Z")))
  .willReturn(ok()));
```
{% endcodetab %}

{% codetab JSON %}
```json
{
    "request": {
        "url": "/dates",
        "method": "POST",
        "headers": {
            "X-Munged-Date": {
                "after": "2021-05-01T00:00:00Z"
            }
        }
    },
    "response": {
        "status": 200
    }
}
```
{% endcodetab %}

{% endcodetabs %}

### Offset

You can also match in incoming value against the current date/time or an offset from it:

{% codetabs %}

{% codetab Java %}
```java
stubFor(post("/dates")
  .withHeader("X-Munged-Date", beforeNow().expectedOffset(3, DateTimeUnit.DAYS))
  .withHeader("X-Finalised-Date", before("now +2 months")) // This form and beforeNow() are equivalent
  .willReturn(ok()));
```
{% endcodetab %}

{% codetab JSON %}
```json
{
    "request": {
        "url": "/dates",
        "method": "POST",
        "headers": {
            "X-Munged-Date": {
                "before": "now +3 days"
            },
            "X-Finalised-Date": {
                // This is equivalent to "now +2 months"
                "before": "now",
                "expectedOffset": 2,
                "expectedOffsetUnit": "months"
            }
        }
    }
}
```
{% endcodetab %}

{% endcodetabs %}

### Local vs. Zoned

Both the expected and actual date/time values can either have timezone information or not. For instance a
date in ISO8601 format could be zoned: `2021-06-24T13:40:27+01:00` or `2021-06-24T12:40:27Z`, or local: `2021-06-24T12:40:27`.

Likewise a date/time in RFC 1123 (HTTP standard) format is also zoned: `Tue, 01 Jun 2021 15:16:17 GMT`.

Whether the expected and actual values are zoned or not affects whether they can be matched and how. Generally, the best
approach is to try to ensure you're using the same on both sides - if you're expected a zoned actual date, then use one
as the expected date also, plus the equivalent for local dates.

If the expected date is zoned and the actual is local, the actual date will assume the system timezone before the
comparison is attempted.

If the expected date is local and the actual is zoned, the timezone will be stripped from the actual value before the
comparison is attempted.

### Date formats

By default these matchers will attempt to parse date/times in ISO8601 format, plus the three standard formats defined by
HTTP RFCs 1123, 1036 and asctime (taken from C but also valid for specifying HTTP dates).

It is also possible to specify your own format using
[Java's date format strings](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html#patterns).

{% codetabs %}

{% codetab Java %}
```java
stubFor(post("/dates")
  .withHeader("X-Munged-Date",
    equalToDateTime("2021-06-24T00:00:00").actualFormat("dd/MM/yyyy"))
  .willReturn(ok()));
```
{% endcodetab %}

{% codetab JSON %}
```json
{
    "request": {
        "url": "/dates",
        "method": "POST",
        "headers": {
            "X-Munged-Date": {
                "equalToDateTime": "2021-06-24T00:00:00",
                "actualFormat": "dd/MM/yyyy"
            }
        }
    }
}
```
{% endcodetab %}

{% endcodetabs %}

### Truncation

Both the expected and actual date/times can be truncated in various ways e.g. to the first hour of the day. When using
offset from now as the expected date with truncation, the truncation will be applied first followed by the offsetting.

Truncation is useful if you want to create expressions like "before the end of this month" or "equal to the current hour".

It can usefully be combined with offsetting so e.g. if the match required is "after the 15th of this month" we could do
as follows.

{% codetabs %}

{% codetab Java %}
```java
stubFor(post("/dates")
  .withRequestBody(matchingJsonPath(
      "$.completedDate",
      after("now +15 days").truncateExpected(FIRST_DAY_OF_MONTH))
  )
  .willReturn(ok()));
```
{% endcodetab %}

{% codetab JSON %}
```json
{
    "request": {
        "url": "/dates",
        "method": "POST",
        "bodyPatterns": [
            {
                "matchesJsonPath": {
                    "expression": "$.completedDate",
                    "after": "now +15 days",
                    "truncateExpected": "first day of month"
                }
            }
        ]
    }
}
```
{% endcodetab %}

{% endcodetabs %}

Truncating the actual value can be useful when checking for equality with literal date/times e.g. to say "is in March 2020":

{% codetabs %}

{% codetab Java %}
```java
stubFor(post("/dates")
  .withRequestBody(matchingJsonPath(
    "$.completedDate",
    equalToDateTime("2020-03-01T00:00:00Z").truncateActual(FIRST_DAY_OF_MONTH))
  )
  .willReturn(ok()));
```
{% endcodetab %}

{% codetab JSON %}
```json
{
    "request": {
        "url": "/dates",
        "method": "POST",
        "bodyPatterns": [
            {
                "matchesJsonPath": {
                    "expression": "$.completedDate",
                    "equalToDateTime": "2020-03-01T00:00:00Z",
                    "truncateActual": "first day of month"
                }
            }
        ]
    }
}
```
{% endcodetab %}

{% endcodetabs %}

<div id="all-truncations"></div>
The full list of available truncations is:

- `first minute of hour`
- `first hour of day`
- `first day of month`
- `first day of next month`
- `last day of month`
- `first day of year`
- `first day of next year`
- `last day of year`

### Order of applying offset and truncation

By default, the date/time truncation is applied first and the offset is applied afterwards. There are scenarios, though, where the order needs to be reversed. For instance, if we want to match with the last day of the next month then the truncation should be applied last. In this case the boolean property `applyTruncationLast` should be set to true:

{% codetabs %}

{% codetab Java %}
```java
stubFor(get(urlPathEqualTo("/resource"))
  .withQueryParam("date", equalToDateTime("now +1 months").truncateExpected(LAST_DAY_OF_MONTH).applyTruncationLast(true))
  .willReturn(ok()));
```
{% endcodetab %}

{% codetab JSON %}
```json
{
    "request": {
        "urlPath": "/resource",
        "method": "GET",
        "queryParameters": {
            "date": {
                "equalToDateTime": "now +1 months",
                "truncateExpected": "last day of month",
                "applyTruncationLast": true
            }
        }
    }
}
```
{% endcodetab %}

{% endcodetabs %}

In the example above setting the `applyTruncationLast` property to true means that the expected date/time value will first be offset by one month and only afterwards truncated to the last day of that month. Which in turn means that if the current date is September 1st then the expected date will first be offset to October 1st and only then truncated to October 31st. Had the `applyTruncationLast` property been false (the default value) then the resulting expected date would be October 30th, one day off the date we were aiming for. 

## Logical AND and OR

You can combine two or more matchers in an AND expression.

{% codetabs %}

{% codetab Java %}
```java
// Both statements are equivalent

stubFor(get(urlPathEqualTo("/and"))
    .withHeader("X-Some-Value", and(
        matching("[a-z]+"),
        containing("magicvalue"))
    )
    .willReturn(ok()));

stubFor(get(urlPathEqualTo("/and"))
    .withHeader("X-Some-Value", matching("[a-z]+").and(containing("magicvalue")))
    .willReturn(ok()));
```
{% endcodetab %}

{% codetab JSON %}
```json
{
    "request": {
        "urlPath": "/and",
        "method": "GET",
        "headers": {
            "X-Some-Value": {
                "and": [
                    {
                        "matches": "[a-z]+"
                    },
                    {
                        "contains": "magicvalue"
                    }
                ]
            }
        }
    }
}
```
{% endcodetab %}

{% endcodetabs %}

Similarly you can also construct an OR expression.

{% codetabs %}

{% codetab Java %}
```java
// Both statements are equivalent

stubFor(get(urlPathEqualTo("/or"))
  .withQueryParam("search", or(
        matching("[a-z]+"),
        absent())
  )
  .willReturn(ok()));

stubFor(get(urlPathEqualTo("/or"))
    .withQueryParam("search", matching("[a-z]+").or(absent()))
    .willReturn(ok()));
```
{% endcodetab %}

{% codetab JSON %}
```json
{
    "request": {
        "urlPath": "/or",
        "method": "GET",
        "queryParameters": {
            "search": {
                "or": [
                    {
                        "matches": "[a-z]+"
                    },
                    {
                        "absent": true
                    }
                ]
            }
        }
    }
}
```
{% endcodetab %}

{% endcodetabs %}

### Combining date matchers as JSONPath/XPath sub-matchers

As an example of how various matchers can be combined, suppose we want to match if a field named `date` in a JSON request body
is a date/time between two points.

We can do this by extracting the field using `matchesJsonPath` then matching the result
of this against the `before` and `after` matchers AND'd together.

{% codetabs %}

{% codetab Java %}
```java
stubFor(post("/date-range")
    .withRequestBody(matchingJsonPath("$.date",
        before("2022-01-01T00:00:00").and(
        after("2020-01-01T00:00:00"))))
    .willReturn(ok()));
```
{% endcodetab %}

{% codetab JSON %}
```json
{
    "request": {
        "url": "/date-range",
        "method": "POST",
        "bodyPatterns": [
            {
                "matchesJsonPath": {
                    "expression": "$.date",
                    "and": [
                        {
                            "before": "2022-01-01T00:00:00"
                        },
                        {
                            "after": "2020-01-01T00:00:00"
                        }
                    ]
                }
            }
        ]
    }
}
```
{% endcodetab %}

{% endcodetabs %}

This would match the following JSON request body:

```json
{
    "date": "2021-01-01T00:00:00"
}
```

### Matching Header/Query parameter containing multiple values

You can match multiple values of a query parameter or header with below provided matchers.

Exactly matcher exactly matches multiple values or patterns and make sure that it does not contain any other value.

There must be 3 values of id exactly whose values are 1, 2, and 3:

{% codetabs %}

{% codetab Java %}
```java
stubFor(get(urlPathEqualTo("/things"))
    .withQueryParam("id", havingExactly("1", "2", "3"))
    .willReturn(ok()));
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "mapping": {
    "request" : {
      "urlPath" : "/things",
      "method" : "GET",
      "queryParameters" : {
        "id" : {
          "hasExactly" : [
            {
              "equalTo": "1"
            },
            {
              "equalTo": "2"
            },
            {
              "equalTo": "3"
            }
          ]
        }
      }
    },
    "response" : {
      "status" : 200
    }
  }
}
```
{% endcodetab %}

{% endcodetabs %}

There must be 3 values of id exactly whose values conform to the match expressions

{% codetabs %}

{% codetab Java %}
```java
stubFor(get(urlPathEqualTo("/things"))
    .withQueryParam("id", havingExactly(
        equalTo("1"),
        containing("2"),
        notContaining("3")
    )).willReturn(ok()));
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "mapping": {
    "request" : {
      "urlPath" : "/things",
      "method" : "GET",
      "queryParameters" : {
        "id" : {
          "hasExactly" : [
            {
              "equalTo": "1"
            },
            {
              "contains": "2"
            },
            {
              "doesNotContain": "3"
            }
          ]
        }
      }
    },
    "response" : {
      "status" : 200
    }
  }
}
```
{% endcodetab %}

{% endcodetabs %}

Includes matcher matches multiple values or patterns specified and may contain other values as well.

The values of id must include 1, 2, and 3:

{% codetabs %}

{% codetab Java %}
```java
stubFor(get(urlPathEqualTo("/things"))
      .withQueryParam("id", including("1", "2", "3")) 
      .willReturn(ok()));
```

{% endcodetab %}

{% codetab JSON %}
```json
{
  "mapping": {
    "request" : {
      "urlPath" : "/things",
      "method" : "GET",
      "queryParameters" : {
        "id" : {
          "includes" : [
            {
              "equalTo": "1"
            },
            {
              "equalTo": "2"
            },
            {
              "equalTo": "3"
            }
          ]
        }
      }
    },
    "response" : {
      "status" : 200
    }
  }
}
```
{% endcodetab %}

{% endcodetabs %}

Values of id must conform to the match expressions:

{% codetabs %}

{% codetab Java %}
```java
stubFor(get(urlPathEqualTo("/things"))
    .withQueryParam("id", including(
        equalTo("1"),
        containing("2"),
        notContaining("3")
    )).willReturn(ok()));
```
{% endcodetab %}

{% codetab JSON %}
```json
{
  "mapping": {
    "request" : {
      "urlPath" : "/things",
      "method" : "GET",
      "queryParameters" : {
        "id" : {
          "includes" : [
            {
              "equalTo": "1"
            },
            {
              "contains": "2"
            },
            {
              "doesNotContain": "3"
            }
          ]
        }
      }
    },
    "response" : {
      "status" : 200
    }
  }
}
```
{% endcodetab %}

{% endcodetabs %}

## Logical NOT - negating matchers
You can negate any matcher using the logical NOT matcher.

{% codetabs %}

{% codetab Java %}
```java
stubFor(
    get(urlPathEqualTo("/not"))
      .withHeader("X-Some-Value", not(matching("[a-z]+")))
      .willReturn(ok()));
```
{% endcodetab %}

{% codetab JSON %}
```json
{
    "request": {
        "urlPath": "/and",
        "method": "GET",
        "headers": {
            "X-Some-Value": {
                "not": {
                  "matches": "[a-z]+"
                }
            }
        }
    }
}
```
{% endcodetab %}

{% endcodetabs %}