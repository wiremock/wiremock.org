---
layout: docs
title: Response Templating - Basics
redirect_from:
  - /docs/response-templating/
description: Returning dynamic responses using Handlebars templates
---

Some elements of MockLab stub responses can be configured generated dynamically, via the use of [Handlebars templates](https://github.com/jknack/handlebars.java){:target="{{site.data.misc.blank}}"}.

Most commonly this is used in the response body but response header values can also
be templated. For proxy responses, the target URL can be a template.

## Enabling templating

Enable templating for a stub by ticking the "Enable templating" box in the Response section:

<img src="/images/screenshots/enable-response-templating-screenshot.png" title="Enable templating" style="height: 70px"/>

Ticking this box means that header values can be templated e.g.

<img src="/images/screenshots/header-template-screenshot.png" title="Header template" style="height: 70px"/>

And also the response body e.g.

<img src="/images/screenshots/body-template-screenshot.png" title="Body template" style="height: 130px"/>

## Handlebars overview

A complete description of the Handlebars syntax and core helpers can be found on the [Handlebars JS](https://handlebarsjs.com/guide/){:target="{{site.data.misc.blank}}"}, but we'll cover the essentials here.

Handlebars works like many other template languages - a template is provided a data model
and uses a special tag syntax to denote dynamic elements, referred to as a "helper" in this case.

Helpers are always delimited by double or triple curly braces (`{` and `}`). In the simplest case a helper can
simply output the value of a variable in the model:

{% raw %}
```handlebars
{{myVariable}}        // Top-level model variable
{{outerVar.innerVar}} // Nested model variable
```
{% endraw %}

### Helper parameters

Helpers can take both positional and named parameters. In both cases they are delimited by spaces.

The following helper takes three positional parameters -
the string in which the replacement should take place, the substring to find and the
replacement value:

{% raw %}
```handlebars
{{replace myString 'foo' 'bar'}}
```
{% endraw %}


Named values are of the form `name=value`. The following helper has a single
positional parameter followed by a parameter named `format`:

{% raw %}
```handlebars
{{dateFormat myDate format='yyyy-MM-dd'}}
```
{% endraw %}


### Nesting helpers

Sometimes it's necessary to apply a helper to the result of another one. This can
be achieved by nesting helpers using bracket syntax. For example, this template
will truncate the input string, then capitalise the first letter:

{% raw %}
```handlebars
{{capitalize (substring myString 0 4)}}
```
{% endraw %}

### Blocks

Blocks can be used to apply processing to an inner piece of content.

{% raw %}
```handlebars
{{#if productExists}}
  // do something with the product
{{else}}
  // product not found
{{/if}}
```
{% endraw %}

Blocks form the foundation of logical and looping structures in Handlebars and are [described here in more detail](/docs/response-templating/conditional-logic-and-iteration/).

### HTML escaping

We mentioned earlier that double or triple curly braces are used to delimit helpers.
The difference between these two forms is that with double braces, Handlebars will
automatically HTML escape the output of the helper, whereas with triple braces no escaping will be
applied.

For instance, suppose we have a data model where the variable `tag` has the value `<html>`.

The template

{% raw %}
```handlebars
{{tag}}
```
{% endraw %}

will output

```
&lt;html&gt;
```

whereas the template

{% raw %}
```handlebars
{{{tag}}}
```
{% endraw %}

will output

```
<html>
```

## The data model
Currently the data model supplied to response templates contains a single top-level object
which represents the incoming HTTP request.

The following request attributes are available on the request object:

`request.url` - URL path and query

`request.path` - URL path

`request.pathSegments.[<n>]`- URL path segment (zero indexed) e.g. `request.pathSegments.[2]`

`request.query.<key>`- First value of a query parameter e.g. `request.query.search`

`request.query.<key>.[<n>]`- nth value of a query parameter (zero indexed) e.g. `request.query.search.[5]`

`request.method`- request method e.g. `POST`

`request.host`- hostname part of the URL e.g. `my.example.com`

`request.port`- port number e.g. `8080`

`request.scheme`- protocol part of the URL e.g. `https`

`request.baseUrl`- URL up to the start of the path e.g. `https://my.example.com:8080`

`request.headers.<key>`- First value of a request header e.g. `request.headers.X-Request-Id`

`request.headers.[<key>]`- Header with awkward characters e.g. `request.headers.[$?blah]`

`request.headers.<key>.[<n>]`- nth value of a header (zero indexed) e.g. `request.headers.ManyThings.[1]`

`request.cookies.<key>` - First value of a request cookie e.g. `request.cookies.JSESSIONID`

`request.cookies.<key>.[<n>]` - nth value of a request cookie e.g. `request.cookies.JSESSIONID.[2]`

`request.body` - Request body text (avoid for non-text bodies)


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


## Handlebars helpers

MockLab provides a set of Handlebars helpers that perform a variety of logical functions and transformations inside templates. These include all of the standard helpers from the [Java Handlebars implementation by jknack](https://github.com/jknack/handlebars.java){:target="{{site.data.misc.blank}}"}.

All of the available helpers are described in detail in these articles:

[Conditional Logic and Iteration](/docs/response-templating/conditional-logic-and-iteration/)

[Strings](/docs/response-templating/string-helpers/)

[String Encodings](/docs/response-templating/string-encodings/)

[Dates & Times](/docs/response-templating/dates-and-times/)

[Random Values](/docs/response-templating/random-values/)

[XML](/docs/response-templating/xml/)

[JSON](/docs/response-templating/json/)

[JSON Web Tokens](/docs/response-templating/jwt/)

[Miscellaneous Helpers](/docs/response-templating/misc-helpers/)
