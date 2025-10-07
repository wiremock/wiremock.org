## JSON (JsonMatcher)
Checks if a JSON object (or JSON as string) is DeepEqual.

#### C# option 1
```csharp
var server = WireMockServer.Start();
server
    .Given(Request
    .Create()
    .WithPath("/jsonmatcher1")
    .WithBody(new JsonMatcher("{ \"x\": 42, \"s\": \"s\" }"))
    .UsingPost())
    .WithGuid("debaf408-3b23-4c04-9d18-ef1c020e79f2")
    .RespondWith(Response.Create().WithBody(@"{ ""result"": ""jsonbodytest1"" }"));
```

#### JSON Mapping option 1
``` js
{
    "Guid": "debaf408-3b23-4c04-9d18-ef1c020e79f2",
    "Request": {
        "Path": {
            "Matchers": [
                {
                    "Name": "JsonMatcher",
                    "Pattern": "/jsonmatcher1"
                }
            ]
        },
        "Methods": [
            "post"
        ],
        "Body": {
            "Matcher": {
                "Name": "JsonMatcher",
                "Pattern": "{ \"x\": 42, \"s\": \"s\" }"
            }
        }
    },
    "Response": {
        "StatusCode": 200,
        "Body": "{ \"result\": \"jsonbodytest\" }",
        "UseTransformer": false
    }
}
```

#### C# option 2
```csharp
var server = WireMockServer.Start();
server
    .Given(Request
    .Create()
    .WithPath("/jsonmatcher2")
    .WithBody(new JsonMatcher(new { x = 42, s = "s" }))
    .UsingPost())
    .WithGuid("debaf408-3b23-4c04-9d18-ef1c020e79f2")
    .RespondWith(Response.Create().WithBody(@"{ ""result"": ""jsonbodytest2"" }"));
```

#### JSON Mapping option 2
``` js
{
    "Guid": "debaf408-3b23-4c04-9d18-ef1c020e79f2",
    "Request": {
        "Path": {
            "Matchers": [
                {
                    "Name": "JsonMatcher",
                    "Pattern": "/jsonmatcher2"
                }
            ]
        },
        "Methods": [
            "post"
        ],
        "Body": {
            "Matcher": {
                "Name": "JsonMatcher",
                "Pattern": { "x": 42, "s": "s" }
            }
        }
    },
    "Response": {
        "StatusCode": 200,
        "Body": "{ \"result\": \"jsonbodytest2\" }",
        "UseTransformer": false
    }
}
```

```
// matching
{ "x": 42, "s": "s" }

// not matching
{ "x": 42, "s": "?" }
```

#### C# option 3
It's also possible to use set `IgnoreCase` to true, this means that the PropertNames and PropertyValues will be matced regarding any case.
```csharp
var server = WireMockServer.Start();
server
    .Given(Request
    .Create()
    .WithPath("/jsonmatcher3")
    .WithBody(new JsonMatcher("{ \"x\": 42, \"s\": \"s\" }"), true)
    .UsingPost())
    .WithGuid("debaf408-3b23-4c04-9d18-ef1c020e79f2")
    .RespondWith(Response.Create().WithBody(@"{ ""result"": ""jsonmatcher3 ok"" }"));
```

#### JSON Mapping option 3
``` js
{
    "Guid": "debaf408-3b23-4c04-9d18-ef1c020e79f2",
    "Request": {
        "Path": {
            "Matchers": [
                {
                    "Name": "WildcardMatcher",
                    "Pattern": "/jsonmatcher1"
                }
            ]
        },
        "Methods": [
            "post"
        ],
        "Body": {
            "Matcher": {
                "Name": "JsonMatcher",
                "IgnoreCase": true,
                "Pattern": "{ \"x\": 42, \"s\": \"s\" }"
            }
        }
    },
    "Response": {
        "StatusCode": 200,
        "Body": "{ \"result\": \"jsonmatcher3 ok\" }",
        "UseTransformer": false
    }
}
```

```
// matching
{ "X": 42, "s": "S" }
```