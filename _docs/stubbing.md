---
layout: docs
title: Stubbing
meta_title: Returning stubbed HTTP responses to specific requests | WireMock
toc_rank: 50
redirect_from: "/stubbing.html"
description: A core feature of WireMock is the ability to return canned HTTP responses for requests matching criteria. These are described in detail in Request Matching.
---

A core feature of WireMock [API mocking]({{ '/' | absolute_url }}) is the ability to return canned HTTP
responses for requests matching criteria. These are described in detail in [Request Matching](../request-matching/).

## Basic stubbing

You can configure stubs using JSON configuration files or code:

1. Via a `.json` file under the `mappings` directory
2. Via a POST request to
`http://<host>:<port>/__admin/mappings` with the JSON as a body
3. From code using one of the SDKs

**Example.**
To configure a response with a status of 200 to be returned
when the relative URL exactly matches `/some/thing` (including query parameters).
The body of the response will be "Hello world!" and a
`Content-Type` header will be sent with a value of `text-plain`.

{% codetabs %}

{% codetab JSON %}

```json
{
  "request": {
    "method": "GET",
    "url": "/some/thing"
  },

  "response": {
    "status": 200,
    "body": "Hello, world!",
    "headers": {
        "Content-Type": "text/plain"
    }
  }
}
```

{% endcodetab %}

{% codetab Java %}

```java
@Test
public void exactUrlOnly() {
    stubFor(get(urlEqualTo("/some/thing"))
            .willReturn(aResponse()
                .withHeader("Content-Type", "text/plain")
                .withBody("Hello world!")));

    assertThat(testClient.get("/some/thing").statusCode(), is(200));
    assertThat(testClient.get("/some/thing/else").statusCode(), is(404));
}
```

{% endcodetab %}

{% codetab Python %}

```python
Mappings.create_mapping(
    Mapping(
        request=MappingRequest(method=HttpMethods.GET, url="/some/thing"),
        response=MappingResponse(status=200, body="Hello, world!", headers=("Content-Type", "text/plain")),
    )
)
```

{% endcodetab %}

{% codetab Golang %}

```go
wiremockClient.StubFor(wiremock.Get(wiremock.URLPathEqualTo("/some/thing")).
        WillReturnResponse(
            wiremock.NewResponse().
                WithStatus(http.StatusOK).
                WithBody("Hello, world!").
                WithHeader("Content-Type", "text/plain")))
```

{% endcodetab %}

{% endcodetabs %}

In Java, if you'd prefer to use slightly more BDDish language in your tests,
you can replace `stubFor` with `givenThat`.

### Java Shortcuts

Some common request and response patterns can be expressed in Java in abbreviated forms.

Requests matching an exact URL plus one of the most common HTTP methods (GET, POST, PUT, DELETE) can be stubbed like this:

```java
stubFor(get("/some/thing")
    .willReturn(aResponse().withStatus(200)));
```

Common responses can also be abbreviated e.g.:

```java
stubFor(delete("/fine")
    .willReturn(ok()));

stubFor(get("/fine-with-body")
    .willReturn(ok("body content")));

stubFor(get("/json")
    .willReturn(okJson("{ \"message\": \"Hello\" }")));

stubFor(post("/redirect")
    .willReturn(temporaryRedirect("/new/place")));

stubFor(post("/sorry-no")
    .willReturn(unauthorized()));

stubFor(put("/status-only")
    .willReturn(status(418)));

```

