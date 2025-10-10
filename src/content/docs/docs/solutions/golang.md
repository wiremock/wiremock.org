---
title: "WireMock and Go"
---

<!-- TODO: Review and update relative links for Starlight structure -->


<br>

<div class="solution-block">
	<div class="solution-header">
		<img src="/images/logos/wiremock/logo_square.svg">
		<img src="/images/logos/doc-sections/connect.svg">
		<img src="/images/logos/technology/golang.svg">
	</div>
</div>

:::note[WireMock Cloud]

    [Centralize and scale your API mocks with WireMock Cloud.](https://www.wiremock.io?utm_source=oss-docs&utm_medium=oss-docs&utm_campaign=cloud-callouts-solutiongolang&utm_id=cloud-callouts&utm_term=cloud-callouts-solutiongolang)

:::

## Testcontainers module for Go

The WireMock community provides a [Testcontainers for Go module](https://github.com/wiremock/wiremock-testcontainers-go) module
which allows using WireMock single-shot containers within Golang tests.
This module can run any [WireMock Docker](https://github.com/wiremock/wiremock-docker) compatible images,
see the [documentation](https://github.com/wiremock/wiremock-testcontainers-go) for detailed usage guidelines and examples.

Example:

```golang
import (
  "context"
  . "github.com/wiremock/wiremock-testcontainers-go"
  "testing"
)

func TestWireMock(t *testing.T) {
	// Create Container
	ctx := context.Background()
	container, err := RunContainerAndStopOnCleanup(ctx,
		WithMappingFile("hello", "hello-world.json"),
	)
	if err != nil {
		t.Fatal(err)
	}

	// Send the HTTP GET request to the mocked API
	statusCode, out, err := SendHttpGet(container, "/hello", nil)
	if err != nil {
		t.Fatal(err, "Failed to get a response")
	}
	// Verify the response
	if statusCode != 200 {
		t.Fatalf("expected HTTP-200 but got %d", statusCode)
	}
	if string(out) != "Hello, world!" {
		t.Fatalf("expected 'Hello, world!' but got %v", string(out))
	}
}
```

References:

- [GitHub Repository](https://github.com/wiremock/wiremock-testcontainers-go)
- [Testcontainers for Go](https://golang.testcontainers.org/)

## Go WireMock - WireMock REST API client

The Golang client library to stub API resources in WireMock using its [Administrative REST API](../../standalone/administration/).
The project connects to the instance and allows setting up stubs and response templating, or using administrative API to extract observability data.

References:

- [Documentation](https://pkg.go.dev/github.com/wiremock/go-wiremock)
- [GitHub Repository](https://github.com/wiremock/go-wiremock)

Example:

```golang
func TestSome(t *testing.T) {
    wiremockClient := wiremock.NewClient("http://0.0.0.0:8080")
    defer wiremockClient.Reset()

    wiremockClient.StubFor(wiremock.Post(wiremock.URLPathEqualTo("/user")).
    WithQueryParam("name", wiremock.EqualTo("John Doe")).
    WillReturnResponse(
        wiremock.NewResponse().
            WithJSONBody(map[string]interface{}{
                "code":   400,
                "detail": "detail",
            }).
            WithHeader("Content-Type", "application/json").
            WithStatus(http.StatusBadRequest),
    ))
}
```

## Useful pages

- [WireMock and Docker](/docs/standalone/docker/)
- [WireMock and Kubernetes](/docs/solutions/kubernetes/)
