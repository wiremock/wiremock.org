---
title: WireMock.Net Admin API Reference
---

# Admin API Reference
The **WireMock admin API** provides functionality to define the mappings via a http/https interface. To use this interface, you need to enable the admin interface in code:
```c#
var server = WireMockServer.StartWithAdminInterface();
```



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
* `PUT    /__admin/settings` --> Updates the current global settings

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
* `PUT    /__admin/mappings/{guid}/enable` --> Enable a single stub mapping
* `PUT    /__admin/mappings/{guid}/disable` --> Disable a single stub mapping
* `GET    /__admin/mappings/code` --> Get all mappings as C# code
* `GET    /__admin/mappings/code/{guid}` --> Get a single mapping as C# code
* `GET    /__admin/mappings/swagger` --> Get mappings as Swagger definition
* `POST   /__admin/mappings/save` --> Save all persistent stub mappings to the disk  (by default this is \bin\{x}\__admin\mappings_. Where {x} is the platform + build configuration)
* `POST   /__admin/mappings/reloadStaticMappings` --> Reload static mappings from disk

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
* `DELETE /__admin/requests/{guid}` --> Delete a single request
* `POST   /__admin/requests/find` --> Find requests
* `GET    /__admin/requests/find?mappingGuid={guid}` --> Find requests by mapping GUID

## /__admin/scenarios
Scenario state endpoints.
* `GET    /__admin/scenarios` --> Get all scenarios and states
* `DELETE /__admin/scenarios` or `POST /__admin/scenarios/reset` --> Reset all scenarios
* `DELETE /__admin/scenarios/{scenario}` or `POST /__admin/scenarios/{scenario}/reset` --> Reset a single scenario
* `PUT    /__admin/scenarios/{scenario}/state` --> Set scenario state

## /__admin/openapi
OpenAPI conversion endpoints.
* `POST   /__admin/openapi/convert` --> Convert OpenAPI definition to mappings
* `POST   /__admin/openapi/save` --> Convert OpenAPI definition and save mappings

## /__admin/protodefinitions
Proto definition endpoints.
* `POST   /__admin/protodefinitions/{id}` --> Add/update a proto definition by id

