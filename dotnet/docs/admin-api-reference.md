# Admin API Reference
The **WireMock admin API** provides functionality to define the mappings via a http/https interface. To use this interface, you need to enable the admin interface in code:
```c#
var server = WireMockServer.StartWithAdminInterface();
```

{% raw %}

# API definition
A Swagger 2.0 definition can be found [on Swagger hub](https://app.swaggerhub.com/apis/StefHeyenrath/WireMock/1.4.7).

# Client API
You can use a predefined interface API ([WireMock.Net.RestClient](https://www.nuget.org/packages/WireMock.Net.RestClient)) to access all the methods described on this page.
```c#
// Create an implementation of the IWireMockAdminApi and pass in the base URL for the API.
var api = RestClient.For<IWireMockAdminApi>("http://localhost:9091");

// Set BASIC Authorization
api.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(Encoding.ASCII.GetBytes("foo:bar")));

// OR

// Set Azure AD Authentication
api.Authorization = new AuthenticationHeaderValue("Bearer", "eyJ0eXAiOiJKV1QiLCJ...");

// Call API
var settings = await api.GetSettingsAsync();
```

## Azure AD Authentication - Information
To get v2.0 AAD token you need to modify the `Manifest` of your AAD app registration by following the instructions here https://docs.azure.cn/en-us/entra/identity-platform/scenario-protected-web-api-app-registration#accepted-token-version

You can then get the token using this CURL command

```bash
# replace AadClientId, AadApplicationURI, AadClientSecret, AadTenantId with the AAD details from the azure portal.

curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d 'client_id={AadClientId}&scope={AadApplication Uri}/.default&client_secret={AadClientSecret}&grant_type=client_credentials' 'https://login.microsoftonline.com/{AadTenantId}/oauth2/v2.0/token'
```

Once obtaining the token, start the WireMock.Net server, e.g. the `WireMock.Net.StandAlone` package.

```c#
using WireMock.Logging;
using WireMock.Net.StandAlone;
using WireMock.Settings;

var settings = new WireMockServerSettings
{
    AllowPartialMapping=true,
    Logger = new WireMockConsoleLogger(),
    UseSSL = true,
    AdminAzureADTenant = "AadTennatId",
    AdminAzureADAudience = "AadAudience",
    StartAdminInterface=true
};

StandAloneApp.Start(settings);

Console.WriteLine("Press any key to stop the server");
Console.ReadKey();
```

Make a `GET` request to `{WiremockServerURL}/__admin/requests` with the `Bearer AadToken` set in the `Authorization` header and 200 for success 401 for authentication errors.


### FluentBuilder
All Admin API Model classes are annotated with [FluentBuilder](https://github.com/StefH/FluentBuilder) which makes it easy to build a mapping in a fluent way.

Example code:
``` c#
var mappingBuilder = api.GetMappingBuilder();
    mappingBuilder.Given(m => m
        .WithTitle("This is my title 1")
        .WithRequest(req => req
            .UsingGet()
            .WithPath("/bla1")
        )
        .WithResponse(rsp => rsp
            .WithBody("x1")
            .WithHeaders(h => h.Add("h1", "v1"))
        )
    );
```

## Supported interfaces
The following interfaces are supported:

## /__admin/settings
The global settings from the mock service.
* `GET    /__admin/settings` --> Gets the current global settings
* `POST   /__admin/settings` --> Updates the current global settings

## /__admin/health
Get health status.
* `GET    /__admin/health` --> Get health status. Returns HttpStatusCode 200 with a value Healthy to indicate that WireMock.Net is healthy. In case it's not healthy, it returns HttpStatusCode 404.

## /__admin/mappings
The mappings defined in the mock service.
* `GET    /__admin/mappings` --> Gets all defined mappings
* `POST   /__admin/mappings` --> Create a new single stub mapping or an array from mappings
* `POST   /__admin/mappings/wiremock.org` --> Create a new single **WireMock.org** stub mapping or an array **WireMock.org** mappings
* `DELETE /__admin/mappings` or `POST /__admin/mappings/reset` --> Delete all stub mappings
* `DELETE /__admin/mappings` with array of json mappings/GUIDs in body --> Delete stub mappings matching the specified GUIDs.
* `GET    /__admin/mappings/{guid}` --> Get a single stub mapping
* `PUT    /__admin/mappings/{guid}` --> Update a stub mapping
* `DELETE /__admin/mappings/{guid}` --> Delete a single stub mapping
* `POST   /__admin/mappings/save` --> Save all persistent stub mappings to the disk<br>
  (by default this is \bin\{x}\__admin\mappings_. Where {x} is the platform + build configuration)

## /admin/files
The files which can be used in the mappings.
* `HEAD   /__admin/files/{filename.ext}` --> Checks if the file named {filename.ext} does exist.
* `POST   /__admin/files/{filename.ext}` --> Creates a new file named {filename.ext} in the mappings folder on disk.
* `PUT    /__admin/files/{filename.ext}` --> Updates an existing file named {filename.ext} in the mappings folder on disk.
* `GET    /__admin/files/{filename.ext}` --> Get the content from the file named {filename.ext} in the mappings folder on disk.
* `DELETE /__admin/files/{filename.ext}` --> Deletes a new file named {filename.ext} from the mappings folder on disk.

## /__admin/requests
Logged requests and responses received by the mock service.
* `GET    /__admin/requests` --> Get received requests
* `DELETE /__admin/requests` or `POST /__admin/requests/reset` --> Delete all received requests
* `GET    /__admin/requests/{guid}` --> Get a single request
* `POST   /__admin/requests/count` --> TODO
* `POST   /__admin/requests/find` --> Find requests
* `GET    /__admin/requests/unmatched` --> TODO
* `GET    /__admin/requests/unmatched/near-misses` --> TODO

---

### `POST   /__admin/requests/find`
For example, this will return all requests that were performed to this specific path.
``` cmd
curl --location --request POST 'http://localhost:9999/__admin/requests/find' \
--header 'Content-Type: application/json' \
--data-raw '{
    "path": "/path/to/search/for"
}
```

***
For some **example requests**, see this [PostMan Collection](https://www.getpostman.com/collections/b69dcea7ec19473bff1e)
***

## /__admin/mappings
The mappings defined in the mock service.

### `GET    /__admin/mappings`
Gets all defined mappings.

Example request:
`GET http://localhost/__admin/mappings`

Example response:
```js
[
  {
    "Guid": "be6e1db8-cb95-4a15-a836-dcd0092b34a0",
    "Request": {
      "Path": {
        "Matchers": [
          {
            "Name": "WildcardMatcher",
            "Pattern": "/data"
          }
        ]
      },
      "Methods": [
        "get"
      ],
      "Headers": [
        {
          "Name": "Content-Type",
          "Matchers": [
            {
              "Name": "WildcardMatcher",
              "Pattern": "application/*"
            }
          ]
        }
      ],
      "Cookies": [],
      "Params": [
        {
          "Name": "start",
          "Values": [ "1000", "1001" ]
        }
      ],
      "Body": {}
    },
    "Response": {
      "StatusCode": 200,
      "Body": "{ \"result\": \"Contains x with FUNC 200\"}",
      "UseTransformer": false,
      "Headers": {
        "Content-Type": "application/json"
      }
    }
  },
  {
    "Guid": "90356dba-b36c-469a-a17e-669cd84f1f05",
    "Request": {
      "Path": {
        "Matchers": [
          {
            "Name": "WildcardMatcher",
            "Pattern": "/*"
          }
        ]
      },
      "Methods": [
        "get"
      ],
      "Headers": [],
      "Cookies": [],
      "Params": [
        {
          "Name": "start",
          "Values": []
        }
      ],
      "Body": {}
    },
    "Response": {
      "StatusCode": 200,
      "Body": "{\"msg\": \"Hello world, {{request.path}}\"",
      "UseTransformer": true,
      "Headers": {
        "Transformed-Postman-Token": "token is {{request.headers.Postman-Token}}",
        "Content-Type": "application/json"
      },
      "Delay": 10
    }
  }
]
```

### `POST   /__admin/mappings`
Create a new stub mapping

Example request:
```js
{
    "Guid": "dae02a0d-8a33-46ed-aab0-afbecc8643e3",
    "Request": {
      "Path": "/testabc",
      "Methods": [
        "put"
      ],
      "Headers": [
        {
          "Name": "Content-Type",
          "Matchers": [
            {
              "Name": "WildcardMatcher",
              "Pattern": "application/*"
            }
          ]
        }
      ],
      "Cookies": [],
      "Params": [
        {
          "Name": "start",
          "Values": [ "1000", "1001" ]
        }
      ],
       "Body": {
        "Matcher": {
          "Name": "JsonPathMatcher",
          "Pattern": "$.things[?(@.name == 'RequiredThing')]"
        }
      }
    },
    "Response": {
      "UseTransformer": true,
      "StatusCode": 205,
      "BodyAsJson": { "result": "test - {{request.path}}" },
      "Headers": {
        "Content-Type": "application/json", "a" : "b"
      },
      "Delay": 10
    }
  }
```

Create a new stub mapping and save this to disk. Example request:
```js
{
    "Guid": "dae02a0d-8a33-46ed-aab0-afbecc864344",
    "SaveToFile": true,
    "Title": "the_filename",
    "Request": {
      "Url": "/example",
      "Methods": [
        "get"
      ]
    },
    "Response": {
      "BodyAsJson": { "result": "ok" }
    }
  }
```

_Note_ : It's also possible to pre-load Mappings. This can be done by putting a file named `{guid}.json` in the `__admin\mapping` directory.

Example : `11111110-a633-40e8-a244-5cb80bc0ab66.json`
```json
{
    "Request": {
        "Path": {
            "Matchers": [
                {
                    "Name": "WildcardMatcher",
                    "Pattern": "/static/mapping"
                }
            ]
        },
        "Methods": [
            "get"
        ]
    },
    "Response": {
        "BodyAsJson": { "body": "static mapping" },
        "Headers": {
            "Content-Type": "application/json"
        }
    }
}
```

### `DELETE /__admin/mappings`
Delete all stub mappings. (If there is no request body).

### `DELETE /__admin/mappings`
Delete the stub mappings matched to the GUIDs in the request body.

Example request:
```js
{
    "Guid": "dae02a0d-8a33-46ed-aab0-afbecc8643e3",
    "Request": {
      "Url": "/testabc",
      "Methods": [
        "put"
      ]
    },
    "Response": {
      "Body": "Response Body",
      "Headers": {
        "Content-Type": "application/json"
      }
    }
}
```
The only truly necessary piece of the body json is the Guid.
So this is also valid syntax for the request (demonstrates multi-delete):
```js
[{
    "Guid": "dae02a0d-8a33-46ed-aab0-afbecc8643e3"
},
{
    "Guid": "c181c4f6-fe48-4712-8390-e1a4b358e278"
}]
```
The most obvious application of DELETE with request body will be the ability to send identical requests to the __admin/mappings endpoint using POST and DELETE interchangeably. Additionally, this provides a useful "multi-delete" feature.

### `GET    /__admin/mappings/{guid}`
Get a single stub mapping

### `PUT    /__admin/mappings/{guid}`
Update a single stub mapping

Example request
```js
{
  "Request": {
    "Path": {
      "Matchers": []
    },
    "Methods": [
      "get"
    ],
    "Headers": [],
    "Cookies": [],
    "Params": [
      {
        "Name": "start",
        "Values": []
      }
    ],
    "Body": {}
  },
  "Response": {
    "StatusCode": 205,
    "BodyAsJson": { "msg": "Hello world!!" },
    "BodyAsJsonIndented": true,
    "UseTransformer": true,
    "Headers": {
      "Transformed-Postman-Token": "token is {{request.headers.Postman-Token}}",
      "Content-Type": "application/json"
    }
  }
}
```

### `DELETE /__admin/mappings/{guid}`
Delete a single stub mapping.

### `POST /__admin/mappings/save`
Save all persistent stub mappings to the backing store

## /__admin/requests
Logged requests and responses received by the mock service.

### `GET /__admin/requests`
Get received requests

### `DELETE /__admin/requests`
Delete all received requests

### `GET /__admin/requests/{guid}`
Get a single request.


#### `POST /__admin/requests/count` --> TODO
#### `POST /__admin/requests/find`
Find requests based on a criteria.

Example request:
```js
{
  "Path": {
        "Matchers": [
          {
            "Name": "WildcardMatcher",
            "Pattern": "/testjson"
          }
        ]
      }
}
```


#### `GET /__admin/requests/unmatched` --> TODO
#### `GET /__admin/requests/unmatched/near-misses` --> TODO

{% endraw %}