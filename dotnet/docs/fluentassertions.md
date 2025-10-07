## FluentAssertions / AwesomeAssertions
With the NuGet Package [WireMock.Net.FluentAssertions](https://www.nuget.org/packages/WireMock.Net.FluentAssertions) / [WireMock.Net.AwesomeAssertions](https://www.nuget.org/packages/WireMock.Net.AwesomeAssertions), it's possible to verify if certain calls are made.

### Example
The example below checks if a specific call to an url is actually made by the HttpClient.

``` c#
[Fact]
public async Task AtUrl_WhenACallWasMadeToUrl_Should_BeOK()
{
  await _httpClient.GetAsync("anyurl").ConfigureAwait(false);

  _server.Should()
    .HaveReceivedACall()
    .AtUrl($"http://localhost:{_portUsed}/anyurl");
}
```
[snippet](https://github.com/WireMock-Net/WireMock.Net/blob/master/test/WireMock.Net.Tests/FluentAssertions/WireMockAssertionsTests.cs#L154)


## LogEntries
In addition to the Fluent Assertions interface, you can also get information about the calls being made to the WireMock.Net server.

### Example
Use the code below in a unit-test to check if the HttpClient actually did send these specific headers.

``` c#
var sentHeaders = _server.LogEntries.SelectMany(x => x.RequestMessage.Headers)
  .ToDictionary(x => x.Key, x => x.Value)["Accept"]
  .Select(x => $"\"{x}\"")
  .ToList();
```
[snippet](https://github.com/WireMock-Net/WireMock.Net/blob/b5ae087b95cae55ebe5e14bf23ccce60552e0a95/test/WireMock.Net.Tests/FluentAssertions/WireMockAssertionsTests.cs#L109)
