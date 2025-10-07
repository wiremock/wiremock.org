## FormUrlEncodedMatcher
Can be used to check if a Form Url Encoded body contains the key-value pairs.

### C# option
```csharp
var server = WireMockServer.Start();
server.Given(
    Request.Create()
        .UsingPost()
        .WithPath("/foo")
        .WithHeader("Content-Type", "application/x-www-form-urlencoded")
        .WithBody(new FormUrlEncodedMatcher(["name=John Snow", "email=john_snow@example.com"]))
    )
    .RespondWith(
        Response.Create()
    );
```

### JSON Mapping option
``` json
{
  "Request": {
    "Path": {
      "Matchers": [
        {
          "Name": "WildcardMatcher",
          "Pattern": "/foo"
        }
      ]
    },
    "Methods": [
      "POST"
    ],
    "Headers": [
      {
        "Name": "Content-Type",
        "Matchers": [
          {
            "Name": "WildcardMatcher",
            "Pattern": "application/x-www-form-urlencoded",
            "IgnoreCase": true
          }
        ]
      }
    ],
    "Body": {
      "Matcher": {
        "Name": "FormUrlEncodedMatcher",
        "Patterns": [
           "name=John Snow",
           "email=john_snow@example.com"
         ],
        "IgnoreCase": true
      }
    }
  },
  "Response": {
    "StatusCode": 200
  }
}
```

### :memo: Notes
- You can also use `IgnoreCase`
- And you can also use wildcards like: `name=John*`