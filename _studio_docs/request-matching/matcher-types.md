---
layout: docs
title: Request Matching - Overview of Matcher Types
description: Overview of the match operations supported by MockLab
---

MockLab (via WireMock) supports a set of match operations that can be used against
the request's query, headers, cookies and body.

This article provides an overview of these matchers. The names shown are the exact
keys used in the WireMock/MockLab JSON API.

## `equalTo`

Only matches if the input string is exactly equal to the expected value.

## `binaryEqualTo`

Like `equalTo` but compares bytes rather than strings. Useful when you need to match
e.g. an uploaded image.

## `matches`

Matches the input string against a [Java style regular expression](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html){:target="{{site.data.misc.blank}}"}.

## `doesNotMatch`

The negative of `matches`. Will match if the incoming value does **not** match the regular expression.

## `contains`

Matches if the input string contains the expected value.

## `equalToJson`

Matches if the input string is valid JSON and is semantically equal to the expected value.
This is often a better choice than `equalTo` when dealing with JSON as it will ignore
differences in whitespace, and it is optionally possible to ignore array orderings
and extra object attributes. It also provides the concept of placeholders, allowing
you to selectively ignore or merely constrain specific JSON elements.

The underlying implementation for `equalToJson` is supplied by
[JSONUnit](https://github.com/lukas-krecan/JsonUnit){:target="{{site.data.misc.blank}}"}.

You can learn more about working with JSON in the [Matching JSON](/docs/request-matching/json/) article.

## `matchesJsonPath`

Tests the input JSON string against a JSONPath expression, and returns a match if
one or more elements are returned. No match will be returned if the input is not valid
JSON.

The actual JSONPath evaluation is performed by the [Java JSONPath implmementation]([JSONPath](https://github.com/json-path/JsonPath)){:target="{{site.data.misc.blank}}"}.

## `equalToXml`

Matches if the input string is valid XML and is semantically equal to the expected value.
Like with `matchesJsonPath` this ignores differences in whitespace and supports placeholders
so that specific element values can be ignored.

The underlying implementation for `equalToXml` is supplied by
[XMLUnit](https://www.xmlunit.org/){:target="{{site.data.misc.blank}}"}.

You can learn more about working with XML in the [Matching XML](/docs/request-matching/xml/) article.

## `matchesXPath`

Tests the input XML string against an XPath 1.0 expression, and returns a match if
one or more elements are returned. No match will be returned if the input is not valid
XML.
