# Issue
When calling WireMock.Net Server from a frontend applicatie (React / Angular), a CORS error is returned:

```
Cross-Origin Request Blocked: 
The Same Origin Policy disallows reading the remote resource at http://localhost:9091/__admin/mappings.
(Reason: CORS header ‘Access-Control-Allow-Origin’ missing). Status code: 200.
```

# Solution
Cors support is not enabled by default, you can enable it when configuring WireMock.Net Server.


## Option 1

``` c#
var settings = new WireMockServerSettings
{
   CorsPolicyOptions = CorsPolicyOptions.AllowAll
};

Note that these options are only available when running in .NET Core (3.1, 5.0 or higher)

## Option 2
Configure it manually:

``` c#
var settings = new WireMockServerSettings
{
   // Other settings
};

/* Enable Cors */
var policyName = "MyPolicy";
settings.AdditionalServiceRegistration = services =>
{
    services.AddCors(corsOptions =>
        corsOptions.AddPolicy(policyName, // ◀️ MyPolicy
            corsPolicyBuilder =>
            {
                corsPolicyBuilder
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowAnyOrigin();
            }));

    settings.Logger.Debug("Enable Cors");
};

/* Use Cors */
settings.PreWireMockMiddlewareInit = app =>
{
    var appBuilder = (IApplicationBuilder)app;
    appBuilder.UseCors(policyName); // ◀️ MyPolicy

    settings.Logger.Debug("Use Cors");
};

// Start Server
var server = WireMockServer.Start(settings);
```

See also [WireMock.Net.StandAlone.NETCoreApp/Program.cs](https://github.com/WireMock-Net/WireMock.Net/blob/master/examples/WireMock.Net.StandAlone.NETCoreApp/Program.cs#L39).


# :books: References
- https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSMissingAllowOrigin
- https://stackoverflow.com/questions/31942037/how-to-enable-cors-in-asp-net-core