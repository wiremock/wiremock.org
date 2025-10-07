# Stubbing
The core feature of WireMock is the ability to return predefined HTTP responses for requests matching criteria.

## Start a server
First thing first, to start a server it is as easy as calling a static method, and your done!
```csharp
var server = WireMockServer.Start();
```
You can pass as an argument a port number but if you do not an available port will be chosen for you. Hence the above line of code start a server bounded to localhost a random port.
To know on which port your server is listening, just use server property *Port*.

## Basic stubbing
The following code will configure a response with a status of 200 to be returned when the relative URL exactly matches /some/thing (including query parameters). The body of the response will be “Hello world!” and a Content-Type header will be sent with a value of text-plain.

### C# example
```csharp
var server = WireMockServer.Start();

server
  .Given(
    Request.Create().WithPath("/some/thing").UsingGet()
  )
  .RespondWith(
    Response.Create()
      .WithStatusCode(200)
      .WithHeader("Content-Type", "text/plain")
      .WithBody("Hello world!")
  );
```
HTTP methods currently supported are: GET, POST, PUT, DELETE, HEAD. You can specify ANY (`.UsingAny`) if you want the stub mapping to match on any request method.

### Json Mapping example
The same mapping as above, expressed in a json mapping:

``` json
{
    "Request": {
        "Path": {
            "Matchers": [
                {
                    "Name": "WildcardMatcher",
                    "Pattern": "/some/thing"
                }
            ]
        },
        "Methods": [
            "get"
        ]
    },
    "Response": {
        "StatusCode": 200,
        "Body": "Hello world!",
        "Headers": {
            "Content-Type": "text/plain"
        }
    }
}
```

More details on the json mapping API can be found here : [Admin-API-Reference](https://github.com/WireMock-Net/WireMock.Net/wiki/Admin-API-Reference).

### C# Example for a body with bytes

A response body in binary format can also be specified as a `byte[]` via an overloaded `WithBody()`:

```csharp
var server = WireMockServer.Start();
server
  .Given(
    Request.Create().WithPath("/some/thing").UsingGet()
  )
  .RespondWith(
    Response.Create()
      .WithBody(new byte[] { 48, 65, 6c, 6c, 6f })
  );
```

---

## Stub priority
It is sometimes the case that you’ll want to declare two or more stub mappings that "overlap", in that a given request would be a match for more than one of them.

One example of this might be where you want to define a catch-all stub for any URL that doesn’t match any more specific cases. Adding a priority to a stub mapping facilitates this:

```csharp
var server = WireMockServer.Start();

// Catch-all case
server
  .Given(Request.Create().WithPath("/api/*"))
  .AtPriority(100)
  .RespondWith(Responses.Create().WithStatusCode(401));

// Specific case
server
  .Given(Request.Create().WithPath("/api/specific-resource"))
  .AtPriority(1)
  .RespondWith(Responses.Create().WithStatusCode(200));
```

:notes:
- A lower value for the priority means a higher priority.

---

## Verify interactions
The server keeps a log of the received requests. You can use this log to verify the interactions that have been done with the server during a test.  
To get all the request received by the server, you just need to read property *LogEntries*:
```csharp
var logEntries = server.LogEntries;
```
If you need to be more specific on the requests that have been send to the server, you can use the very same fluent API that allows to define routes:
```csharp
var customerReadRequests = server.FindLogEntries(
    Request.Create().WithPath("/api/customer*").UsingGet()
); 
```

---

## Simulating delays
A server can be configured with a global delay that will be applied to all requests. To do so you need to call method WireMockServer.AddRequestProcessingDelay() as below:
```csharp
var server = WireMockServer.Start();

// add a delay of 30 seconds for all requests
server.AddRequestProcessingDelay(TimeSpan.FromSeconds(30));
```

Delays can also be configured at route level:
```csharp
var server = WireMockServer.Start();
server
  .Given(Request.Create().WithPath("/slow"))
  .RespondWith(
    Responses.Create()
      .WithStatusCode(200)
      .WithBody(@"{ ""msg"": ""Hello I'm a little bit slow!"" }")
      .WithDelay(TimeSpan.FromSeconds(10)
    )
  );
```

---

## Reset
The WireMock server can be reset at any time, removing all stub mappings and deleting the request log. If you’re using either of the UnitTest rules this will happen automatically at the start of every test case. However you can do it yourself via a call to `server.Reset()`.

## Getting all currently registered stub mappings
All stub mappings can be fetched in C# by calling `server.Mappings` or `server.MappingModels`.