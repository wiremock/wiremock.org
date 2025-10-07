## JSON (JsonPartialMatcher)
Checks if a JSON object has a partial match.
Example:
Matcher value 
`{"test":"abc"}` against input `{"test":"abc","other":"xyz"}` is matched by this JsonPartialMatcher.


#### C# option 1
```csharp
var server = WireMockServer.Start();
server
  .Given(Request
    .Create()
      .WithPath("/jsonpartialmatcher1")
      .WithBody(new JsonPartialMatcher("{ \"test\": \"abc\" }"))
      .UsingPost())
  .WithGuid("debaf408-3b23-4c04-9d18-ef1c020e79f2")
  .RespondWith(Response.Create().WithBody(@"{ ""result"": ""jsonpartialbodytest1"" }"));
```

#### JSON Mapping option 1
``` json
{
    "Guid": "debaf408-3b23-4c04-9d18-ef1c020e79f2",
    "Request": {
        "Path": {
            "Matchers": [
                {
                    "Name": "WildcardMatcher",
                    "Pattern": "/jsonpartialmatcher1"
                }
            ]
        },
        "Methods": [
            "post"
        ],
        "Body": {
            "Matcher": {
                "Name": "JsonPartialMatcher",
                "Pattern": "{ \"test\": \"abc\" }"
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
{ "test": "abc", "extra": "?" }
```

#### IgnoreCase
It's also possible to use set `IgnoreCase` to true, this means that the PropertNames and PropertyValues will be matched regarding any case.
Same logic as the normal JsonMatcher.

#### Use Regex
It's possible to add a property `Regex` with the value `true`, with this option set, PropertyValues are matched using a specified regular expression.

Example for C# when you want to match the `id` for any number.
```csharp
var server = WireMockServer.Start();
server
  .Given(Request
    .Create()
      .WithPath("/jsonpartialmatcher1")
      .WithBody(new JsonPartialMatcher("{ \"id\": \"^\\d+$\" }", false, false, true))
      .UsingPost())
  .WithGuid("debaf408-3b23-4c04-9d18-ef1c020e79f2")
  .RespondWith(Response.Create().WithBody(@"{ ""result"": ""jsonpartialbodytest1"" }"));
```

Or in JSON mapping:
``` json
{
    "Guid": "debaf408-3b23-4c04-9d18-ef1c020e79f2",
    "Request": {
      "Methods": [
          "post"
      ],
     "Body": {
       "Matcher": {
        "Name": "JsonPartialWildcardMatcher",
        "Regex": true, // <--- add this property
        "Pattern": {
          "applicationId": "*",
          "currency": "EUR",
          "price": "^\\d*$", // <--- use regex
          "externalId": "*",
          "transactionDescription": "*",
        },
        "IgnoreCase": false
      }
    }
    },
    "Response": {
        "StatusCode": 200,
        "Body": "{ \"result\": \"jsonpartialbodytest1-with-regex\" }",
        "UseTransformer": false
    }
}
```
