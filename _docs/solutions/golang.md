---
layout: solution
title: "WireMock and Go"
meta_title: "Golang Solutions | WireMock"
description: "Additional solutions for WireMock when using Golang"
logo: /images/logos/technology/golang.svg
redirect_from:
- "/go.html"
- "/go/"
hide-disclaimer: true
---

## Testcontainers module for Go

The WireMock community provides a [Testcontainers for Go](https://golang.testcontainers.org/) module
which allows using WireMock single-shot containers within Golang tests.
This module can run any [WireMock Docker](https://github.com/wiremock/wiremock-docker) compatible images,
see the [documentation](https://github.com/wiremock/wiremock-testcontainers-go) for detailed usage guidelines and examples.

Example:

```golang
import (
 // ...
 "github.com/wiremock/wiremock-testcontainers-go"
)

func TestWireMock(t *testing.T) {
 // Create Container and clean it up upon completion
 ctx := context.Background()
 container, err := RunContainer(ctx,
  WithMappingFile("hello", filepath.Join("testdata", "hello-world.json")),
 )
 if err != nil {
  t.Fatal(err)
 }
 t.Cleanup(func() {
  if err := container.Terminate(ctx); err != nil {
   t.Fatalf("failed to terminate container: %s", err)
  }
 })

 uri, err := GetURI(ctx, container)
 if err != nil {
  t.Fatal(err, "unable to get container endpoint")
 }

 // Checks
statusCode, out, err := SendHttpGet(uri, "/hello")
 if err != nil {
  t.Fatal(err, "Failed to get a response")
 }
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

## Golang WireMock admin client

A simple Golang client for [WireMock Administrative REST API](../../standalone/administration)
that allows configuring WireMock API endpoints in your code and tests.

References:

- [Documentation](https://pkg.go.dev/github.com/wiremock/go-wiremock)
- [GitHub Repository](https://github.com/wiremock/go-wiremock)

## Useful pages

- [WireMock and Docker](../docker)
- [WireMock and Kubernetes](../kubernetes)
