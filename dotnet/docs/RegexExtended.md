# Info

The [RegexMatcher](https://github.com/WireMock-Net/WireMock.Net/wiki/Request-Matching#regular-expression-matching-regexmatcher) can use:
- [RegexExtended](https://github.com/WireMock-Net/WireMock.Net/blob/master/src/WireMock.Net/RegularExpressions/RegexExtended.cs) (default)
- [Regex](https://docs.microsoft.com/en-us/dotnet/api/system.text.regularexpressions.regex?view=net-6.0)

## RegexExtended 
Extension to the Regex object, adding support for GUID tokens for matching on.
Example:
When using this `\guidb` as regular expression, you can match on a GUID(B).