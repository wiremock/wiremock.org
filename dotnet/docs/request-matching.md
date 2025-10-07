# :one: Request Matching
WireMock.Net supports matching of requests to stubs and verification queries using the following parts:

* [Path](#path)
* [URL](#url)
* HTTP Method
* [Query parameters](#query-parameters)
* [Headers](#headers)
* Cookies
* Request Body

## Generic information on matchers:

Most matchers have 2 extra properties:
- IgnoreCase = define that the matcher should match ignoring the case
- RejectOnMatch = define that when the matcher does match successfully, this should be counted as a invalid (non-matching) match

## Example Matchings

### Path
#### C# example
``` c#
server
  .Given(Request
    .Create()
      .WithPath("/test")
```

#### JSON example
``` json
{
  "Request": {
    "Path": {
      "Matchers": [
        {
          "Name": "WildcardMatcher",
          "Pattern": "/path",
          "IgnoreCase": true
        }
      ]
    }
  }
}
````

### Url
#### C# example
``` c#
server
  .Given(Request
    .Create()
      .WithUrl("https://localhost/test")
```

#### JSON example
``` json
{
  "Request": {
    "Url": {
      "Matchers": [
        {
          "Name": "RegexMatcher",
          "Pattern": "/clients[?]",
          "IgnoreCase": true
        }
      ]
    }
  }
}
````

### Query Parameters
#### C# example
``` c#
server
  .Given(Request
    .Create()
      .WithParam("search", "abc")
```

#### JSON example
``` json
{
     "Request": {
        "Params": [
            {
                "Name": "search",
                "Matchers": [
                    {
                        "Name": "ExactMatcher",
                        "Pattern": "abc"
                    }
                ]
            }
        ]
    }
}
```

### Headers
#### C#
``` c#
// todo
```

#### JSON
``` json
{
  "Request": {
    "Headers": [
      {
        "Name": "api-key",
        "Matchers": [
          {
            "Name": "WildcardMatcher",
            "Pattern": "abc*"
            "IgnoreCase": true
          }
        ]
      }
    ]
  }
}
```

Note that when you want to match on a missing header, you need to use this mapping:
``` json
{
  "Request": {
    "Headers": [
    {
      "Name": "api-key",
      "IgnoreCase": true,
      "RejectOnMatch": true
    }
  ]
}
```
This means that when the header-key `api-key` (ignoring the casing) is missing the header mapping will match because `RejectOnMatch` is `true`.

# :two: Matchers
Content moved to [Request Matchers](https://github.com/WireMock-Net/WireMock.Net/wiki/Request-Matchers).