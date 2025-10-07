# WireMock with your favorite UnitTest framework
Obviously you can use your favorite test framework and use WireMock.Net within your tests. In order to avoid flaky tests you should:
  - let WireMock.Net choose ports dynamically. Avoid hard coded ports in your tests. This can cause issues when running these unit-tests on a build-server, there is not 100% guarantee that this port will be free on the OS.
  - clean up the request log or shutdown the server at the end of each test

Below a simple example using Nunit and NFluent test assertion library:
```cs
[SetUp]
public void StartMockServer()
{
    _server = WireMockServer.Start();
}

[Test]
public async Task Should_respond_to_request()
{
  // Arrange (start WireMock.Net server)
  _server
    .Given(Request.Create().WithPath("/foo").UsingGet())
    .RespondWith(
      Response.Create()
        .WithStatusCode(200)
        .WithBody(@"{ ""msg"": ""Hello world!"" }")
    );

  // Act (use a HttpClient which connects to the URL where WireMock.Net is running)
  var response = await new HttpClient().GetAsync($"{_server.Urls[0]}/foo");
    
  // Assert
  Check.That(response).IsEqualTo(EXPECTED_RESULT);
}

[TearDown]
public void ShutdownServer()
{
    _server.Stop();
}
```

For some more examples: see https://github.com/bredah/csharp-wiremock