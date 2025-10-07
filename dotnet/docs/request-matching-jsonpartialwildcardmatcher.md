## JSON (JsonPartialWildcardMatcher)
Based on JsonPartialMatcher but with wildcard (`*`) support.

Example:
Matcher value 
`{"test":"*"}` matches input `{"test":"abc" }`, but also input `{"test":"test" }` is matched.


#### C# option 1
```csharp
var server = WireMockServer.Start();
server
    .Given(Request
    .Create()
    .WithPath("/jsonpartialmatcher1")
    .WithBody(new JsonPartialWildcardMatcher("{ \"test\": \"*\" }"))
    .UsingPost())
    .WithGuid("debaf408-3b23-4c04-9d18-ef1c020e79f2")
    .RespondWith(Response.Create().WithBody(@"{ ""result"": ""jsonpartialbodytest1"" }"));
```

#### JSON Mapping option 1
``` js
{
    "Guid": "debaf408-3b23-4c04-9d18-ef1c020e79f2",
    "Request": {
        "Path": {
            "Matchers": [
                {
                    "Name": "WilcardMatcher",
                    "Pattern": "/jsonpartialmatcher1"
                }
            ]
        },
        "Methods": [
            "post"
        ],
        "Body": {
            "Matcher": {
                "Name": "JsonPartialWildcardMatcher",
                "Pattern": "{ \"test\": \"*\" }"
            }
        }
    },
    "Response": {
        "StatusCode": 200,
        "Body": "{ \"result\": \"jsonpartialbodytest1\" }",
        "UseTransformer": false
    }
}
```

``` js
// matching
{ "test": "abc" }

// also matching
{ "test": "test" }

// and also matching
{ "test": "abc", "extra": "?" }
```

#### IgnoreCase
It's also possible to use set `IgnoreCase` to true, this means that the PropertNames and PropertyValues will be matched regarding any case.
Same logic as the normal JsonMatcher.

### Notes
- For now it's only possible to use this matcher to match on string-values.