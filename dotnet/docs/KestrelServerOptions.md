# Overriding KestrelServerOptions

## Default WireMock.Net KestrelServerOptions
These are [all available Kestrel server options](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.server.kestrel.core.kestrelserveroptions?view=aspnetcore-3.1) and you can read here [all available Kestrel server options limits and their default values](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.server.kestrel.core.kestrelserveroptions.limits?view=aspnetcore-3.1#Microsoft_AspNetCore_Server_Kestrel_Core_KestrelServerOptions_Limits).

WireMock.Net overrides some of those Kestrel server options limits, i.e.

- `KestrelServerOptions.Limits.MaxRequestBodySize`: unlimited.
- `KestrelServerOptions.Limits.MaxRequestBufferSize`: unlimited.

You can check the variables that WireMock.Net overrides by default [here for .NET Standard 1.3](https://github.com/WireMock-Net/WireMock.Net/blob/master/src/WireMock.Net/Owin/AspNetCoreSelfHost.NETStandard13.cs) and [here for .NET Standard > 1.3](https://github.com/WireMock-Net/WireMock.Net/blob/master/src/WireMock.Net/Owin/AspNetCoreSelfHost.NETStandard.cs).

## Overriding Kestrel server options yourself
WireMock.Net also allows you to override those Kestrel server options and limits.

`KestrelServerOptions` can generally be overridden using a configuration provider, which expects them to follow the following structure:

```json
{
  "Kestrel": {
    "Limits": {
      "MaxRequestBodySize": 30000000,
      "MaxRequestHeadersTotalSize": 32768
    },
    "DisableStringReuse": true
  }
}
```

The recommended, multi-platform way of defining nested environment variables is using `__`.

Examples:

- You can override `KestrelServerOptions.Limits.MaxRequestHeadersTotalSize` by setting `Kestrel__Limits__MaxRequestHeadersTotalSize` environment variable to 65536.
- You can override `KestrelServerLimits.Http2.MaxRequestHeaderFieldSize` by setting `Kestrel__Limits__Http2__MaxRequestHeaderFieldSize` environment variable to 16384.

Please bear in mind that:

- Environment variable values take precedence over WireMock default overrides.
- You can only override WireMock Kestrel options using environment variables, not configuration files.

You can find more information about Kestrel options and their configuration [here](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel?view=aspnetcore-3.1#kestrel-options).
