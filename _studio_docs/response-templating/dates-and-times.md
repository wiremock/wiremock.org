---
layout: docs
title: Response Templating - Dates and Times
description: Working with dates and times
---

MockLab has two helpers for manipulating dates - `now` and `date`.

## Current date/time

The `now` helper renders the current date/time, with the ability to specify the format (see [full reference](#format-string-reference)) and offset.

{% raw %}
```handlebars
{{now}}
{{now offset='3 days'}}
{{now offset='-24 seconds'}}
{{now offset='1 years'}}
{{now offset='10 years' format='yyyy-MM-dd'}}
```
{% endraw %}

Dates can be rendered in a specific timezone (the default is UTC):

{% raw %}
```handlebars
{{now timezone='Australia/Sydney' format='yyyy-MM-dd HH:mm:ssZ'}}
```
{% endraw %}

Pass `epoch` as the format to render the date as UNIX epoch time (in milliseconds), or `unix` as the format to render
the UNIX timestamp in seconds.

{% raw %}
```handlebars
{{now offset='2 years' format='epoch'}}
{{now offset='2 years' format='unix'}}
```
{% endraw %}

## Existing date values

The `date` helper can be used to manipulate existing date values, changing the
offset, timezone and print format in exactly the same manner as with the `now` helper.

{% raw %}
```handlebars
{{date myDate offset='-1 days' timezone='EST' format='yyyy-MM-dd'}}
```
{% endraw %}

## Parsing dates from strings

Dates can be parsed from other model elements. This is mostly useful when passed to
the `date` helper for further processing:

{% raw %}
```handlebars
{{date (parseDate request.headers.MyDate) offset='-1 days'}}
```
{% endraw %}


### Specifying parser format
You can specify the format to use when parsing a date via a [format string](#format-string-reference):

{% raw %}
```handlebars
{{parseDate '10/11/2021' format="dd/MM/yyyy"}}
```
{% endraw %}

Additionally you can specify `unix` or `epoch` as the format which will interpret
parse a large integer denoting (respectively) seconds or milliseconds since 1st of January 1970:

{% raw %}
```handlebars
{{parseDate '1577964091000' format="epoch"}}
```
{% endraw %}

Output: `Thu Jan 02 11:21:31 UTC 2020`.


## Formatting dates

Date values can be formatted to strings using the `dateFormat` helper. You can
either select a named format from the following:

* `full`: full date format. For example: Tuesday, June 19, 2012
* `long`: long date format. For example: June 19, 2012
* `medium`: medium date format. For example: Jun 19, 2012
* `short`: short date format. For example: 6/19/12

e.g.

{% raw %}
```handlebars
{{dateFormat (parseDate '2020-01-01T11:11:11Z') 'full'}} // Wednesday, January 1, 2020
```
{% endraw %}

Or you can specify your own format string ([full reference here](#format-string-reference)):

{% raw %}
```handlebars
{{dateFormat (parseDate '2020-01-01T11:11:11Z') format='yyyy-MM-dd'}} // 2020-01-01
```
{% endraw %}


## Format string reference

The following details all of the format string elements used when formatting and parsing dates and times:

<table border="0" cellspacing="3" cellpadding="0" summary="Chart shows pattern letters, date/time component, presentation, and examples.">
     <tbody><tr>
         <th align="left">Letter
         </th><th align="left">Date or Time Component
         </th><th align="left">Presentation
         </th><th align="left">Examples
     </th></tr><tr>
         <td><code>G</code>
         </td><td>Era designator
         </td><td>Text
         </td><td><code>AD</code>
     </td></tr><tr>
         <td><code>y</code>
         </td><td>Year
         </td><td>Year
         </td><td><code>1996</code>; <code>96</code>
     </td></tr><tr>
         <td><code>Y</code>
         </td><td>Week year
         </td><td>Year
         </td><td><code>2009</code>; <code>09</code>
     </td></tr><tr>
         <td><code>M</code>
         </td><td>Month in year
         </td><td>Month
         </td><td><code>July</code>; <code>Jul</code>; <code>07</code>
     </td></tr><tr>
         <td><code>w</code>
         </td><td>Week in year
         </td><td>Number
         </td><td><code>27</code>
     </td></tr><tr>
         <td><code>W</code>
         </td><td>Week in month
         </td><td>Number
         </td><td><code>2</code>
     </td></tr><tr>
         <td><code>D</code>
         </td><td>Day in year
         </td><td>Number
         </td><td><code>189</code>
     </td></tr><tr>
         <td><code>d</code>
         </td><td>Day in month
         </td><td>Number
         </td><td><code>10</code>
     </td></tr><tr>
         <td><code>F</code>
         </td><td>Day of week in month
         </td><td>Number
         </td><td><code>2</code>
     </td></tr><tr>
         <td><code>E</code>
         </td><td>Day name in week
         </td><td>Text
         </td><td><code>Tuesday</code>; <code>Tue</code>
     </td></tr><tr>
         <td><code>u</code>
         </td><td>Day number of week (1 = Monday, ..., 7 = Sunday)
         </td><td>Number
         </td><td><code>1</code>
     </td></tr><tr>
         <td><code>a</code>
         </td><td>Am/pm marker
         </td><td>Text
         </td><td><code>PM</code>
     </td></tr><tr>
         <td><code>H</code>
         </td><td>Hour in day (0-23)
         </td><td>Number
         </td><td><code>0</code>
     </td></tr><tr>
         <td><code>k</code>
         </td><td>Hour in day (1-24)
         </td><td>Number
         </td><td><code>24</code>
     </td></tr><tr>
         <td><code>K</code>
         </td><td>Hour in am/pm (0-11)
         </td><td>Number
         </td><td><code>0</code>
     </td></tr><tr>
         <td><code>h</code>
         </td><td>Hour in am/pm (1-12)
         </td><td>Number
         </td><td><code>12</code>
     </td></tr><tr>
         <td><code>m</code>
         </td><td>Minute in hour
         </td><td>Number
         </td><td><code>30</code>
     </td></tr><tr>
         <td><code>s</code>
         </td><td>Second in minute
         </td><td>Number
         </td><td><code>55</code>
     </td></tr><tr>
         <td><code>S</code>
         </td><td>Millisecond
         </td><td>Number
         </td><td><code>978</code>
     </td></tr><tr>
         <td><code>z</code>
         </td><td>Time zone
         </td><td>General time zone
         </td><td><code>Pacific Standard Time</code>; <code>PST</code>; <code>GMT-08:00</code>
     </td></tr><tr>
         <td><code>Z</code>
         </td><td>Time zone
         </td><td>RFC 822 time zone
         </td><td><code>-0800</code>
     </td></tr><tr>
         <td><code>X</code>
         </td><td>Time zone
         </td><td>ISO 8601 time zone
         </td><td><code>-08</code>; <code>-0800</code>;  <code>-08:00</code>
 </td></tr></tbody></table>


## Truncating dates
The `truncateDate` helper will truncate date/times to specific points e.g.

{% raw %}
```handlebars
{{truncateDate (parseDate '2021-06-14T00:00:00Z') 'last day of month'}}
```
{% endraw %}

Output: `Wed Jun 30 00:00:00 UTC 2021`.

The full list of available truncations is:

* `first minute of hour`
* `first hour of day`
* `first day of month`
* `first day of next month`
* `last day of month`
* `first day of year`
* `first day of next year`
* `last day of year`
