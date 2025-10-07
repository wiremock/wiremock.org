# WireMockServerSettings
The interface [WireMockServerSettings.cs](https://github.com/WireMock-Net/WireMock.Net/blob/master/src/WireMock.Net/Settings/WireMockServerSettings.cs) defines the configuration from the WireMock.Net server.

### Port
The port to listen on.

### UseSSL
Use SSL.

### StartAdminInterface
Defines to if the admin interface should be started.

### ReadStaticMappings
Defines if the static mappings should be read at startup.

### WatchStaticMappings 
Watch the static mapping files + folder for changes when running.

### AllowCSharpCodeMatcher
Allow the usage of CSharpCodeMatcher, default is not allowed because it can be dangerous to execute all C# code.

### CertificateSettings
By default, the .NETStandard version from WireMock.Net can use the default .NET self-signed development certificate. See [HTTPS-SSL](https://github.com/WireMock-Net/WireMock.Net/wiki/Using-HTTPS-%28SSL%29#net-standard--net-core) for more info.

However, it's also possible to use your own certificate by configuring appropriate values for the `CertificateSettings`.
The following methods are supported: 

- Using the Certificate Store  
- Loading a PFX certificate from the file system  
- Utilizing an in-memory `X509Certificate2` instance

Note that:
- X509StoreName and X509StoreLocation should be defined
- OR
- X509CertificateFilePath and X509CertificatePassword should be defined
- OR 
- X509Certificate should be defined

#### SSL Certficate from Certificate Store

``` c#
var server = WireMockServer.Start(new WireMockServerSettings
{
    Urls = new[] { "https://localhost:8443" },
    CertificateSettings = new WireMockCertificateSettings
    {
        X509StoreName = "My",
        X509StoreLocation = "CurrentUser",
        // X509StoreThumbprintOrSubjectName can be a Thumbprint, SubjectName or null
        X509StoreThumbprintOrSubjectName = "FE16586076A8B3F3E2F1466803A6C4C7CA35455B"
    }
});
```

Where
* `X509StoreName` = The Certificate StoreName. One of: AddressBook, AuthRoot, CertificateAuthority, My, Root, TrustedPeople, TrustedPublisher.
* `X509StoreLocation` = The Certificate StoreLocation. Can be CurrentUser or LocalMachine.
* `X509StoreThumbprintOrSubjectName` = This can be the Certifcate Thumbprint, Certifcate SubjectName or null. If it's null, the first match on the hostname Certicate is used.

#### SSL Certficate from the file system  

``` c#
var server = WireMockServer.Start(new WireMockServerSettings
{
    Urls = new[] { "https://localhost:8443" },
    CertificateSettings = new WireMockCertificateSettings
    {
        X509CertificateFilePath = "example.pfx",
        X509CertificatePassword = "wiremock"
    }
});
```

Where
* `X509CertificateFilePath` = The full path to the X509Certificate2 `.pfx` or `.pem` file
* `X509CertificatePassword` = The password or key for the X509Certificate2 file. This can be null if the certificate does not require a password.

#### SSL Certificate from in-memory X509Certificate2

``` c#
// GetSSLCertificate is used to represent any way to load a certificate, for example from Azure KeyVault.
X509Certificate2 sslCertificate = GetSSLCertificate();

var server = WireMockServer.Start(new WireMockServerSettings
{
    Urls = new[] { "https://localhost:8443" },
    CertificateSettings = new WireMockCertificateSettings
    {
        X509Certificate = sslCertificate
    }
});
```

#### Additional SSL Certificate Resources

📝 
See also these links on how to generate a EC or RSA
- https://www.scottbrady91.com/openssl/creating-elliptical-curve-keys-using-openssl 
- https://www.scottbrady91.com/openssl/creating-rsa-keys-using-openssl
- https://github.com/WireMock-Net/WireMock.Net/tree/master/examples/WireMock.Net.Console.NET6.WithCertificate  

### ProxyAndRecordSettings
You can enable ProxyAndRecord functionality by defining the *ProxyAndRecordSettings* and by specifying an Url. See code example below.
```c#
var server = WireMockServer.Start(new FluentMockServerSettings
{
    Urls = new[] { "http://localhost:9095/" },
    StartAdminInterface = true,
    ProxyAndRecordSettings = new ProxyAndRecordSettings
    {
        Url = "http://www.bbc.com",
        SaveMapping = true,
        SaveMappingToFile = true,
        BlackListedHeaders = new [] { "dnt", "Content-Length" },
        BlackListedCookies = new [] { "c1", "c2" },
        SaveMappingForStatusCodePattern = "2xx",
        AllowAutoRedirect = true,
        WebProxySettings = new WebProxySettings
        {
            UserName = "test",
            Password = "pwd",
            Address = "http://company.proxy"
        },
        UseDefinedRequestMatchers = false,
        AppendGuidToSavedMappingFile = true,
        ReplaceSettings = new ProxyUrlReplaceSettings
        {
            "OldValue" = "old",
            "NewValue" = "new"
        }
    }
});
```

Where
* `Url` = The url to proxy to
* `SaveMapping` = Save the mapping for each request/response to the internal Mappings
* `SaveMappingToFile` = Save the mapping for each request/response to also file.
* `SaveMappingForStatusCodePattern` = Only save request/response to the internal Mappings if the status code is included in this pattern. (Note that SaveMapping must also be set to true.) The pattern can contain a single value like "200", but also ranges like "2xx", "100,300,600" or "100-299,6xx" are supported.
* `BlackListedHeaders` = Defines a list from headers which will excluded from the saved mappings.
* `ClientX509Certificate2ThumbprintOrSubjectName` = The clientCertificate thumbprint or subject name fragment to use.
* `WebProxySettings` = Defines the WebProxySettings.
* `AllowAutoRedirect` = Proxy requests should follow redirection (30x). Default null / false.
* `UseDefinedRequestMatchers` = When SaveMapping is set to <c>true</c>, this setting can be used to control the behavior of the generated request matchers for the new mapping.
* `AppendGuidToSavedMappingFile` = Append an unique GUID to the filename from the saved mapping file.
* `ReplaceSettings` = Defines the ProxyUrlReplaceSettings.

#### WebProxySettings
* `Address` = Contains the address of the proxy server.
* `UserName` = The user name associated with the credentials.
* `Password` = The password for the user name associated with the credentials.

#### ProxyUrlReplaceSettings
This setting defines an old path param and a new path param to be replaced in the Url when proxying.

* `OldValue` = The old path value to be replaced.
* `NewValue` = The new path value to use.
* `IgnoreCase` = Defines if the case should be ignore when replacing.

### Example:
When you a request like `localhost:9095/earth/story/20170510-terrifying-20m-tall-rogue-waves-are-actually-real`, this request is proxied to the `bbc.com` and the mapping definition is saved to `__admin\mappings\ab38efae-4e4d-4f20-8afe-635533ec2535.json`.

### Urls
The URLs to listen on, if this is defined the port setting is not used.

### StartTimeout
The StartTimeout from WireMock.Net, default 10 seconds.

### AllowPartialMapping
Defines if the matching should be done with exact matching or partial matching. **Partial matching** means that the best matching mapping is used for a input request. In case this setting is set to null or false, only **Exact matching** is done. This means that only when an exact 100% match is found for an input request, the response is handled. Else you get a error (404).
This setting is default set to false.

### AllowCSharpCodeMatcher 
Allow the usage of CSharpCodeMatcher (default is not allowed).

### AllowBodyForAllHttpMethods 
Allow a Body for all HTTP Methods. (default set to false).

### AllowAnyHttpStatusCodeInResponse 
Allow any HttpStatusCode in the response. Also null, 0, empty or invalid. (default set to false).
_Note : this will not work when hosting a Docker container in Azure_

### AllowedCustomHandlebarHelpers
Defines the allowed custom HandlebarHelpers which can be used. Possible values are `None`, `File` and `All`. By default it's `None`.

### AdminUsername 
The username needed for __admin access.

### AdminPassword
The password needed for __admin access.

### AdminAzureADTenant
The AzureAD Tenant needed for __admin access.

### AdminAzureADTenant
The AzureAD Audience / Resource for __admin access.

### RequestLogExpirationDuration
The RequestLog expiration in hours (optional).

### MaxRequestLogCount
The MaxRequestLog count (optional).

### DisableJsonBodyParsing
Set to true to disable Json deserialization when processing requests. (default set to false).

### DisableRequestBodyDecompressing
Disable support for GZip and Deflate request body decompression. (default set to false).

### HandleRequestsSynchronously
Handle all requests synchronously. This could solve some issues when running multiple unit tests using 1 WireMock.Net instance. (default set to false).

### ThrowExceptionWhenMatcherFails
Throw an exception when a [Matcher](https://github.com/WireMock-Net/WireMock.Net/wiki/Request-Matching#matchers) fails because of invalid input. (default set to false).

### PreWireMockMiddlewareInit
Action which is called (with the IAppBuilder or IApplicationBuilder) before the internal WireMockMiddleware is initialized. [Optional]

### PostWireMockMiddlewareInit
Action which is called (with the IAppBuilder or IApplicationBuilder) after the internal WireMockMiddleware is initialized. [Optional]

### AdditionalServiceRegistration
Action which is called with IServiceCollection when ASP.NET Core DI is being configured. [Optional]

### UseRegexExtended
Use the [RegexExtended]() instead of the default Regex.

### Logger
The [IWireMockLogger](https://github.com/WireMock-Net/WireMock.Net/blob/master/src/WireMock.Net.Abstractions/Logging/IWireMockLogger.cs) interface which logs Debug, Info, Warning or Error.

By default this is implemented by a default console logger [WireMockConsoleLogger.cs](https://github.com/WireMock-Net/WireMock.Net/blob/master/src/WireMock.Net/Logging/WireMockConsoleLogger.cs).

But also a Null logger is available [WireMockNullLogger.cs](https://github.com/WireMock-Net/WireMock.Net/blob/master/src/WireMock.Net/Logging/WireMockNullLogger.cs).

And you can implement your own logger, like [WireMockLog4NetLogger.cs](https://github.com/WireMock-Net/WireMock.Net/blob/master/examples/WireMock.Net.Service/WireMockLog4NetLogger.cs).

### FileSystemHandler
Handler to interact with the file system to read and write static mapping files.

By default this is implemented by the [LocalFileSystemHandler.cs](https://github.com/WireMock-Net/WireMock.Net/blob/master/src/WireMock.Net/Handlers/LocalFileSystemHandler.cs), however you can implement your own version as defined here as an example [CustomFileSystemFileHandler.cs](https://github.com/WireMock-Net/WireMock.Net/blob/master/examples/WireMock.Net.Console.Net452.Classic/CustomFileSystemFileHandler.cs).

Implementing your own version from this FileSystemHandler can be useful when running in Azure or Docker Containers.

### CorsPolicyOptions
Policies to use when using CORS. By default CORS is disabled. [Optional]
This is a Enum Flag with these values:
- None
- AllowAnyHeader
- AllowAnyMethod
- AllowAnyOrigin
- AllowAll








