---
layout: docs
title: Response Templating - Working with XML
description: Working with XML
---

This article describes MockLab's helpers for processing and manipulating XML.

## XPath

The `xPath` helper can be used to extract values or sub documents via an XPath 1.0 expression from an XML string.
Most commonly this is used to extract values from the request body.

For example, given a request body of:

```xml
<outer>
    <inner>Stuff</inner>
</outer>
```

The following will render "Stuff" into the output:

{% raw %}
```handlebars
{{{xPath request.body '/outer/inner/text()'}}}
```
{% endraw %}

And given the same XML the following will render `<inner>Stuff</inner>`:

{% raw %}
```handlebars
{{{xPath request.body '/outer/inner'}}}
```
{% endraw %}


### Extracting attributes

XPath also permits extraction of attributes e.g. for a request body of:

```xml
<outer>
    <inner id="123"/>
</outer>
```

The following will render "123" into the output:

{% raw %}
```handlebars
{{{xPath request.body '/outer/inner/@id'}}}
```
{% endraw %}


## SOAP XPath

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
{{{soapXPath request.body '/a/test/text()'}}}
```
{% endraw %}


## Iterating over XML elements

The `xPath` helper returns "one or many" collections results, which can either
be printed directly, or passed to further helpers such as [`each`](/docs/response-templating/conditional-logic-and-iteration/#iteration) or [`join`](/docs/response-templating/string-helpers/#join).

For instance, given a request body of the form:

```xml
<?xml version="1.0"?>
<stuff>
    <thing>One</thing>
    <thing>Two</thing>
    <thing>Three</thing>
</stuff>
```

and the following template:

{% raw %}
```handlebars
{{#each (xPath request.body '/stuff/thing') as |element|}}{{{element.text}}} {{/each}}
```
{% endraw %}

the resulting output will be:

```
One Two Three
```

### XML element attributes

Elements in the collection returned by `xPath` have the following properties:

`text`: The text content of the element.

`name`: The element's name.

`attributes`: A map of attribute names and values e.g. given an XML element has
been selected:

```xml
<thing id="123" position="top"/>
```

Its attributes can be referenced:

{% raw %}
```handlebars
      ID: {{{element.attributes.id}}}
Position: {{{element.attributes.position}}}
```
{% endraw %}
