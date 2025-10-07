## CSharp Code (CSharpCodeMatcher)
*Advanced!* With this matcher you can use complex C# code to match an JObject or string value.
* You need to include the NuGet package [WireMock.Net.Matchers.CSharpCode](https://www.nuget.org/packages/WireMock.Net.Matchers.CSharpCode/)
* Note that this functionality will only work if enabled in the settings (`AllowCSharpCodeMatcher = true`).
* The argument-name from the string or JObject to match will be `it`.

#### C# option
```csharp
var server = WireMockServer.Start();
server
    .Given(Request.Create().WithPath("/cs")
        .WithParam("from", new CSharpCodeMatcher("return it == \"x\";")))
    .RespondWith(Response.Create()
        .WithBody("cs match")
    );
```

#### JSON Mapping option
``` js
{
    "Guid": "67ae335b-5d79-42dc-8ca7-236280ab9211",
    "Priority": 0,
    "Request": {
        "Path": {
            "Matchers": [
                {
                    "Name": "WildcardMatcher",
                    "Pattern": "/cs"
                }
            ]
        },
        "Params": [
            {
                "Name": "from",
                "Matchers": [
                    {
                        "Name": "CSharpCodeMatcher",
                        "Pattern": "return it == \"x\";"
                    }
                ]
            }
        ],
        "Body": {}
    },
    "Response": {
        "Body": "cs match"
    }
}
```