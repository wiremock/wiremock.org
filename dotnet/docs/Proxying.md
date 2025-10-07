# Global Proxy
It's possible to start the WireMockk server in Proxy mode, this means that **all** requests are proxied to the real URL. And the mappings can be recorded and saved.

### Example
Setup a proxy to `samples.openweathermap.org`

``` c#
var settings = new WireMockServerSettings
{
    Urls = new[] { "https://localhost:9095/" },
    StartAdminInterface = true,
    ProxyAndRecordSettings = new ProxyAndRecordSettings
    {
        Url = "https://samples.openweathermap.org",
        SaveMapping = true,
        SaveMappingToFile = true,
        SaveMappingForStatusCodePattern = "2xx"
    }
};

var server = WireMockServer.Start(settings);
```

You can now call (via an httpclient or just in browser) this URL: `https://localhost:9095/data/2.5/find?q=London&units=metric&appid=b6907d289e10d714a6e88b30761fae22`

See also this page for more information on the [ProxyAndRecordSettings](https://github.com/WireMock-Net/WireMock.Net/wiki/Settings#proxyandrecordsettings)

# Proxy stub mappings
Proxy responses are defined in exactly the same manner as stubs, meaning that the same request matching criteria can be used.

The following code will proxy all GET requests made to http://<host>:<port>/other/service/.* to http://otherservice.com/approot, e.g. when running WireMock.NET locally a request to http://localhost:9000/other/service/doc/123 would be forwarded to http://otherservice.com/approot/other/service/doc/123.

``` c#
server
  .Given(
    Request.Create()
      .WithPath("/google")
  )
  .RespondWith(
    Response.Create()
      .WithProxy("http://www.google.com")
  );
```

The JSON equivalent would be:
``` js
{
    "Request": {
      "Path": {
        "Matchers": [
          {
            "Name": "WildcardMatcher",
            "Pattern": "/google"
          }
        ]
      },
      "Methods": [
        "get"
      ]
    },
    "Response": {
      "UseTransformer": false,
      "ProxyUrl": "http://www.google.com"
    }
}
```

## Proxy/intercept

The proxy/intercept pattern described above is achieved by adding a low priority proxy mapping with a broad URL match and any number of higher priority stub mappings e.g.

``` c#
// Low priority catch-all proxies to otherhost.com by default
server
  .Given(
    Request.Create()
      .WithPath("/*")
  )
  .AtPriority(10)
  .RespondWith(
    Response.Create()
      .WithProxy("http://otherhost.com")
  );

// High priority stub will send a Service Unavailable response if the specified URL is requested:
server
  .Given(
    Request.Create()
      .WithPath("/api/override/123")
  )
  .AtPriority(1)
  .RespondWith(
    Response.Create()
      .WithStatusCode(503)
      .WithBody("ERROR")
  );
```     

