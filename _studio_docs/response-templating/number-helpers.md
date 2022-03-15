---
layout: docs
title: Response Templating - Number Helpers
description: Working with numbers
---

## Math helper
The `math` helper performs common arithmetic operations. It can accept integers, decimals
or strings as its operands and will always yield a number as its output rather than a string.

Addition, subtraction, multiplication, division and remainder (mod) are supported.

{% raw %}
```handlebars
{{math 1 '+' 2}}
{{math 4 '-' 2}}
{{math 2 '*' 3}}
{{math 8 '/' 2}}
{{math 10 '%' 3}}
```
{% endraw %}


## Formatting numbers
The `numberFormat` helper allows you to specify how numbers are printed. It supports
a number of predefined formats, custom format strings and various other options
including rounding mode, decimal places and locale.

### Predefined formats
`numberFormat` supports the following predefined formats:

* `integer`
* `currency`
* `percent`

Predefined formats can be affected by locale, so it's usually a good idea to explicitly
specify this.

For example, to format a decimal number as currency, specifically British pounds:

{% raw %}
```handlebars
{{{numberFormat 123.4567 'currency' 'en_GB'}}}
```
{% endraw %}

Output: `£123.46`.

Alternatively, if we wanted to output the number as a percentage:

{% raw %}
```handlebars
{{{numberFormat 123.4567 'percent' 'en_GB'}}}
```
{% endraw %}

Output: `12,346%`.


### Custom format string
For maximum control over the number format you can specify a format string:

{% raw %}
```handlebars
{{{numberFormat 123.4567 '###.000000' 'en_GB'}}}
```
{% endraw %}

Output: `123.456700`.

See the [Java DecimalFormat documentation](https://docs.oracle.com/javase/8/docs/api/java/text/DecimalFormat.html){:target="{{site.data.misc.blank}}"}
for details on how to use format strings.


### Configuring number of digits
Separate from the format parameter, the number of digits before and after the
decimal place can be bounded using one or more of four parameters:
`maximumFractionDigits`, `minimumFractionDigits`, `maximumIntegerDigits`, `minimumIntegerDigits`.

{% raw %}
```handlebars
{{{numberFormat 1234.567 maximumIntegerDigits=3 minimumFractionDigits=6}}}
```
{% endraw %}

Output: `234.567000`.


### Disabling grouping
By default `numberFormat` will insert commas, periods etc. per the locale between
groups of digits e.g. `1,234.5`.

This behaviour can be disabled with `groupingUsed`.

{% raw %}
```handlebars
{{{numberFormat 12345.678 groupingUsed=false}}}
```
{% endraw %}

Output: `12345.678`.


### Rounding mode
The `roundingMode` parameter affects how numbers will be rounded up or down when
it's necessary to do so.

For instance, to always round down:

{% raw %}
```handlebars
{{{numberFormat 1.239 roundingMode='down' maximumFractionDigits=2}}}
```
{% endraw %}

Output: `1.23`.

Available rounding modes are:

* `up`
* `down`
* `half_up`
* `half_down`
* `half_even`
* `ceiling`
* `floor`.

See the [Java RoundingMode documentation](https://docs.oracle.com/javase/8/docs/api/java/math/RoundingMode.html){:target="{{site.data.misc.blank}}"}
for the exact meaning of each of these.
