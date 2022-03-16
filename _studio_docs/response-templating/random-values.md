---
layout: docs
title: Response Templating - Random Values
description: Generating random values
---

MockLab provides two random value helpers - `randomValue` and `pickRandom`.

## Random strings

The `randomValue` helper generates random strings of a specific type and length.
Optionally, values containing alphabetic characters can be made upper case via the `uppercase` parameter.

{% raw %}
```handlebars
{{randomValue length=33 type='ALPHANUMERIC'}}

{{randomValue length=12 type='ALPHANUMERIC' uppercase=true}}

{{randomValue length=55 type='ALPHABETIC'}}

{{randomValue length=27 type='ALPHABETIC' uppercase=true}}

{{randomValue length=10 type='NUMERIC'}}

{{randomValue length=5 type='ALPHANUMERIC_AND_SYMBOLS'}}

{{randomValue length=5 type='HEXADECIMAL' uppercase=true}}

{{randomValue type='UUID'}}
```
{% endraw %}


## Random numbers

While the `randomValue` helper can generate a number as a string when type `NUMERIC` is requested,
sometimes it can be useful to emit an actual typed number with the ability to control
lower and upper bounds. Working with numbers this way supports further processing
with the `math` helper or can serve as input to the `range` helper, among other uses.

The `randomInt` helper emits random integers with one, both or neither bound specified.

{% raw %}
```handlebars
{{randomInt}}
{{randomInt lower=5 upper=9}}
{{randomInt upper=54323}}
{{randomInt lower=-24}}
```
{% endraw %}

Likewise `randomDecimal` will emit random decimals:

{% raw %}
```handlebars
{{randomDecimal}}
{{randomDecimal lower=-10.1 upper=-0.9}}
{{randomDecimal upper=12.5}}
{{randomDecimal lower=-24.01}}
```
{% endraw %}



## Pick random

The `pickRandom` helper randomly selects a value from its parameters.

If the first parameter is a collection then the value will be randomly selected
from within this:

{% raw %}
```handlebars
// Assume that numberList = [1, 2, 3]

{{pickRandom numberList}} // One of 1, 2 or 3
```
{% endraw %}


Otherwise a value will be picked from the list of parameters provided:

{% raw %}
```handlebars
{{pickRandom '1' '2' '3'}} // One of 1, 2 or 3
```
{% endraw %}
