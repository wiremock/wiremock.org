### JSON Path (JsonPathMatcher)
Deems a match if the attribute value is valid JSON and matches the JSON Path expression supplied.
A JSON body will be considered to match a path expression if the expression returns either a non-null single value (string, integer etc.), or a non-empty object or array.

#### C#
```csharp
var server = WireMockServer.Start();
server
  .Given(
    Request.Create().WithPath("/some/thing").UsingGet()
      .WithBody(new JsonPathMatcher("$.things[?(@.name == 'RequiredThing')]"));
  )
  .RespondWith(Response.Create().WithBody("Hello"));
```

#### JSON Mapping
``` js
{
    "Guid": "e4a600b8-9d6f-453f-90c6-3db2b0885ddb",
    "Request": {
        "Path": {
            "Matchers": [
                {
                    "Name": "WildcardMatcher",
                    "Pattern": "/jsonpath",
                    "IgnoreCase": false
                }
            ]
        },
        "Methods": [
            "put"
        ],
        "Body": {
            "Matcher": {
                "Name": "JsonPathMatcher",
                "Pattern": "$.things[?(@.name == 'RequiredThing')]"
            }
        }
    },
    "Response": {
        "StatusCode": 200,
        "BodyDestination": "SameAsSource",
        "Body": "{ \"result\": \"JsonPathMatcher !!!\"}",
        "UseTransformer": false
    }
}
```

``` js
// matching
{ "things": { "name": "RequiredThing" } }
{ "things": [ { "name": "RequiredThing" }, { "name": "Wiremock" } ] }

// not matching
{ "price": 15 }
{ "things": { "name": "Wiremock" } }
```