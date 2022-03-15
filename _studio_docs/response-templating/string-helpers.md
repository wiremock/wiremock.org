---
layout: docs
title: Response Templating - String Helpers
description: Working with strings
---

MockLab provides a set of string manipulation helpers.

## Regular expression extract

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


## String transformation helpers

### Trim
Use the `trim` helper to remove whitespace from the start and end of the input:

{% raw %}
```handlebars
{{trim request.headers.X-Padded-Header}} // Inline

{{#trim}}                                // Block

    Some stuff with whitespace

{{/trim}}
```
{% endraw %}


### Abbreviate
`abbreviate` truncates a string if it is longer than the specified number of characters.
Truncated strings will end with a translatable ellipsis sequence ("...").

For instance the following template:

{% raw %}
```handlebars
{{abbreviate 'Mocking APIs helps you develop faster' 21 }} // Mocking APIs helps...
```
{% endraw %}

### Capitalisation
`capitalize` will make the first letter of each word in the passed string a capital e.g.

{% raw %}
```handlebars
{{capitalize 'mock my stuff'}} // Mock My Stuff
```
{% endraw %}

`capitalizeFirst` will capitalise the first character of the value passed e.g.

{% raw %}
```handlebars
{{capitalizeFirst 'mock my stuff'}} // Mock my stuff
```
{% endraw %}


### Center
`center` centers the value in a field of a given width e.g.

{% raw %}
```handlebars
{{center 'hello' size=21}}
```
{% endraw %}

will output:

```
        hello        
```

You can also specify the padding character e.g.

{% raw %}
```handlebars
{{center 'hello' size=21 pad='#'}}
```
{% endraw %}

will output:

```
########hello########
```

### Cut

`cut` removes all instances of the parameter from the given string.

{% raw %}
```handlebars
{{cut 'mocking, stubbing, faults' ','}} // mocking stubbing faults
```
{% endraw %}


### Default if empty

`defaultIfEmpty` outputs the passed value if it is not empty, or the default otherwise e.g.

{% raw %}
```handlebars
{{defaultIfEmpty 'my value' 'default'}} // my value

{{defaultIfEmpty '' 'default'}}         // default
```
{% endraw %}


### Join
`join` takes a set of parameters or a collection and builds a single string, with
each item separated by the specified parameter.

{% raw %}
```handlebars
{{join 'Mark' 'Rob' 'Dan' ', '}} // Mark, Rob, Dan
```
{% endraw %}


You can optionally specify a prefix and suffix:

{% raw %}
```handlebars
{{join 'Mark' 'Rob' 'Dan' ', ' prefix='[' suffix=']'}} // [Mark, Rob, Dan]
```
{% endraw %}


### Justify left and right

`ljust` left-aligns the value in a field of a given width, optionally taking a padding character.

{% raw %}
```handlebars
{{ljust 'things' size=20}}         // 'things              '
{{ljust 'things' size=20 pad='#'}} // 'things##############'
```
{% endraw %}


`rjust` right-aligns the value in the same manner

{% raw %}
```handlebars
{{rjust 'things' size=20}}         // '              things'
{{rjust 'things' size=20 pad='#'}} // '##############things'
```
{% endraw %}


### Lower and upper case

`lower` and `upper` convert the value to all lowercase and all uppercase:

{% raw %}
```handlebars
{{lower 'MockLab'}} // mocklab
{{upper 'MockLab'}} // MOCKLAB
```
{% endraw %}


### Replace

`replace` replaces all occurrences of the specified substring with the replacement value.

{% raw %}
```handlebars
{{replace 'the wrong way' 'wrong' 'right' }} // the right way
```
{% endraw %}

### Slugify

`slugify` converts to lowercase, removes non-word characters (alphanumerics and
underscores) and converts spaces to hyphens. Also strips leading and trailing whitespace.

{% raw %}
```handlebars
{{slugify 'Mock my APIs'}} // mock-my-apis
```
{% endraw %}


### Strip tags

`stripTags` strips all [X]HTML tags.

{% raw %}
```handlebars
{{stripTags '<greeting>hi</greeting>'}} // hi
```
{% endraw %}

### Substring

`substring` outputs the portion of a string value between two indices. If only
one index is specified the substring between this point and the end will be returned.

{% raw %}
```handlebars
{{substring 'one two' 4}}   // two
{{substring 'one two' 0 3}} // one
```
{% endraw %}

### Word wrap

`wordWrap` wraps words at specified line length.

{% raw %}
```handlebars
{{wordWrap 'one two three' 4}}
```
{% endraw %}

will output:

```
one
two
three
```

### Yes/no

`yesno` maps values for true, false and optionally null, to the strings "yes",
"no", "maybe".

{% raw %}
```handlebars
{{yesno true}}   // yes
{{yesno false}}  // no
{{yesno null}}   // maybe
```
{% endraw %}

You can also specify different strings to represent each state:


{% raw %}
```handlebars
{{yesno true yes='aye'}}    // aye
{{yesno false no='nay'}}    // nay
{{yesno null maybe='meh'}}  // meh
```
{% endraw %}
