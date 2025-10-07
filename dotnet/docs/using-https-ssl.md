# HTTP (SSL)
You can start a standalone mock server listening for HTTPS requests. To do so, there is just a flag to set when creating the server:
```csharp
var server1 = WireMockServer.Start(port: 8443, ssl: true);

// or like this

var server2 = WireMockServer.Start(new WireMockServerSettings
{
    Urls = new[] { "http://localhost:9091", "https://localhost:9443" }
});
```

## HTTPS and certificates
WireMock.NET provides flexible support for SSL certificates through the following methods:  
- Using the Certificate Store  
- Loading a PFX certificate from the file system  
- Utilizing an in-memory `X509Certificate2` instance

See [WIKI : Settings - Certificate Settings](https://github.com/WireMock-Net/WireMock.Net/wiki/Settings#certificatesettings) for details.

## Windows
### .NET Standard / .NET Core
In case you don't have a self-signed certificate yet, run the following command:
``` cmd
dotnet dev-certs https --trust
```

WireMock.Net will now use this self signed certificate [which can be overridden if you like](https://github.com/WireMock-Net/WireMock.Net/wiki/Settings#certificatesettings) to host https urls.

### .NET 4.5.2 / .NET 4.6
In case when using .NET 4.5.2 or .NET 4.6, you need a certificate registered on your box, properly associated with your application and the port number that will be used. This is not really specific to WireMock.Net, not very straightforward and hence the following StackOverflow thread might come handy: [Httplistener with https support](http://stackoverflow.com/questions/11403333/httplistener-with-https-support).


## Linux
In case of Linux or running WireMock.Net inside a Linux Docker container, apply the next steps:

1. Make the `localhost.conf` file of content:
``` ini
[req]
default_bits       = 2048
default_keyfile    = localhost.key
distinguished_name = req_distinguished_name
req_extensions     = req_ext
x509_extensions    = v3_ca

[req_distinguished_name]
commonName         = Common Name (e.g. server FQDN or YOUR name)

[req_ext]
subjectAltName = @alt_names

[v3_ca]
subjectAltName = @alt_names
basicConstraints = critical, CA:false
keyUsage = keyCertSign, cRLSign, digitalSignature,keyEncipherment
extendedKeyUsage = 1.3.6.1.5.5.7.3.1
1.3.6.1.4.1.311.84.1.1 = DER:01

[alt_names]
DNS.1   = localhost
DNS.2   = 127.0.0.1
 ```

Note the `1.3.6.1.4.1.311.84.1.1 = DER:01` it is critical for aspnet for [recognizing](https://github.com/dotnet/aspnetcore/blob/c75b3f7a2fb9fe21fd96c93c070fdfa88a2fbe97/src/Shared/CertificateGeneration/CertificateManager.cs#L81) the cert.
    
2. Generate the cert:
``` sh
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout localhost.key -out localhost.crt -config localhost.conf -subj /CN=localhost
openssl pkcs12 -export -out localhost.pfx -inkey localhost.key -in localhost.crt -passout pass:
```

3. Grab the `localhost.pfx` and `localhost.crt` and copy these files into the target system. In case of `Docker` that would look:
``` dockerfile
COPY localhost.crt /usr/local/share/ca-certificates/
RUN dotnet dev-certs https --clean \
    && update-ca-certificates
COPY localhost.pfx /root/.dotnet/corefx/cryptography/x509stores/my/
```

4. Profit. The system has the aspnetcore dev cert trusted.

See also this [wiremock.net-https-demo-project](https://github.com/winseros/wiremock.net-https-demo-project).