More DSL examples [can be found here](https://github.com/tomakehurst/wiremock/tree/master/src/test/java/ignored/Examples.java#374).

HTTP methods currently supported are:
`GET, POST, PUT, DELETE, HEAD, TRACE, OPTIONS`. You can specify `ANY` if
you want the stub mapping to match on any request method.

### Setting the response status message

In addition to the status code, the status message can optionally also
be set.

Java:

```java
@Test
public void statusMessage() {
    stubFor(get(urlEqualTo("/some/thing"))
            .willReturn(aResponse()
                .withStatus(200)
                .withStatusMessage("Everything was just fine!")
                .withHeader("Content-Type", "text/plain")));

    assertThat(testClient.get("/some/thing").statusCode(), is(200));
    assertThat(testClient.get("/some/thing/else").statusCode(), is(404));
}
```

JSON:

```json
{
    "request": {
        "method": "GET",
        "url": "/some/thing"
    },
    "response": {
        "status": 200,
        "statusMessage": "Everything was just fine!"
    }
}
```

## Stub priority

It is sometimes the case that you'll want to declare two or more stub
mappings that "overlap", in that a given request would be a match for
more than one of them. By default, WireMock will use the most recently
added matching stub to satisfy the request. However, in some cases it is
useful to exert more control.

One example of this might be where you want to define a catch-all stub
for any URL that doesn't match any more specific cases. Adding a
priority to a stub mapping facilitates this:

```java
//Catch-all case
stubFor(get(urlMatching("/api/.*")).atPriority(5)
    .willReturn(aResponse().withStatus(401)));

//Specific case
stubFor(get(urlEqualTo("/api/specific-resource")).atPriority(1) //1 is highest
    .willReturn(aResponse()
            .withStatus(200)
            .withBody("Resource state")));
```

Priority is set via the `priority` attribute in JSON:

```json
{
    "priority": 1,
    "request": {
        "method": "GET",
        "url": "/api/specific-resource"
    },
    "response": {
        "status": 200
    }
}
```

When unspecified, stubs default to a priority of `5`[<sup>^</sup>](https://github.com/wiremock/wiremock/blob/master/src/main/java/com/github/tomakehurst/wiremock/stubbing/StubMapping.java#L37) where `1` is the highest priority and Java `Integer.MAX_VALUE` (i.e., `2147483647`) is the minimum priority.

## Sending response headers

In addition to matching on request headers, it's also possible to send response headers.

Java:

```java
stubFor(get(urlEqualTo("/whatever"))
        .willReturn(aResponse()
                .withStatus(200)
                .withHeader("Content-Type", "application/json")
                .withHeader("Set-Cookie", "session_id=91837492837")
                .withHeader("Set-Cookie", "split_test_group=B") // You can call withHeader more than once for the same header if multiple values are required
                .withHeader("Cache-Control", "no-cache")));
```

JSON:

```json
{
    "request": {
        "method": "GET",
        "url": "/whatever"
    },
    "response": {
        "status": 200,
        "headers": {
            "Content-Type": "text/plain",
            "Set-Cookie": ["session_id=91837492837", "split_test_group=B"],
            "Cache-Control": "no-cache"
        }
    }
}
```

## Specifying the response body

The simplest way to specify a response body is as a string literal.

Java:

```java
stubFor(get(urlEqualTo("/body"))
        .willReturn(aResponse()
                .withBody("Literal text to put in the body")));
```

JSON:

```json
{
    "request": {
        "method": "GET",
        "url": "/body"
    },
    "response": {
        "status": 200,
        "body": "Literal text to put in the body"
    }
}
```

If you're specifying a JSON body via the JSON API, you can avoid having to escape it like this:

```json
    "response": {
        "status": 200,
        "jsonBody": {
          "arbitrary_json": [1, 2, 3]
        }
    }
```

To read the body content from a file, place the file under the `__files`
directory. By default this is expected to be under `src/test/resources`
when running from the JUnit rule. When running standalone it will be
under the current directory in which the server was started. To make
your stub use the file, simply call `bodyFile()` on the response builder
with the file's path relative to `__files`:

```java
stubFor(get(urlEqualTo("/body-file"))
        .willReturn(aResponse()
                .withBodyFile("path/to/myfile.xml")));
```

Or

```json
{
    "request": {
        "method": "GET",
        "url": "/body-file"
    },
    "response": {
        "status": 200,
        "bodyFileName": "path/to/myfile.xml"
    }
}
```

> **note**
>
> Body file paths should always be relative i.e. not have a leading /

> **note**
>
> All strings used by WireMock, including the contents of body files are
> expected to be in `UTF-8` format. Passing strings in other character
> sets, whether by JVM configuration or body file encoding will most
> likely produce strange behaviour.

A response body in binary format can be specified as a `byte[]` via an
overloaded `body()`:

```java
stubFor(get(urlEqualTo("/binary-body"))
        .willReturn(aResponse()
                .withBody(new byte[] { 1, 2, 3, 4 })));
```

The JSON API accepts this as a base64 string (to avoid stupidly long
JSON documents):

```json
{
    "request": {
        "method": "GET",
        "url": "/binary-body"
    },
    "response": {
        "status": 200,
        "base64Body": "WUVTIElOREVFRCE="
    }
}
```

## Default response for unmapped requests

When a request cannot be mapped to a response, Wiremock returns an HTML response with a 404 status code.

It is possible to customize the response by catching all URLs with a low priority.

In Java

```java
stubFor(any(anyUrl())
                .atPriority(10)
                .willReturn(aResponse()
                        .withStatus(404)
                        .withBody("{\"status\":\"Error\",\"message\":\"Endpoint not found\"}")));
```

In JSON

```json
{
    "priority": 10,
    "request": {
        "method": "ANY",
        "urlPattern": ".*"
    },
    "response": {
        "status": 404,
        "jsonBody": { "status": "Error", "message": "Endpoint not found" },
        "headers": {
            "Content-Type": "application/json"
        }
    }
}
```

## Saving stubs

Stub mappings which have been created can be persisted to the `mappings`
directory via a call to `WireMock.saveAllMappings` in Java or posting a
request with an empty body to
`http://<host>:<port>/__admin/mappings/save`.

> **note**
> Note that this feature is not available when running WireMock from a servlet container.

## Editing stubs

Existing stub mappings can be modified, provided they have been assigned an ID.

In Java:

```java
wireMockServer.stubFor(get(urlEqualTo("/edit-this"))
    .withId(id)
    .willReturn(aResponse()
        .withBody("Original")));

assertThat(testClient.get("/edit-this").content(), is("Original"));

wireMockServer.editStub(get(urlEqualTo("/edit-this"))
    .withId(id)
    .willReturn(aResponse()
        .withBody("Modified")));

assertThat(testClient.get("/edit-this").content(), is("Modified"));
```

To do the equivalent via the JSON API, `PUT` the edited stub mapping to `/__admin/mappings/{id}`:

```json
{
    "request": {
        "urlPath": "/edit-me",
        "method": "ANY"
    },
    "response": {
        "status": 200
    }
}
```

## File serving

When running the standalone JAR, files placed under the `__files` directory will
be served up as if from under the docroot, except if stub mapping
matching the URL exists. For example if a file exists
`__files/things/myfile.html` and no stub mapping will match
`/things/myfile.html` then hitting
`http://<host>:<port>/things/myfile.html` will serve the file.

This feature is also available with the standard JAR. To use it, define the filesRoot using `options.withRootDirectory()`, i.e. `options.withRootDirectory(getClass.getResource("/wiremock").getPath)`

## Removing stubs

Stub mappings can be deleted via the Java API as follows:

```java
StubMapping stubMapping = stubFor(get(urlEqualTo("/delete-me"))
  .willReturn(aResponse().withStatus(200)));

// Do things with the stub

removeStub(stubMapping);
```

They can be deleted via the HTTP API by issuing a `DELETE` to `http://<host>:<port>/__admin/mappings/{id}`
where `id` is the UUID of the stub mapping, found in its `id` field.

## Reset

The WireMock server can be reset at any time, removing all stub mappings
and deleting the request log. If you're using either of the JUnit rules
this will happen automatically at the start of every test case. However
you can do it yourself via a call to `WireMock.reset()` in Java or
sending a `POST` request with an empty body to
`http://<host>:<port>/__admin/reset`.

To reset just the stub mappings leaving the request log intact send a `DELETE` to `http://<host>:<port>/__admin/mappings`.

If you've created some file based stub mappings to be loaded at startup
and you don't want these to disappear when you do a reset you can call
`WireMock.resetToDefault()` instead, or post an empty request to
`http://<host>:<port>/__admin/mappings/reset`.

## Getting all currently registered stub mappings

All stub mappings can be fetched in Java by calling `WireMock.listAllStubMappings()`.

To fetch them via the HTTP API send a `GET` to `http://<host>:<port>/__admin/mappings`.

Optionally limit and offset parameters can be specified to constrain the set returned e.g.
`GET http://localhost:8080/__admin/mappings?limit=10&offset=50`

## Getting a single stub mapping by ID

A single stub mapping can be retrieved by ID in Java by calling `WireMock.getSingleStubMapping(id)` where `id` is the
UUID of the stub mapping.

Via the HTTP client a mapping can be retrieved by sending a `GET` to `http://<host>:<port>/__admin/mappings/{id}`.

## Bulk importing stubs

Multiple stubs can be imported in one call.

Java:

```java
WireMock.importStubs(stubImport()
    .stub(get("/one").willReturn(ok()))
    .stub(post("/two").willReturn(ok("Body content")))
    .stub(put("/three").willReturn(ok()))
    .ignoreExisting()
    .deleteAllExistingStubsNotInImport());
```

Via the JSON API, `POST` the to `/__admin/mappings/import`:

```json
{
    "mappings": [
        {
            "request": {
                "method": "GET",
                "url": "/one"
            },
            "response": {
                "status": 200
            }
        },
        {
            "id": "8c5db8b0-2db4-4ad7-a99f-38c9b00da3f7",
            "request": {
                "url": "/two"
            },
            "response": {
                "status": 200,
                "body": "Body content"
            }
        }
    ],

    "importOptions": {
        "duplicatePolicy": "IGNORE",
        "deleteAllNotInImport": true
    }
}
```

### Existing stubs policy

By default, if a stub in an import already exists (has an ID of a stub already loaded), then the existing stub will be overwritten.
This can be changed by setting `duplicatePolicy` in the JSON to `IGNORE` or calling `ignoreExisting()` on the Java builder.

### Replacing all stubs with the import

If you want to ensure that the only stubs loaded after the import has completed are the ones it contains, you can set
`"deleteAllNotInImport": true` in the JSON or call `deleteAllExistingStubsNotInImport()` on the Java builder.
