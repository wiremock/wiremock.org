Response headers and bodies can optionally be rendered (templated) with:

- [Handlebars.Net](https://github.com/rexm/Handlebars.Net)
- [Scriban/Scriban DotLiquid](https://github.com/scriban/scriban)

This enables attributes of the request to be used in generating the response e.g. to pass the value of a request ID header as a response header or render an identifier from part of the URL in the response body. To use this functionality, add `.WithTransformer()` to the response builder.

{% raw %}

## Way-Of-Working
## 1. Define "Handlebars template"
``` handlebars
Hello {{firstname}}
``` 

## 2. Data
``` c#
var user = new
{
  firstname = "Stef"
}
```

## 3. Result
``` c#
Hello Stef
```

### C# Example for using Handlebars.Net :
```csharp
var server = WireMockServer.Start();
server
  .Given(
    Request.Create().WithPath("/some/thing").UsingGet()
  )
  .RespondWith(
    Response.Create()
      .WithBody("Hello world! Your path is {{request.path}}.")
      .WithTransformer()
  );
```

### Mapping Json Example using Handlebars.Net:
``` js
{
    "Guid": "fd8ca21b-db82-48bc-ae5a-fc2153c2b0db",
    "Request": {
        "Path": {
            "Matchers": [
                {
                    "Name": "WildcardMatcher",
                    "Pattern": "/bodyasfile_transform123"
                }
            ]
        },
        "Methods": [
            "get"
        ]
    },
    "Response": {
        "Headers": { "Content-Type": "application/xml" },
        "BodyAsFile": "c:\\temp-wiremock\\__admin\\mappings\\_{{request.query.MyUniqueNumber}}_\\MyXmlResponse.xml",
    	"UseTransformer": true,
        "UseTransformerForBodyAsFile": true // ⭐
    }
}
```

### Scriban
For using Scriban as templating engine, just provide the type:
#### C#
``` c#
  // . . .
  .WithTransformer(TransformerType.Scriban) // or TransformerType.ScribanDotLiquid
  // . . .
```

#### JSON
``` js
{
    . . .
    "Response": {
        . . .
    	"UseTransformer": true,
        "TransformerType": "Scriban"
    }
}
```

# Note
Scriban and Handlebars.Net are supported, however some functionality from Scriban cannot not (yet) be used in WireMock.Net, these topics are:
- DOT notation for accessing this {{request.PathSegments.[0]}} does not work
- WireMockList is not supported by Scriban

So the examples and explication below is mostly targeted to Handlebars.Net

# The request model
The model of the request is supplied to the header and body templates. The following request attributes are available:

* `request.url` - URL path and query
* `request.method` - The HTTP method such as GET or POST.
* `request.protocol` - The scheme such as http or https.
* `request.host` - The name of the host in the URL.
* `request.origin` - The base URL of the request which is equivalent to `{Protocol}://{Host}:{Port}`.
* `request.absoluteurl` - URL path and query (absolute)
* `request.path` - URL path
* `request.absolutepath` - URL path (absolute)
* `request.PathSegments.[<n>]` - URL path segment (zero indexed) e.g. request.PathSegments.[2]
* `request.AbsolutePathSegments.[<n>]` - URL absolute path segments  (zero indexed) e.g. request.AbsolutePathSegments.[2]
* `request.query.<key>`- First value of a query parameter e.g. request.query.search
* `request.query.<key>.[<n>]`- nth value of a query parameter (zero indexed) e.g. request.query.search.[5]
* `request.headers.<key>` - First value of a request header e.g. request.headers.X-Request-Id
* `request.headers.[<key>]` - Header with awkward characters e.g. request.headers.[$?blah]
* `request.headers.<key>.[<n>]` - nth value of a header (zero indexed) e.g. request.headers.ManyThings.[1]
* `request.cookies.<key>` - Value of a request cookie e.g. request.cookies.JSESSIONID
* `request.body` - Request body text as string
* `request.bodyAsJson` - Request body as dynamic Json Object. Note that the request **must** contain the header `Content-Type` with value `application/json`!

## Transform the content from a referenced file
:memo:
By default, only the response (headers, statuscode, body) are transformed when the  `.WithTransformer()` or `UseTransformer` are defined.

⭐ In case you also want to transform the contents from a referenced file (via `BodyAsFile`), an additional parameter need to added. Like `.WithTransformer(bool)` or `UseTransformerForBodyAsFile = true`. ([#386](https://github.com/WireMock-Net/WireMock.Net/issues/386) and [#1106](https://github.com/WireMock-Net/WireMock.Net/issues/1106))

# Standard Handlebars helpers
All of the standard helpers (template functions) provided by the [C# Handlebars implementation](https://github.com/rexm/Handlebars.Net) are available.

# Additional Handlebars helpers
In addition to the standard helpers, also the helpers from [Handlebars.Net.Helpers](https://github.com/StefH/Handlebars.Net.Helpers/wiki) are supported.
The following extra helpers are included in WireMock.Net:
- [Humanizer](https://github.com/Handlebars-Net/Handlebars.Net.Helpers/wiki/Humanizer)
- [JsonPath.SelectToken & JsonPath.SelectTokens](#jsonpath)
- [Linq](https://github.com/Handlebars-Net/Handlebars.Net.Helpers/wiki/DynamicLinq)
- [Random](#random)
- [Regex](https://github.com/Handlebars-Net/Handlebars.Net.Helpers/wiki/Regex)
- [XPath.SelectSingleNode & XPath.SelectNodes & XPath.Evaluate](#xpath) and [XPath](https://github.com/Handlebars-Net/Handlebars.Net.Helpers/wiki/XPath)
- Xeger
- [Xslt](https://github.com/Handlebars-Net/Handlebars.Net.Helpers/wiki/Xslt)

## JsonPath
JsonPath support is also present (internal logic is based on Newtonsoft.Json).

Two functions are present:
1. JsonPath.SelectToken
2. JsonPath.SelectTokens

### JsonPath.SelectToken
#### This can be used in C# like:
```csharp
var server = WireMockServer.Start();
server
    .Given(Request.Create().WithPath("/jsonpathtestToken").UsingPost())
    .RespondWith(Response.Create()
        .WithHeader("Content-Type", "application/json")
        .WithBody("{{JsonPath.SelectToken request.body \"$.Manufacturers[?(@.Name == 'Acme Co')]\"}}")
        .WithTransformer()
    );
```

:warning:
When returning a more complex Json Body like this:
``` json
{
  "market": "{{JsonPath.SelectToken request.bodyAsJson '$.pricingContext.market'}}",
  "languages": "en"
}
```

You need to to use single quote (`'`) instead of escaped double quotes (`\"`) because of some parsing error @ Handlebars.Net (see also #1108).

#### Or using the admin mapping file:
``` js
{
    "Request": {
        "Path": {
            "Matchers": [
                {
                    "Name": "WildcardMatcher",
                    "Pattern": "/jsonpathtestToken"
                }
            ]
        },
        "Methods": [
            "post"
        ]
    },
    "Response": {
        "Body": "{{JsonPath.SelectToken request.body \"$.Manufacturers[?(@.Name == 'Acme Co')]\"}}",
        "UseTransformer": true,
        "Headers": {
            "Content-Type": "application/json"
        }
    }
}
```

Note that also replacing values in a Json Object and returning a the body as Json is supported, to use this, use a mapping file like this:
``` js
{
  "Request": {
    "Path": {
      "Matchers": [
        {
          "Name": "WildcardMatcher",
          "Pattern": "/test"
        }
      ]
    },
    "Methods": [
      "post"
    ]
  },
  "Response": {
    "BodyAsJson": {
      "path": "{{request.path}}",
      "result": "{{JsonPath.SelectToken request.bodyAsJson \"username\"}}"
    },
    "UseTransformer": true,
    "Headers": {
      "Content-Type": "application/json"
    }
  }
}
```

---

## Random
It's possible to return random data using the `Random` Handlebars function.

### Random Text
**Example**: to generate a random string between 8 and 20 characters, use this code in C#:
```csharp
var server = WireMockServer.Start();
server
    .Given(Request.Create().WithPath("/random").UsingGet())
    .RespondWith(Response.Create()
        .WithHeader("Content-Type", "application/json")
        .WithBodyAsJson(
            Text = "{{Random Type=\"Text\" Min=8 Max=20}}",
        )
        .WithTransformer()
    );
```

**Example**: to generate a random string using a Regex pattern, use this code in C#:
```csharp
var server = FluentMockServer.Start();
server
    .Given(Request.Create().WithPath("/random-regex").UsingGet())
    .RespondWith(Response.Create()
        .WithHeader("Content-Type", "application/json")
        .WithBodyAsJson(
            Text = "{{Xeger \"[1-9][0-9]{3}[A-Z]{2}\"}",
        )
        .WithTransformer()
    );
```

### Random (all supported randomizers)
You can use the powerful Regular Expression string generator based on [Fare - Finite Automata and Regular Expressions](https://github.com/moodmosaic/Fare).
- Text Regex Pattern: `"{{Xeger Pattern=\"[1-9][0-9]{3}[A-Z]{2}"}}"`

Besides a random text string, it's also possible to generate this random data:
- Integer: `"{{Random Type=\"Integer\" Min=100 Max=999}}"`
- Guid: `"{{Random Type=\"Guid\"}}"`
- City: `"{{Random Type=\"City\"}}"`
- Country: `"{{Random Type=\"Country\"}}"`
- First Name: `"{{Random Type=\"FirstName\" Male=false Female=true}}"`
- Email Address: `"{{Random Type=\"EmailAddress\"}}"`
- Text Words: `"{{Random Type=\"TextWords\" Min=10 Max=20}}"`
- Text Regex Pattern: `"{{Random Type=\"TextRegex\" Pattern=\"[1-9][0-9]{3}[A-Z]{2}"}}"`
- Text Lorum Ipsum: `"{{Random Type=\"TextIpsum\" Paragraphs=2}}"`
- String List: `"{{Random Type=\"StringList\" Values=[\"a\", \"b\", \"c\"]}}"`
- IPv4 Address: `"{{Random Type=\"IPv4Address\"}}"`
- IPv6 Address: `"{{Random Type=\"IPv6Address\" Min = "0000:0001:0000:0000:0020:ff00:0042:8000", Max = "2001:0db8:0120:0000:0030:ff00:aa42:8329"}}"`
- MAC Address: `"{{Random Type=\"MACAddress\"}}"`
- For more details on the supported random data types, see [RandomDataGenerator.Net](https://github.com/StefH/RandomDataGenerator);

Note: instead of using `\"` in above examples, you can also use `'`.

---

## XPath
XPath support is also present

Three functions are present:
1. XPath.SelectSingleNode
2. XPath.SelectNodes
3. XPath.Evaluate

### XPath.SelectSingleNode
This can be used in C# like:
```csharp
var server = WireMockServer.Start();
server
    .Given(Request.Create().WithPath("/xpath1").UsingPost())
    .RespondWith(Response.Create()
        .WithHeader("Content-Type", "application/xml")
        .WithBody("<response>{{XPath.SelectSingleNode request.body \"/todo-list/todo-item[1]\"}}</response>")
        .WithTransformer()
    );
```

Or using the admin mapping file:
``` js
{
    "Request": {
        "Path": {
            "Matchers": [
                {
                    "Name": "WildcardMatcher",
                    "Pattern": "/xpath1"
                }
            ]
        },
        "Methods": [
            "post"
        ]
    },
    "Response": {
        "Body": "<response>{{XPath.SelectSingleNode request.body \"/todo-list/todo-item[1]\"}}</response>",
        "UseTransformer": true,
        "Headers": {
            "Content-Type": "application/xml"
        }
    }
}
```

For examples on `XPath.SelectNodes` and `XPath.Evaluate`, see https://github.com/WireMock-Net/WireMock.Net/blob/master/test/WireMock.Net.Tests/ResponseBuilders/ResponseWithHandlebarsXPathTests.cs


{% endraw %}