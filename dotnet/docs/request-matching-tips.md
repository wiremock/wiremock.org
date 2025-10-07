# Request is not matched
In case you get a `404` back, but you expect a valid match-response on your request, use the the following tips.

## Get the request via the admin interface
Do a GET call to [http://{{wm_hostname}}/__admin/requests](https://github.com/WireMock-Net/WireMock.Net/wiki/Admin-API-Reference#__adminrequests) to get information about the request you just sent.

The example below shows:
- The request is not matched and a `404` with "No matching mapping found" is returned
- The `PartialMappingGuid`, `PartialMappingTitle` show information about the best mapping found
- The `PartialRequestMatchResult` shows some details about all matching element. In this case the **PathMatcher** returns `0.0`, so this means that something is wrong with the matching on the Path.

``` js
    "Response": {
      "StatusCode": 404,
      "Headers": {
        "Content-Type": [
          "application/json"
        ]
      },
      "BodyAsJson": {
        "Status": "No matching mapping found"
      },
      "DetectedBodyType": 2,
      "DetectedBodyTypeFromContentType": 0
    },
    "PartialMappingGuid": "bb4c0d1d-ef2e-4cd2-966a-850b8f1a2829",
    "PartialMappingTitle": "Fetch_User_By_Id_66",
    "PartialRequestMatchResult": {
      "TotalScore": 2.0,
      "TotalNumber": 3,
      "IsPerfectMatch": false,
      "AverageTotalScore": 0.66666666666666663,
      "MatchDetails": [
        {
          "Name": "PathMatcher",
          "Score": 0.0
        },
        {
          "Name": "MethodMatcher",
          "Score": 1.0
        },
        {
          "Name": "BodyMatcher",
          "Score": 1.0
        }
      ]
    }
```

## Get information via the logging
When you run WireMock.Net as standalone console application and logging is enabled, you see the same logging in the console.

## Get information via C# code
``` c#
var server = WireMockServer.Start();
var logEntries = server.LogEntries;
```
