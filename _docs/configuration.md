---
layout: docs
title: "Java configuration"
meta_title: Configuring WireMock in Java | WireMock
description: Configuring WireMock progammatically in Java.
---

<div class="cloud-callout"><a href="https://www.wiremock.io?utm_source=oss-docs&utm_medium=oss-docs&utm_campaign=cloud-callouts-configuration&utm_id=cloud-callouts&utm_term=cloud-callouts-configuration" target="_BLANK">Centralize and scale your API mocks with WireMock Cloud.</a></div>

Both `WireMockServer` and the `WireMockRule` take a configuration builder as the parameter to their constructor e.g.

```java
import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.options;

WireMockServer wm = new WireMockServer(options().port(2345));

@Rule
WireMockRule wm = new WireMockRule(options().port(2345));
```

Every option has a sensible default, so only options that you require an override for should be specified.

## Network ports and binding

```java
// Statically set the HTTP port number. Defaults to 8080.
.port(8000)

// Statically set the HTTPS port number. Defaults to 8443.
.httpsPort(8001)

// Randomly assign the HTTP port on startup
.dynamicPort()

// Randomly asssign the HTTPS port on startup
.dynamicHttpsPort()

// Bind the WireMock server to this IP address locally. Defaults to the loopback adaptor.
.bindAddress("192.168.1.111")
```

## Jetty configuration

Typically it is only necessary to tweak these settings if you are doing performance testing under significant loads.

```java
// Set the number of request handling threads in Jetty. Defaults to 10.
.containerThreads(5)

// Set the number of connection acceptor threads in Jetty. Defaults to 2.
.jettyAcceptors(4)

// Set the Jetty accept queue size. Defaults to Jetty's default of unbounded.
.jettyAcceptQueueSize(100)

 // Set the size of Jetty's header buffer (to avoid exceptions when very large request headers are sent). Defaults to 8192.
.jettyHeaderBufferSize(16834)

// Enable asynchronous request processing in Jetty. Recommended when using WireMock for performance testing with delays, as it allows much more efficient use of container threads and therefore higher throughput. Defaults to false.
.asynchronousResponseEnabled(true)

// Set the number of asynchronous response threads. Effective only with asynchronousResponseEnabled=true. Defaults to 10.
.asynchronousResponseThreads(10)
```

## HTTPS configuration

WireMock can accept HTTPS connections from clients, require a client to present a certificate for authentication, and pass a client certificate on to another service when proxying.

```java
// Set the keystore containing the HTTPS certificate
.keystorePath("/path/to/https-certs-keystore.jks")

// Set the password to the keystore. Note: the behaviour of this changed in version 2.27.0.
// Previously this set Jetty's key manager password, whereas now it sets the keystore password value.
.keystorePassword("verysecret!")

// Set the password to the Jetty's key manager. Note: added in version 2.27.0.
.keyManagerPassword("donttell")

// Set the keystore type
.keystoreType("BKS")

// Require a client calling WireMock to present a client certificate
.needClientAuth(true)

// Path to the trust store containing the client certificate required in by the previous parameter
.trustStorePath("/path/to/trust-store.jks")

// The password to the trust store
.trustStorePassword("trustme")
```

WireMock uses the trust store for three purposes:

1. As a server, when requiring client auth, WireMock will trust the client if it
   presents a public certificate in this trust store
2. As a proxy, WireMock will use the private key & certificate in this key store
   to authenticate its http client with target servers that require client auth
3. As a proxy, WireMock will trust a target server if it presents a public
   certificate in this trust store


## HTTP/2 configuration

HTTP/2 can be disabled separately for plain text (HTTP) and TLS (HTTPS):

```java
// Disable HTTP/2 over HTTP
.http2PlainDisabled(true);

// Disable HTTP/2 over HTTPS
.http2TlsDisabled(true);
```


## Proxy settings

```java
// Set the timeout for requests to the proxy in milliseconds
.proxyTimeout(5000)

// Make WireMock behave as a forward proxy e.g. via browser proxy settings
.enableBrowserProxying(true)

// Send the Host header in the original request onwards to the system being proxied to
.preserveHostHeader(false)
    
// As of WireMock `3.7.0`, when in proxy mode, this option will transfer the original `User-Agent` header from the client to the proxied service.
.preserveUserAgentProxyHeader(true) 

 // Override the Host header sent when reverse proxying to another system (this and the previous parameter are mutually exclusive)
.proxyHostHeader("my.otherdomain.com")

 // When reverse proxying, also route via the specified forward proxy (useful inside corporate firewalls)
.proxyVia("my.corporate.proxy", 8080)

// When proxying, path to a security store containing client private keys and trusted public certificates for communicating with a target server
.trustStorePath("/path/to/trust-store.jks")

// The password to the trust store
.trustStorePassword("trustme")

// When proxying, a key store containing a root Certificate Authority private key and certificate that can be used to sign generated certificates
.caKeystorePath("/path/to/ca-key-store.jks")

// The password to the CA key store
.caKeystorePassword("trustme")

// The type of the CA key store
.caKeystoreType("JKS")

// Which proxy encodings to proxy through to the target if the request contains an Accept-Encoding header
// By default this is null, which means the header is sent to the target unchanged
// If there is an Accept-Encoding header on the request, and it does not contain any of the supported proxy encodings, the header is not sent to the target.
.withSupportedProxyEncodings("gzip", "deflate")
```

## File locations

