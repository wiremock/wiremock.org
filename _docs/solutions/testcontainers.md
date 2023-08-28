---
layout: solution
title: "WireMock and Testcontainers"
meta_title: "Testcontainers Solutions | WireMock"
description: "Additional solutions for WireMock when using Testcontainers"
logo: /images/logos/technology/testcontainers.svg
hide-disclaimer: true
---

The WireMock community provides integration modules for [Testcontainers](https://testcontainers.com/)
They allow provisioning the WireMock server as a standalone container within your tests,
based on [WireMock Docker](https://github.com/wiremock/wiremock-docker).
The intent is to support all the functionality supported by WireMock.

Currently all the modules are under active development.
If there is no module implemented for your technology stack,
a `GenericContainer` implementation from Testcontainers can be used.
For features that are not implemented yet in Module APIs for your language,
it is possible to use the [Administrative REST API](../../standalone/administration).

## Modules

### Java Module

Java implementation is a separate library that is available to all
JVM languages, e.g. Java, Kotlin or Scala.
See full documentation in the [GitHub Repository](https://github.com/wiremock/wiremock-testcontainers-java).

Example:

```java
import org.junit.jupiter.api.*;
import org.testcontainers.junit.jupiter.*;
import org.wiremock.integrations.testcontainers.testsupport.http.*;
import static org.assertj.core.api.Assertions.assertThat;

@Testcontainers
class WireMockContainerJunit5Test {

    @Container
    WireMockContainer wiremockServer = new WireMockContainer("2.35.0")
            .withMapping("hello", WireMockContainerJunit5Test.class, "hello-world.json");

    @Test
    void helloWorld() throws Exception {
        String url = wiremockServer.getUrl("/hello");
        HttpResponse response = new TestHttpClient().get(url);
        assertThat(response.getBody())
                .as("Wrong response body")
                .contains("Hello, world!");
    }
}
```

### Python Module

The Testcontainers Python module is a part of the
[Python WireMock](https://github.com/wiremock/python-wiremock) library,
so a single library integrates bot the CLI client and the Testcontainers module.
See [this page](https://wiremock.readthedocs.io/en/latest/testcontainers/)
for all documentation and examples.

Example:

```python
import pytest
from wiremock.testing.testcontainer import wiremock_container

@pytest.fixture(scope="session") # (1)
def wm_server():
    with wiremock_container(secure=False) as wm:
        Config.base_url = wm.get_url("__admin") # (2)=
        Mappings.create_mapping(
            Mapping(
                request=MappingRequest(method=HttpMethods.GET, url="/hello"),
                response=MappingResponse(status=200, body="hello"),
                persistent=False,
            )
        ) # (3)
        yield wm

def test_get_hello_world(wm_server): # (4)
    resp1 = requests.get(wm_server.get_url("/hello"), verify=False)
    assert resp1.status_code == 200
    assert resp1.content == b"hello"
```

### Golang Module

Golang implementation is a multi-platform library that includes the Testcontainers module only.
The module's full documentation and examples are available in its
[GitHub Repository](https://github.com/wiremock/wiremock-testcontainers-go).
There is a separate library for the CLI, see the [Golang Solutions page](../golang).

Example:

```golang
import (
 "context"
 "net/http"
 "testing"

 "github.com/pkg/errors"
 "github.com/wiremock/wiremock-testcontainers-go"
)

func TestWireMock(t *testing.T) {
 // Create Container
 ctx := context.Background()
 container, err := RunContainer(ctx,
  WithMappingFile("hello", filepath.Join("testdata", "hello-world.json")),
 )
 if err != nil {
  t.Fatal(err)
 }

 // Clean up the container after the test is complete
 t.Cleanup(func() {
  if err := container.Terminate(ctx); err != nil {
   t.Fatalf("failed to terminate container: %s", err)
  }
 })

 // Send request
 uri, err := GetURI(ctx, container)
 if err != nil {
  t.Fatal(err, "unable to get container endpoint")
 }
 statusCode, out, err := SendHttpGet(uri, "/hello")
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

## Coming soon

The following modules are under prototyping at the moment: `.NET`, `Rust`.
A lot more features can be implemented in the listed modules,
and any contributions are welcome!
If you are interested, join us on the [community Slack](http://slack.wiremock.org/).
