---
title: Wiremock Commandline Parameters
---

The following commandline arguments can be defined for:
- [WireMock as dotnet tool](https://wiremock.org/docs/dotnet/wiremock-as-dotnet-tool/)
- [WireMock as a standalone process](https://wiremock.org/docs/dotnet/wiremock-as-a-standalone-process/)
- [WireMock.Net running as Docker](https://github.com/WireMock-Net/WireMock.Net-docker)


### Settings
| Argument Name| Value Type | Default | Description |
| - | - | - | - |
| `--Help` | | | Show a link to this page. |
| `--Port` | integer | | [settings-port](https://wiremock.org/docs/dotnet/settings#port) |
| `--Urls` | string | `http://*:9091/` | [settings-urls](https://wiremock.org/docs/dotnet/settings#urls). Used when `--Port` is not set and no `--HostingScheme` is defined. |
| `--StartAdminInterface` | boolean | true | Defines whether to start admin interface. |
| `--AdminPath` | string | `/__admin` | [settings-adminpath](https://wiremock.org/docs/dotnet/settings#adminpath) |
| `--AdminUsername` | string | | [settings-adminusername](https://wiremock.org/docs/dotnet/settings#adminusername) |
| `--AdminPassword` | string | | [settings-adminpassword](https://wiremock.org/docs/dotnet/settings#adminpassword) |
| `--AdminAzureADTenant` | string | | [settings-adminazureadtenant](https://wiremock.org/docs/dotnet/settings#adminazureadtenant) |
| `--AdminAzureADAudience` | string | | [settings-adminazureadaudience](https://wiremock.org/docs/dotnet/settings#adminazureadaudience) |
| `--AllowPartialMapping` | boolean | false | [settings-allowpartialmapping](https://wiremock.org/docs/dotnet/settings#allowpartialmapping) |
| `--AllowBodyForAllHttpMethods` | boolean | false | [settings-allowbodyforallhttpmethods](https://wiremock.org/docs/dotnet/settings#allowbodyforallhttpmethods) |
| `--AllowCSharpCodeMatcher` | boolean | false | [settings-allowcsharpcodematcher](https://wiremock.org/docs/dotnet/settings#allowcsharpcodematcher) |
| `--AllowOnlyDefinedHttpStatusCodeInResponse` | boolean | false | [settings-allowonlydefinedhttpstatuscodeinresponse](https://wiremock.org/docs/dotnet/settings#allowonlydefinedhttpstatuscodeinresponse) |
| `--ReadStaticMappings` | boolean | false | Defines if the static mappings should be read at startup. |
| `--WatchStaticMappings` | boolean | false | [settings-watchstaticmappings](https://wiremock.org/docs/dotnet/settings#watchstaticmappings) |
| `--WatchStaticMappingsInSubdirectories` | boolean | false | [settings-watchstaticmappingsinsubdirectories](https://wiremock.org/docs/dotnet/settings#watchstaticmappingsinsubdirectories) |
| `--DisableJsonBodyParsing` | boolean | false | [settings-disablejsonbodyparsing](https://wiremock.org/docs/dotnet/settings#disablejsonbodyparsing) |
| `--DisableRequestBodyDecompressing` | boolean | false | [settings-disablerequestbodydecompressing](https://wiremock.org/docs/dotnet/settings#disablerequestbodydecompressing) |
| `--DisableDeserializeFormUrlEncoded` | boolean | false | [settings-disabledeserializeformurlencoded](https://wiremock.org/docs/dotnet/settings#disabledeserializeformurlencoded) |
| `--HandleRequestsSynchronously` | boolean | false | [settings-handlerequestssynchronously](https://wiremock.org/docs/dotnet/settings#handlerequestssynchronously) |
| `--DoNotSaveDynamicResponseInLogEntry` | boolean | false | [settings-donotsavedynamicresponseinlogentry](https://wiremock.org/docs/dotnet/settings#donotsavedynamicresponseinlogentry) |
| `--SaveUnmatchedRequests` | boolean | false | [settings-saveunmatchedrequests](https://wiremock.org/docs/dotnet/settings#saveunmatchedrequests) |
| `--MaxRequestLogCount` | integer | | [settings-maxrequestlogcount](https://wiremock.org/docs/dotnet/settings#maxrequestlogcount) |
| `--RequestLogExpirationDuration` | integer | | [settings-requestlogexpirationduration](https://wiremock.org/docs/dotnet/settings#requestlogexpirationduration) |
| `--StartTimeout` | integer | 10000 | [settings-starttimeout](https://wiremock.org/docs/dotnet/settings#starttimeout) |
| `--HostingScheme` | enum | | [settings-hostingscheme](https://wiremock.org/docs/dotnet/settings#hostingscheme) |
| `--UseHttp2` | boolean | false | [settings-usehttp2](https://wiremock.org/docs/dotnet/settings#usehttp2) |
| `--UseRegexExtended` | boolean | true | [settings-useregexextended](https://wiremock.org/docs/dotnet/settings#useregexextended) |
| `--QueryParameterMultipleValueSupport` | enum | All | [settings-queryparametermultiplevaluesupport](https://wiremock.org/docs/dotnet/settings#queryparametermultiplevaluesupport) |
| `--Culture` | string | CurrentCulture | [settings-culture](https://wiremock.org/docs/dotnet/settings#culture) |
| `--ProtoDefinitions` | json | | [settings-protodefinitions](https://wiremock.org/docs/dotnet/settings#protodefinitions) |
| `--GraphQLSchemas` | json | | [settings-graphqlschemas](https://wiremock.org/docs/dotnet/settings#graphqlschemas) |
| `--WireMockLogger` | string | `WireMockNullLogger` | You can also define `WireMockConsoleLogger`. |
| `--X509StoreName`<br>`--X509StoreLocation`<br>`--X509StoreThumbprintOrSubjectName`<br>`--X509CertificateFilePath`<br>`--X509CertificatePassword` | string<br>string<br>string<br>string<br>string | | [settings-certificatesettings](https://wiremock.org/docs/dotnet/settings#certificatesettings) |
| `--CorsPolicyOptions` | enum | None | [settings-corspolicyoptions](https://wiremock.org/docs/dotnet/settings#corspolicyoptions) |
| `--ClientCertificateMode` | enum | NoCertificate | [settings-clientcertificatemode](https://wiremock.org/docs/dotnet/settings#clientcertificatemode) |
| `--AcceptAnyClientCertificate` | boolean | false | [settings-acceptanyclientcertificate](https://wiremock.org/docs/dotnet/settings#acceptanyclientcertificate) |

### Proxy Settings [Optional]
See also [Proxy and Record Settings](https://wiremock.org/docs/dotnet/settings#proxyandrecordsettings) for a complete list.

| Argument Name| Value Type | Default | Description |
| - | - | - | - |
| `--ProxyURL` / `--ProxyUrl` | string | | The URL to use for proxying. |
| `--SaveMapping` | boolean | false | Save the mapping for each request/response to internal mappings. |
| `--SaveMappingToFile` | boolean | false | Save generated mappings to file. |
| `--SaveMappingForStatusCodePattern` | string | `*` | Save mapping filter by status code pattern. |
| `--UseDefinedRequestMatchers` | boolean | false | Use defined request matchers for generated mappings. |
| `--AppendGuidToSavedMappingFile` | boolean | false | Append a GUID to saved mapping filename. |
| `--PrefixForSavedMappingFile` | string | `mapping` | Prefix for saved mapping filename. |
| `--AllowAutoRedirect` | boolean | false | Proxy requests should follow redirects. |
| `--ClientX509Certificate2ThumbprintOrSubjectName` | string | | Client certificate thumbprint or subject name. |
| `--ExcludedHeaders` | string[] | | Headers to exclude in recorded mappings. |
| `--ExcludedCookies` | string[] | | Cookies to exclude in recorded mappings. |
| `--PreferProxyMapping` | boolean | false | Prefer proxy mapping when applicable. |
| `--ProxyAll` | boolean | false | Proxy all requests. |
| `--WebProxyAddress` | string | | Upstream web proxy address. |
| `--WebProxyUserName` | string | | Upstream web proxy user name. |
| `--WebProxyPassword` | string | | Upstream web proxy password. |
| `--ProxyUrlReplaceOldValue` | string | | Proxy URL replace old value. |
| `--ProxyUrlReplaceNewValue` | string | | Proxy URL replace new value. |
| `--ProxyUrlReplaceIgnoreCase` | boolean | false | Case-insensitive URL replace. |
| `--ProxyUrlReplaceTransformTemplate` | string | | URL transform template. |
| `--ProxyUrlReplaceTransformerType` | enum | Handlebars | Transformer type for URL transform template. |

### Handlebars Settings [Optional]
| Argument Name| Value Type | Default | Description |
| - | - | - | - |
| `--AllowedCustomHandlebarsHelpers` | enum | None | Allowed custom Handlebars helpers. |
| `--AllowedHandlebarsHelpers` | enum[] | defaults | Allowed built-in Handlebars helpers. |

### Activity Tracing Settings [Optional]
| Argument Name| Value Type | Default | Description |
| - | - | - | - |
| `--ActivityTracingEnabled` | boolean | false | Enable activity tracing for requests. |
| `--ActivityTracingOptions__Enabled` | boolean | false | Alternative key to enable activity tracing. |
| `--ActivityTracingExcludeAdminRequests` | boolean | true | Exclude `/__admin/*` requests from tracing. |
| `--ActivityTracingOptions__ExcludeAdminRequests` | boolean | true | Alternative key for excluding admin requests. |
| `--ActivityTracingRecordRequestBody` | boolean | false | Include request body in trace attributes. |
| `--ActivityTracingOptions__RecordRequestBody` | boolean | false | Alternative key for request body recording. |
| `--ActivityTracingRecordResponseBody` | boolean | false | Include response body in trace attributes. |
| `--ActivityTracingOptions__RecordResponseBody` | boolean | false | Alternative key for response body recording. |
| `--ActivityTracingRecordMatchDetails` | boolean | true | Include mapping match details in trace attributes. |
| `--ActivityTracingOptions__RecordMatchDetails` | boolean | true | Alternative key for mapping match detail recording. |

### WebSocket Settings [Optional]
| Argument Name| Value Type | Default | Description |
| - | - | - | - |
| `--WebSocketSettings.MaxConnections` | integer | 100 | Maximum number of WebSocket connections. |
| `--WebSocketSettings.KeepAliveIntervalSeconds` | integer | implementation default | WebSocket keep-alive interval in seconds. |