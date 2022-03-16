---
layout: docs
title: Response Templating - Conditional Logic and Iteration
description: Working with if statements, loops and collections.
---

Taking actions conditionally and looping over collections of data are very common
requirements from a templating system. This article explains how these are achieved
in MockLab.

## Conditional logic with if / else and unless

Handlebars provides a set of core helpers that implement if / else if / else logic
of the kind found in many programming languages.

As with most implementations of if, the simples form is to take an action only if
the condition is true:

{% raw %}
```handlebars
{{#if showDetails}}
  <div id="details">...</div>
{{/if}}
```
{% endraw %}

An else clause can be used:

{% raw %}
```handlebars
{{#if showDetails}}
  <div id="details">...</div>
{{else}}
  <div id="details" class="hidden">...</div>
{{/if}}
```
{% endraw %}


And any number of else if clauses can also be added:

{% raw %}
```handlebars
{{#if showVariantA}}
  <div id="var-a">...</div>
{{else if showVariantB}}
  <div id="var-b">...</div>
{{else if showVariantC}}
  <div id="var-c">...</div>
{{else}}
  <div id="default-var">...</div>
{{/if}}
```
{% endraw %}


Finally, you can take an action if a condition is false using `unless`:

{% raw %}
```handlebars
{{#unless hideDetails}}
  <div id="details">...</div>
{{/unless}}
```
{% endraw %}


## Comparison helpers

The `if`, `else if` and `unless` helpers all take a single boolean value
as their parameter. In practice you often need to derive that value by comparing
other values, and for this we have a set of helpers implementing common comparison operations.

For instance if you needed to check that a variable equalled a particular string
you would use the `eq` helper:

{% raw %}
```handlebars
{{#eq name 'Dan'}}
  <div id="dan">...</div>
{{/eq}}
```
{% endraw %}


You can nest comparison helpers inside the `if` helper:

{% raw %}
```handlebars
{{#if (eq name 'Dan')}}
  <div id="dan">...</div>
{{/if}}
```
{% endraw %}


You can also use comparison helpers with `else`:

{% raw %}
```handlebars
{{#eq name 'Dan'}}
  <div id="dan">...</div>
{{else eq name 'Mark'}}
  <div id="mark">...</div>
{{else}}
  <div id="anon">...</div>
{{/eq}}
```
{% endraw %}


The following comparison helpers are available:

`eq` - equal

{% raw %}
```handlebars
{{#eq name 'Jeff'}}...{{/eq}}
```
{% endraw %}

`neq` - not equal

{% raw %}
```handlebars
{{#neq name 'Jeff'}}...{{/neq}}
```
{% endraw %}


`gt` - greater than

{% raw %}
```handlebars
{{#gt itemCount 3}}...{{/gt}}
```
{% endraw %}

`gte` - greater than or equal to

{% raw %}
```handlebars
{{#gte itemCount 3}}...{{/gte}}
```
{% endraw %}


`lt` - less than

{% raw %}
```handlebars
{{#lt itemCount 3}}...{{/lt}}
```
{% endraw %}

`lte` - less than or equal

{% raw %}
```handlebars
{{#lte itemCount 3}}...{{/lte}}
```
{% endraw %}


`and` - logical AND

{% raw %}
```handlebars
{{#and (lt itemCount 10) (gt itemCount 5)}}...{{/and}}
```
{% endraw %}

`or` - logical OR

{% raw %}
```handlebars
{{#or (eq itemCount 1) (eq itemCount 2)}}...{{/or}}
```
{% endraw %}

`not` - logical NOT

{% raw %}
```handlebars
{{#not (eq itemCount 1)}}...{{/not}}
```
{% endraw %}


## Iteration

You can loop over collections of data using the `each` helper.

{% raw %}
```handlebars
{{#each request.query.things as |thing|}}
  thing: {{{thing}}}
{{/each}}
```
{% endraw %}


### Iterating over JSON and XML elements

The `jsonPath` and `xPath` helpers both output collections so these can be used
in an `each` loop. See [Working with JSON](/docs/response-templating/json/#iterating-over-json-elements) and
[Working with XML](/docs/response-templating/xml/#iterating-over-xml-elements) for details.


### Detecting the first and last element while looping

Often it can be useful to know when you're processing the first or last element
in a collection e.g. so that you can decide whether to output a separate character.

You can do this using the `@first` and `@last` variables that are automatically
provided to the scope inside the `each` block.

For instance, if you wanted to output a list of JSON objects, separated with
commas and avoiding an extraneous comma at the end:

{% raw %}
```handlebars
{{#each (jsonPath request.body '$.things') as |thing|}}
  {{#if @last}}
    { "thing": {{{thing}}} }
  {{else}}
    { "thing": {{{thing}}} },
  {{/if}}
{{/each}}
```
{% endraw %}


### Getting the loop index

The `each` helper also creates an `@index` variable in its scope which you can use
to get at the (zero-indexed) element counter:

{% raw %}
```handlebars
{{#each (jsonPath request.body '$.things') as |thing|}}
  {{@index}}: {{thing}}
{{/each}}
```
{% endraw %}


## String and collection conditionals

### Contains helper
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

### Matches helper
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
