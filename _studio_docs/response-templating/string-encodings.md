---
layout: docs
title: Response Templating - String Encodings
description: Working with base64, URL and form encodings.
---

MockLab provides several helpers for encoding and decoding values to/from various
formats.

## Base64
The `base64` helper encodes and decodes Base64:

{% raw %}
```handlebars
{{{base64 request.headers.X-Plain-Header}}}
{{{base64 request.headers.X-Plain-Header padding=false}}}
{{{base64 request.headers.X-Encoded-Header decode=true}}}

{{{#base64}}}
Content to encode     
{{{/base64}}}

{{{#base64 decode=true}}}
Q29udGVudCB0byBkZWNvZGUK     
{{{/base64}}}
```
{% endraw %}


## URLs
The `urlEncode` helper encode and decode values according to the [HTTP URL encoding standard](https://en.wikipedia.org/wiki/Percent-encoding){:target="{{site.data.misc.blank}}"}:

{% raw %}
```handlebars
{{{urlEncode request.headers.X-Plain-Header}}}
{{{urlEncode request.headers.X-Encoded-Header decode=true}}}

{{{#urlEncode}}}
Content to encode     
{{{/urlEncode}}}

{{{#urlEncode decode=true}}}
Content%20to%20decode     
{{{/urlEncode}}}
```
{% endraw %}


## Forms
The `formData` helper parses its input as an HTTP form, returning an object containing the individual fields as attributes.
The helper takes the input string and variable name as its required parameters, with an optional `urlDecode` parameter
indicating that values should be URL decoded.

The folowing example will parse the request body as a form, then output a single field `formField3`:

{% raw %}
```handlebars
{{formData request.body 'form' urlDecode=true}}{{{form.formField3}}
```
{% endraw %}

If the form submitted has multiple values for a given field, these can be accessed by index:

{% raw %}
```handlebars
{{formData request.body 'form' urlDecode=true}}}{{{form.multiValueField.1}}, {{{form.multiValueField.2}}
{{formData request.body 'form' urlDecode=true}}}{{{form.multiValueField.first}}, {{{form.multiValueField.last}}
```
{% endraw %}
