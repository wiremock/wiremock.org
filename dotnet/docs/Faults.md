# Faults
WireMock.Net has some limited support for simulating random faults / corrupted responses.

## Fault types
These faults are currently supported
- EMPTY_RESPONSE: Return a completely empty response.
- MALFORMED_RESPONSE_CHUNK: Send an OK status header, then garbage, then close the connection.

## Percentage
It's also possible to define a percentage (value between 0 and 1) when this fault should occur.

# Examples

## C# Example
``` c#
var server = WireMockServer.Start();

server
    .Given(Request.Create().WithPath("/fault").UsingGet())
    .RespondWith(Response.Create()
        .WithStatusCode(201)
        .WithHeader("Content-Type", "application/json")
        .WithBody(@"{ ""result"": 100 }")
        .WithFault(FaultType.MALFORMED_RESPONSE_CHUNK, 0.5));
```

## JSON Mapping Admin interface
``` js
{
    "Guid": "a51b78ac-1300-4125-aa97-d48953deef77",
    "Request": {
        "Path": {
            "Matchers": [
                {
                    "Name": "WildcardMatcher",
                    "Pattern": "/fault"
                }
            ]
        }
    },
    "Response": {
        "StatusCode": 201,
        "BodyAsJson": {
            "result": 100
        },
        "Fault": { "Type": "MALFORMED_RESPONSE_CHUNK", "Percentage": 0.5},
        "Headers": {
            "Content-Type": "application/json"
        }
    }
}
```