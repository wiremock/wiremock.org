# Pact(flow)

**Pactflow.** Contract testing for teams.
Make the most of your contract testing initiative. Now you can run, maintain and fix integration issues with more ease than ever before. Pactflow is compatible with the Pact consumer driven contract testing framework and now also supports you to put your favourite tools to work with our Bi-Directional Contract Testing feature.

https://pactflow.io/

## WireMock.Net support
WireMock.Net has some support for Pact:

### Save the existing mappings to a Pact V2 json file:

``` c#
var server = WireMockServer.Start();
server
  .WithConsumer("Something API Consumer Get")
  .WithProvider("Something API")

  .Given(Request.Create()
    .UsingGet()
    .WithPath("/tester")
    .WithParam("q1", "test")
    .WithParam("q2", "ok")
    .WithHeader("Accept", "application/json")
  )
  .WithTitle("A GET request to retrieve the something")
  .RespondWith(
    Response.Create()
      .WithStatusCode(HttpStatusCode.OK)
      .WithHeader("Content-Type", "application/json; charset=utf-8")
      .WithBodyAsJson(new
      {
        Id = "tester",
        FirstName = "Totally",
        LastName = "Awesome"
      })
  );

server.SavePact(Path.Combine("../../../", "Pact", "files"), "pact-get.json");
```

Will produce this Pact Json file:
``` json
{
  "Consumer": {
    "Name": "Something API Consumer Get"
  },
  "Interactions": [
    {
      "ProviderState": "A GET request to retrieve the something",
      "Request": {
        "Headers": {
          "Accept": "application/json"
        },
        "Method": "GET",
        "Path": "/tester",
        "Query": "q1=test&q2=ok"
      },
      "Response": {
        "Body": {
          "Id": "tester",
          "FirstName": "Totally",
          "LastName": "Awesome"
        },
        "Headers": {
          "Content-Type": "application/json; charset=utf-8"
        },
        "Status": 200
      }
    }
  ],
  "Provider": {
    "Name": "Something API"
  }
}
```

## Examples
- https://github.com/StefH/PactExample