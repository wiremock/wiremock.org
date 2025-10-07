The following commandline arguments can be defined for:
- [[WireMock as dotnet tool]]
- [[WireMock as a standalone process]]
- [WireMock.Net running as Docker](https://github.com/WireMock-Net/WireMock.Net-docker)

<br>

### Settings
| Argument Name| Value Type | Default | Description |
| - | - | - | - |
| `--Help` | | | Show a link to this wiki-page
| `--Port` | integer | | [wiki-port](https://github.com/WireMock-Net/WireMock.Net/wiki/Settings#port)
| `--Urls` | string| | [wiki-urls](https://github.com/WireMock-Net/WireMock.Net/wiki/Settings#urls)
| `--StartAdminInterface` | boolean | true | Defines whether to start admin interface. |
| `--AllowPartialMapping` | boolean  | false | [wiki-allowpartialmapping](https://github.com/WireMock-Net/WireMock.Net/wiki/Settings#allowpartialmapping)  |
| `--ReadStaticMappings` | boolean | false | Defines if the static mappings should be read at startup. |
| `--AdminUsername` | string | | [wiki-adminusername](https://github.com/WireMock-Net/WireMock.Net/wiki/Settings#adminusername) |
| `--AdminPassword` | string | | [wiki-adminpassword](https://github.com/WireMock-Net/WireMock.Net/wiki/Settings#adminpassword) |
| `--MaxRequestLogCount` | integer | | [wiki-maxrequestlogcount](https://github.com/WireMock-Net/WireMock.Net/wiki/Settings#maxrequestlogcount)
| `--RequestLogExpirationDuration` | integer | | [wiki-requestlogexpirationduration](https://github.com/WireMock-Net/WireMock.Net/wiki/Settings#requestlogexpirationduration) |
| `--WireMockLogger` | string | [WireMockNullLogger](https://github.com/WireMock-Net/WireMock.Net/blob/master/src/WireMock.Net/Logging/WireMockNullLogger.cs) | You can also define the value `WireMockConsoleLogger`. In that case the [WireMockConsoleLogger](https://github.com/WireMock-Net/WireMock.Net/blob/master/src/WireMock.Net/Logging/WireMockConsoleLogger.cs) is used. |
| `--ProxyURL` | string | | [wiki-proxyandrecordsettings](https://github.com/WireMock-Net/WireMock.Net/wiki/Settings#proxyandrecordsettings) |
| `--X509StoreName`<br>`--X509StoreLocation`<br>`--X509StoreThumbprintOrSubjectName`<br>`--X509CertificateFilePath`<br>`--X509CertificatePassword` | string<br>string<br>string<br>string<br>string || [wiki-certificatesettings](https://github.com/WireMock-Net/WireMock.Net/wiki/Settings#certificatesettings)

### Proxy Settings [Optional]
See also [Proxy and Record Settings](https://github.com/WireMock-Net/WireMock.Net/wiki/Settings#proxyandrecordsettings) for a complete list.

| Argument Name| Value Type | Default | Description |
| - | - | - | - |
| `--ProxyUrl` | string | | The URL to use for proxying.
| `--SaveMapping` | boolean| | Save the mapping for each request/response to the internal Mappings..