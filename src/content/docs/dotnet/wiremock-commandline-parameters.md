---
title: Wiremock Commandline Parameters
---

The following commandline arguments can be defined for:
- [[WireMock as dotnet tool]]
- [[WireMock as a standalone process]]
- [WireMock.Net running as Docker](https://github.com/WireMock-Net/WireMock.Net-docker)


### Settings
| Argument Name| Value Type | Default | Description |
| - | - | - | - |
| `--Help` | | | Show a link to this wiki-page
| `--Port` | integer | | [wiki-port](https://wiremock.org/docs/dotnet/settings#port)
| `--Urls` | string| | [wiki-urls](https://wiremock.org/docs/dotnet/settings#urls)
| `--StartAdminInterface` | boolean | true | Defines whether to start admin interface. |
| `--AllowPartialMapping` | boolean  | false | [wiki-allowpartialmapping](https://wiremock.org/docs/dotnet/settings#allowpartialmapping)  |
| `--ReadStaticMappings` | boolean | false | Defines if the static mappings should be read at startup. |
| `--AdminUsername` | string | | [wiki-adminusername](https://wiremock.org/docs/dotnet/settings#adminusername) |
| `--AdminPassword` | string | | [wiki-adminpassword](https://wiremock.org/docs/dotnet/settings#adminpassword) |
| `--MaxRequestLogCount` | integer | | [wiki-maxrequestlogcount](https://wiremock.org/docs/dotnet/settings#maxrequestlogcount)
| `--RequestLogExpirationDuration` | integer | | [wiki-requestlogexpirationduration](https://wiremock.org/docs/dotnet/settings#requestlogexpirationduration) |
| `--WireMockLogger` | string | [WireMockNullLogger](https://github.com/WireMock-Net/WireMock.Net/blob/master/src/WireMock.Net/Logging/WireMockNullLogger.cs) | You can also define the value `WireMockConsoleLogger`. In that case the [WireMockConsoleLogger](https://github.com/WireMock-Net/WireMock.Net/blob/master/src/WireMock.Net/Logging/WireMockConsoleLogger.cs) is used. |
| `--ProxyURL` | string | | [wiki-proxyandrecordsettings](https://wiremock.org/docs/dotnet/settings#proxyandrecordsettings) |
| `--X509StoreName`<br>`--X509StoreLocation`<br>`--X509StoreThumbprintOrSubjectName`<br>`--X509CertificateFilePath`<br>`--X509CertificatePassword` | string<br>string<br>string<br>string<br>string || [wiki-certificatesettings](https://wiremock.org/docs/dotnet/settings#certificatesettings)

### Proxy Settings [Optional]
See also [Proxy and Record Settings](https://wiremock.org/docs/dotnet/settings#proxyandrecordsettings) for a complete list.

| Argument Name| Value Type | Default | Description |
| - | - | - | - |
| `--ProxyUrl` | string | | The URL to use for proxying.
| `--SaveMapping` | boolean| | Save the mapping for each request/response to the internal Mappings..

### Activity Tracing Settings [Optional]
| Argument Name| Value Type | Default | Description |
| - | - | - | - |
| `--ActivityTracingEnabled` | boolean | false | Enable activity tracing for requests. |
| `--ActivityTracingExcludeAdminRequests` | boolean | true | Exclude `/__admin/*` requests from tracing. |
| `--ActivityTracingRecordRequestBody` | boolean | false | Include request body in trace attributes. |
| `--ActivityTracingRecordResponseBody` | boolean | false | Include response body in trace attributes. |
| `--ActivityTracingRecordMatchDetails` | boolean | true | Include mapping match details in trace attributes. |

### OpenTelemetry Settings [Optional]
| Argument Name| Value Type | Default | Description |
| - | - | - | - |
| `--OpenTelemetryEnabled` | boolean | false | Enable OpenTelemetry export. |
| `--OpenTelemetryOtlpExporterEndpoint` | string | | OTLP collector endpoint URL. Uses `OTEL_EXPORTER_OTLP_ENDPOINT` env var if not set. |
| `--OpenTelemetryExcludeAdminRequests` | boolean | true | Exclude `/__admin/*` from ASP.NET Core instrumentation. |