---
layout: docs
title: Response Templating - Miscellaneous Helpers
description: Other assorted useful helpers
---

This article describes some useful helpers that don't neatly fit into any of the other categories.

## Assignment

You can create a string variable of own using the `assign` helper, then use it
later in your template e.g.:

{% raw %}
```handlebars
{{#assign 'myCapitalisedQuery'}}{{capitalize request.query.search}}{{/assign}}

Capitalised query: {{myCapitalisedQuery}}
```
{% endraw %}

## Size

The `size` helper returns the size of a string, list or map:

{% raw %}
```handlebars
{{size 'abcde'}}               // Returns 5
{{size request.query.things}}  // Returns number of values in query param 'things'
```
{% endraw %}

## With

The `with` helper creates a nested scope, allowing you to reference attributes on
an object without fully qualifying it each time.

For instance, given a variable whose value is an object with the properties `id` and `position`,
`with` allows these to be accessed without qualifying each time:

{% raw %}
```handlebars
{{#with myObject}}
  ID: {{{id}}}
  Position: {{{position}}}
{{/with}}
```
{% endraw %}

## Range

The `range` helper emits an array of integers between the bounds specified in the
first and second parameters (both of which are mandatory).

{% raw %}
```handlebars
{{range 3 8}}
{{range -2 2}}
```
{% endraw %}

As mentioned above, you can use this with `randomInt` and `each` to output random length, repeating pieces of content e.g.

{% raw %}
```handlebars
{{#each (range 0 (randomInt lower=1 upper=10)) as |index|}}
id: {{index}}
{{/each}}
```
{% endraw %}

## Array

The `array` helper emits an array containing exactly the values specified as parameters.

{% raw %}
```handlebars
{{array 1 'two' true}}
```
{% endraw %}

Passing no parameters will result in an empty array being returned.

{% raw %}
```handlebars
{{array}}
```
{% endraw %}