WireMock, when started programmatically, will default to `src/test/resources` as a filesystem root if not configured otherwise.

```java
// Set the root of the filesystem WireMock will look under for files and mappings
.usingFilesUnderDirectory("/path/to/files-and-mappings-root")

// Set a path within the classpath as the filesystem root
.usingFilesUnderClasspath("root/path/under/classpath")
```

## Request journal

The request journal records requests received by WireMock. It is required by the verification features, so these will throw errors if it is disabled.

```java
// Do not record received requests. Typically needed during load testing to avoid JVM heap exhaustion.
.disableRequestJournal()

// Limit the size of the request log (for the same reason as above).
.maxRequestJournalEntries(Optional.of(100))
```

## Template Cache

When response templating is enabled, compiled template fragments are cached to improve performance.  This setting allows
you to configure the maximum number of entries to allow in the cache.  As of WireMock `3.7.0`, this defaults to 1000 
cache entries.  Before WireMock `3.7.0` the default was unlimited

```java
.withMaxTemplateCacheEntries(100)
```

## Notification (logging)

WireMock wraps all logging in its own `Notifier` interface. It ships with no-op, Slf4j and console (stdout) implementations.

```java
// Provide an alternative notifier. The default logs to slf4j.
.notifier(new ConsoleNotifier(true))
```

## Gzip

Gzipping of responses can be disabled.

```java
.gzipDisabled(true)
```

## Extensions

For details see [Extending WireMock](../extending-wiremock/).

```java
// Add extensions
.extensions("com.mycorp.ExtensionOne", "com.mycorp.ExtensionTwo")
```

## Transfer encoding

By default WireMock will send all responses chunk encoded, meaning with a `Transfer-Encoding: chunked` header present and no `Content-Length` header.

This behaviour can be modified by setting a chunked encoding policy e.g.

```java
.useChunkedTransferEncoding(Options.ChunkedEncodingPolicy.BODY_FILE)
```

Valid values are:

-   `NEVER` - Never use chunked encoding. Warning: this will buffer all response bodies in order to calculate the size.
    This might put a lot of strain on the garbage collector if you're using large response bodies.
-   `BODY_FILE` - Use chunked encoding for body files but calculate a `Content-Length` for directly configured bodies.
-   `ALWAYS` - Always use chunk encoding - the default.

## Cross-origin response headers (CORS)

WireMock always sends CORS headers with admin API responses, but not by default with stub responses.
To enable automatic sending of CORS headers on stub responses, do the following:

```java
.stubCorsEnabled(true)
```

## Limiting logged response body size

By default, response bodies will be recorded in the journal in their entirety. This can result in out of memory errors when very large bodies are served so WireMock
provides an option to limit the number of bytes of response bodies retained (truncating any that are larger).

```java
.maxLoggedResponseSize(100000) // bytes
```

## Preventing proxying to and recording from specific target addresses

As a security measure WireMock can be configured to only permit proxying (and therefore recording) to certain addresses.
This is achieved via a list of allowed address rules and a list of denied address rules, where the allowed list is evaluated first.

Each rule can be one of the following:

* A single IP address
* An IP address range in the e.g. `10.1.1.1-10.2.2.2`
* A hostname wildcard e.g. `dev-*.example.com`

The ruleset is built and applied as follows:

```java
.limitProxyTargets(NetworkAddressRules.builder()
  .allow("192.168.56.42")
  .allow("192.0.1.1-192.168.254.1")
  .deny("*.acme.com")
  .build()
)
```

## Filename template

WireMock can set up specific filename template format based on stub information. 
The main rule for set up specify stub metadata information in handlebar format. 
For instance for endpoint `PUT /hosts/{id}` and format `{{{method}}}-{{{request.url}}}.json`
will be generated: `put-hosts-id.json` filename. Default template: `{{{method}}}-{{{path}}}-{{{id}}}.json`.

```java
.filenameTemplate("{{{request.url}}}-{{{request.url}}}.json")
```

Note: starting from [3.0.0-beta-8](https://github.com/wiremock/wiremock/releases/tag/3.0.0-beta-8)


## Listening for raw traffic

If you would like to observe raw HTTP traffic to and from Jetty
for debugging purposes you can use a `WiremockNetworkTrafficListener`.

One scenario where it can be useful is where Jetty
alters the response from Wiremock before sending it to the client.
(An example of that is where Jetty appends a --gzip postfix to the ETag response header
if the response is gzipped.)
Using WireMock's request listener extension points in this case would not show those alterations.

To output all raw traffic to console use `ConsoleNotifyingWiremockNetworkTrafficListener`, for example:

```java
.networkTrafficListener(new ConsoleNotifyingWiremockNetworkTrafficListener()));
```

If you would like to collect the traffic
and for example add it to your acceptance test's output,
you can use the `CollectingNetworkTrafficListener`.

## HTTP Client
If you want to increase the proxying performance of WireMock you can enable connection reuse and increase the maximum number of connections:

```java
// Maximum connections for Http Client
.maxHttpClientConnections(1000);
//Disable http connection reuse, `false` to enable
.disableConnectionReuse(true)
```

## Webhook configuration

The default webhook thread pool size is 10.  This is more than enough for normal mocking with callbacks but if you are
running performance tests using WireMock with callbacks, you might need to tweak the size of the threadpool used to 
process webhook requests. This option is available as of WireMock version `3.13.0`

```java
// The number of threads created for processing webhook requests. Defaults to 10
.withWebhookThreadPoolSize(100)

```

