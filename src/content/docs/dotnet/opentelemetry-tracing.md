---
title: OpenTelemetry Tracing
---

WireMock.Net supports distributed tracing via `System.Diagnostics.Activity` and can export traces using OpenTelemetry.

## Activity Tracing

WireMock.Net creates `System.Diagnostics.Activity` objects for request tracing when `ActivityTracingOptions` is configured. This uses the built-in .NET distributed tracing infrastructure.

### Basic Configuration

``` c#
var settings = new WireMockServerSettings
{
    ActivityTracingOptions = new ActivityTracingOptions
    {
        ExcludeAdminRequests = true,
        RecordRequestBody = false,
        RecordResponseBody = false,
        RecordMatchDetails = true
    }
};

var server = WireMockServer.Start(settings);
```

### ActivityTracingOptions Properties

| Property | Description | Default |
|----------|-------------|---------|
| `ExcludeAdminRequests` | Exclude `/__admin/*` from tracing | `true` |
| `RecordRequestBody` | Include request body in trace attributes | `false` |
| `RecordResponseBody` | Include response body in trace attributes | `false` |
| `RecordMatchDetails` | Include mapping match details in trace attributes | `true` |

## OpenTelemetry Export

To export traces to an OpenTelemetry collector, install the `WireMock.Net.OpenTelemetry` package:

```bash
dotnet add package WireMock.Net.OpenTelemetry
```

### Using AdditionalServiceRegistration

``` c#
using WireMock.OpenTelemetry;
using WireMock.Server;
using WireMock.Settings;

var settings = new WireMockServerSettings
{
    ActivityTracingOptions = new ActivityTracingOptions
    {
        ExcludeAdminRequests = true,
        RecordMatchDetails = true
    },
    AdditionalServiceRegistration = services =>
    {
        services.AddWireMockOpenTelemetry(new OpenTelemetryOptions
        {
            ExcludeAdminRequests = true,
            OtlpExporterEndpoint = "http://localhost:4317"
        });
    }
};

var server = WireMockServer.Start(settings);
```

### Custom TracerProvider Configuration

``` c#
using OpenTelemetry;
using OpenTelemetry.Trace;
using WireMock.OpenTelemetry;

using var tracerProvider = Sdk.CreateTracerProviderBuilder()
    .AddWireMockInstrumentation(new OpenTelemetryOptions())
    .AddOtlpExporter(options =>
    {
        options.Endpoint = new Uri("http://localhost:4317");
    })
    .Build();
```

### OpenTelemetryOptions Properties

| Property | Description | Default |
|----------|-------------|---------|
| `ExcludeAdminRequests` | Exclude `/__admin/*` from ASP.NET Core instrumentation | `true` |
| `OtlpExporterEndpoint` | OTLP collector endpoint URL | Uses `OTEL_EXPORTER_OTLP_ENDPOINT` env var |

## Trace Attributes

WireMock traces include standard HTTP attributes and WireMock-specific attributes:

**HTTP attributes:**
- `http.request.method`
- `url.full`
- `url.path`
- `server.address`
- `http.response.status_code`
- `client.address`

**WireMock attributes:**
- `wiremock.mapping.matched` - Whether a mapping was found
- `wiremock.mapping.guid` - GUID of the matched mapping
- `wiremock.mapping.title` - Title of the matched mapping
- `wiremock.match.score` - Match score
- `wiremock.request.guid` - GUID of the request

## CLI Arguments

When using WireMock.Net.StandAlone or Docker, configure tracing via command-line arguments:

**Activity Tracing:**
```bash
--ActivityTracingEnabled true
--ActivityTracingExcludeAdminRequests true
--ActivityTracingRecordRequestBody false
--ActivityTracingRecordResponseBody false
--ActivityTracingRecordMatchDetails true
```

**OpenTelemetry Export:**
```bash
--OpenTelemetryEnabled true
--OpenTelemetryOtlpExporterEndpoint http://localhost:4317
--OpenTelemetryExcludeAdminRequests true
```
