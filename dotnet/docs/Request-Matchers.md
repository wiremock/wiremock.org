# Matchers
WireMock.Net supports matching of requests to stubs and verification queries using the following matchers:

At this moment these matchers are supported:
* [ExactMatcher](https://github.com/WireMock-Net/WireMock.Net/wiki/Request-Matchers#exact-matcher-exactmatcher)
* [LinqMatcher](https://github.com/WireMock-Net/WireMock.Net/wiki/Request-Matchers#dynamic-linq-linqmatcher)
* [CSharpCodeMatcher](https://github.com/WireMock-Net/WireMock.Net/wiki/Request-Matching-CSharpCode)
* [FormUrlEncodedMatcher](https://github.com/WireMock-Net/WireMock.Net/wiki/Request-Matcher-FormUrlEncodedMatcher)
* [GraphQLMatcher](https://github.com/WireMock-Net/WireMock.Net/wiki/Request-Matching-GraphQLMatcher)
* [JsonMatcher](https://github.com/WireMock-Net/WireMock.Net/wiki/Request-Matching-JsonMatcher)
* [JsonPartialMatcher](https://github.com/WireMock-Net/WireMock.Net/wiki/Request-Matching-JsonPartialMatcher)
* [JsonPartialWildcardMatcher](https://github.com/WireMock-Net/WireMock.Net/wiki/Request-Matching-JsonPartialWildcardMatcher)
* [JsonPathMatcher](https://github.com/WireMock-Net/WireMock.Net/wiki/Request-Matching-JsonPathMatcher)
* [JmesPathMatcher](https://github.com/WireMock-Net/WireMock.Net/wiki/Request-Matchers#jmes-path-jmespathmatcher)
* [MimePartMatcher](https://github.com/WireMock-Net/WireMock.Net/wiki/Request-Matching-MimePartMatcher)
* [XPathMatcher](https://github.com/WireMock-Net/WireMock.Net/wiki/Request-Matchers#xpathmatcher)
* [RegexMatcher](https://github.com/WireMock-Net/WireMock.Net/wiki/Request-Matchers#regular-expression-matching-regexmatcher)
* [SimMetricsMatcher](https://github.com/WireMock-Net/WireMock.Net/wiki/Request-Matchers#similarity-metric-matching-simmetricsmatcher)
* [WildcardMatcher](https://github.com/WireMock-Net/WireMock.Net/wiki/Request-Matchers#wildcardmatching-wildcardmatcher)
* ContentTypeMatcher(🚧)
* [NotNullOrEmptyMatcher](https://github.com/WireMock-Net/WireMock.Net/wiki/Request-Matchers#notnulloremptymatcher)
* [CustomMatcher](https://github.com/WireMock-Net/WireMock.Net/wiki/Request-Matchers#custommatcher)
* [ProtoBufMatcher](https://github.com/WireMock-Net/WireMock.Net/wiki/Request-Matching-ProtoBuf)

## Exact matcher (ExactMatcher)
Can be used to exactly match a string or object.

#### C# option
```csharp
var server = WireMockServer.Start();
server
    .Given(Request.Create().WithPath("/exact")
        .WithParam("from", new ExactMatcher("abc")))
    .RespondWith(Response.Create()
        .WithBody("Exact match")
    );
```

#### JSON Mapping option
``` js
{
    "Guid": "67ae335b-5d79-42dc-8ca7-236280ab9111",
    "Request": {
        "Path": {
            "Matchers": [
                {
                    "Name": "WildcardMatcher",
                    "Pattern": "/exact"
                }
            ]
        },
        "Params": [
            {
                "Name": "from",
                "Matchers": [
                    {
                        "Name": "ExactMatcher",
                        "Pattern": "abc"
                    }
                ]
            }
        ]
    },
    "Response": {
        "Body": "Exact match"
    }
}
```

## Dynamic Linq (LinqMatcher)
Can be used to match an object using Dynamic Linq (https://github.com/StefH/System.Linq.Dynamic.Core)

#### C# option
```csharp
var server = WireMockServer.Start();
server
    .Given(Request.Create().WithPath("/linq")
        .WithParam("from", new LinqMatcher("DateTime.Parse(it) > \"2018-03-01 00:00:00\"")))
    .RespondWith(Response.Create()
        .WithBody("linq match !!!")
    );
```

#### JSON Mapping option
``` js
{
    "Guid": "67ae335b-5d79-42dc-8ca7-236280ab91ec",
    "Priority": 0,
    "Request": {
        "Path": {
            "Matchers": [
                {
                    "Name": "WildcardMatcher",
                    "Pattern": "/linq"
                }
            ]
        },
        "Params": [
            {
                "Name": "from",
                "Matchers": [
                    {
                        "Name": "LinqMatcher",
                        "Pattern": "DateTime.Parse(it) > \"2018-03-01 00:00:00\""
                    }
                ]
            }
        ],
        "Body": {}
    },
    "Response": {
        "Body": "linq match !!!"
    }
}
```

#### JSON Mapping
``` js
{
    "Guid": "55a600b8-9d6f-453f-90c6-3db2b0885ddb",
    "Request": {
        "Path": {
            "Matchers": [
                {
                    "Name": "WildcardMatcher",
                    "Pattern": "/jmespath_example",
                    "IgnoreCase": false
                }
            ]
        },
        "Methods": [
            "put"
        ],
        "Body": {
            "Matcher": {
                "Name": "JmesPathMatcher",
                "Pattern": "things.name == 'RequiredThing'"
            }
        }
    },
    "Response": {
        "StatusCode": 200,
        "Body": "{ \"result\": \"JmesPathMatcher !!!\"}",
        "UseTransformer": false
    }
}
```

```
// matching
{ "things": { "name": "RequiredThing" } }
{ "things": [ { "name": "RequiredThing" }, { "name": "Wiremock" } ] }
// not matching
{ "price": 15 }
{ "things": { "name": "Wiremock" } }
```

### Jmes Path (JmesPathMatcher)
The JMESPath language is described in an ABNF grammar with a complete specification.
A JSON body will be considered to match a path expression if the expression returns either a non-null single value (string, integer etc.), or a non-empty object or array.

#### C#
```csharp
var server = WireMockServer.Start();
server
  .Given(
    Request.Create().WithPath("/jmespath_example").UsingGet()
      .WithBody(new JmesPathMatcher("things.name == 'RequiredThing"));
  )
  .RespondWith(Response.Create().WithBody("Hello"));
```

### XPathMatcher
Deems a match if the attribute value is valid XML and matches the XPath expression supplied.
An XML document will be considered to match if any elements are returned by the XPath evaluation.
WireMock delegates to [XPath2.Net](https://github.com/StefH/XPath2.Net), therefore it support up to XPath version 2.0.

#### C#
```csharp
var server = WireMockServer.Start();
server
    .Given(Request.Create()
        .WithPath("/xpath").UsingPost()
        .WithBody(new XPathMatcher("/todo-list[count(todo-item) = 3]"))
    )
    .RespondWith(Response.Create().WithBody("XPathMatcher!"));
```

#### JSON Mapping
``` js
{
    "Guid": "abc5848e-cedd-42ad-8f58-4ba6df01180f",
    "Priority": 0,
    "Request": {
        "Path": {
            "Matchers": [
                {
                    "Name": "WildcardMatcher",
                    "Pattern": "/xpath",
                    "IgnoreCase": false
                }
            ]
        },
        "Methods": [
            "post"
        ],
        "Body": {
            "Matcher": {
                "Name": "XPathMatcher",
                "Pattern": "/todo-list[count(todo-item) = 3]"
            }
        }
    },
    "Response": {
        "StatusCode": 200,
        "BodyDestination": "SameAsSource",
        "Body": "XPathMatcher!",
        "UseTransformer": false
    }
}
```

Will match xml below:
```xml
<todo-list>
  <todo-item id='a1'>abc</todo-item>
  <todo-item id='a2'>def</todo-item>
  <todo-item id='a3'>xyz</todo-item>
</todo-list>
```

### Regular Expression Matching (RegexMatcher)
The RegexMatcher can be used to match using a regular expression.

```csharp
var server = WireMockServer.Start();
server
  .Given(
    Request.Create().WithPath("/reg").UsingPost()
	  .WithBody(new RegexMatcher("H.*o"));
  )
  .RespondWith(Response.Create().WithBody("Hello matched with RegexMatcher"));
```

```
// matching
Hello World

// not matching
Hi WM
```

### Similarity Metric Matching (SimMetricsMatcher)
[SimMetrics.Net](https://github.com/StefH/SimMetrics.Net) is used as a Similarity Metric Library, e.g. from edit distance's (Levenshtein, Gotoh, Jaro etc) to other metrics, (e.g Soundex, Chapman).

```csharp
var server = WireMockServer.Start();
server
  .Given(
    Request.Create().WithPath("/reg").UsingGet()
	  .WithBody(new SimMetricsMatcher("The cat walks in the street."));
  )
  .RespondWith(Response.Create().WithBody("Matched with SimMetricsMatcher"));
```

```
// matching with distance 0.793
The car drives in the street.

// matching with distance 0.071
Hello
```

### WildcardMatching (WildcardMatcher)
WildcardMatching is mostly used for Path and Url matching. This matcher allows a ? for a single character and * for any characters.

#### Option 1
```csharp
var server = WireMockServer.Start();
server
  .Given(Request.Create().WithPath("/some*").UsingGet())
  .RespondWith(Response.Create().WithBody("Hello"));
```

#### Option 2
```csharp
var server = FluentMockServer.Start();
server
  .Given(
    Request.Create().WithPath("/wc").UsingGet()
	  .WithBody(new WildcardMatcher("x."));
  )
  .RespondWith(Response.Create().WithBody("Matched with *"));
```

### NotNullOrEmptyMatcher
NotNullOrEmptyMatcher is used for Body matching. This matcher will return a match of the body is not null (BodyAsBytes, BodyAsJson, BodyAsString) or empty (BodyAsBytes, BodyAsString).

### CustomMatcher
It's also possible to use a custom mapper with your own name.

#### JSON Mapping Option
``` js
{
    "Guid": "67ae335b-5d79-42dc-8ca7-236280ab9211",
    "Priority": 0,
    "Request": {
        "Path": {
            "Matchers": [
                {
                    "Name": "MyCustomMatcher",
                    "Pattern": "abc"
                }
            ]
        }
        "Body": {}
    },
    "Response": {
        "Body": "custom match"
    }
}
```


### Reversing the match behaviour with `MatchBehaviour.RejectOnMatch`

The default behaviour for Matchers is MatchBehaviour.AcceptOnMatch so that when the matcher processes a request that corresponds with the matcher, the stubbed response is returned. In some scenarios you might want to reverse this behaviour so that the stubbed response is returned with the absence of a match.

e.g. You want to return `401 Unauthorised` if the caller does not provide a header containing the API Key:

```csharp
server
   .Given(Request.Create()
             .WithPath("/needs-a-key")
             .UsingGet()
             .WithHeader("api-key", "*", MatchBehaviour.RejectOnMatch)
             .UsingAnyMethod())
   .RespondWith(Response.Create()
             .WithStatusCode(HttpStatusCode.Unauthorized)
             .WithBody(@"{ ""result"": ""api-key missing""}"));
```

A JSON Mapping example looks like:
``` json
{
  "Guid": "29971ff8-4adb-4ec7-8b7d-a2ce6e5ca630",
  "Request": {
    "Path": {
      "Matchers": [
        {
          "Name": "WildcardMatcher",
          "Pattern": "/needs-a-key"
        }
      ]
    },
    "Headers": [
      {
        "Name": "api-key",
        "Matchers": [
          {
            "Name": "WildcardMatcher",
            "Pattern": "*",
            "IgnoreCase": true,
            "RejectOnMatch": true
          }
        ]
      }
    ]
  },
  "Response": {
    "StatusCode": 401,
    "BodyDestination": "SameAsSource",
    "Body": "{ \"result\": \"api-key missing\"}",
    "Headers": {}
  }
}
```