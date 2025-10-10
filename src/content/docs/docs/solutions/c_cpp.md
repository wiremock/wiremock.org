---
title: "WireMock and C/C++"
---

<!-- TODO: Review and update relative links for Starlight structure -->


<br>

<div class="solution-block">
    <div class="solution-header">
        <img src="/images/logos/wiremock/logo_square.svg">
        <img src="/images/logos/doc-sections/connect.svg">
        <img src="/images/logos/technology/c.svg">
    </div>
</div>

:::note[WireMock Cloud]

    [Centralize and scale your API mocks with WireMock Cloud.](https://www.wiremock.io?utm_source=oss-docs&utm_medium=oss-docs&utm_campaign=cloud-callouts-solutioncpp&utm_id=cloud-callouts&utm_term=cloud-callouts-solutioncpp)

:::

## Testcontainers for C/C++ module

<img src="/images/solutions/testcontainers/testcontainers_c_logo_wide.png" alt="Testcontainers C" style="width: 60%; height: auto; margin-top: 1em;"/>

Recently we created an experimental WireMock module for
[Testcontainers for C/C++](https://github.com/oleg-nenashev/testcontainers-c).
It allows provisioning the WireMock server as a standalone container within your tests, based on [WireMock Docker](/docs/standalone/docker/).
It allows using WireMock with all popular C/C++ testing frameworks
like Google Test, CTest, Doctest, QtTest or CppUnit.

The module is distributed as a shared library and a header,
and hence can be potentially included into other programming languages that support
including native C libraries, for example Lua, D, Swift, etc.
None of that has been tested yet, so we will appreciate your contributions!

### Examples

Initializing WireMock:

```c
#include <stdio.h>
#include <string.h>
#include "testcontainers-c-wiremock.h"

int main() {
    printf("Creating new container: %s\n", DEFAULT_WIREMOCK_IMAGE);
    int requestId = tc_wm_new_default_container();
    tc_wm_with_mapping(requestId, "test_data/hello.json", "hello");
    tc_with_file(requestId, "test_data/hello.json", "/home/wiremock/mappings/hello2.json");
    struct tc_run_container_return ret = tc_run_container(requestId);
    int containerId = ret.r0;
    if (!ret.r1) {
        printf("Failed to run the container: %s\n", ret.r2);
        if (containerId != -1) { // Print container log
            char* log = tc_get_container_log(containerId);
            if (log != NULL) {
                printf("\n%s\n", log);
            }
        }
        return -1;
    }

    // ...
```

Sending HTTP requests

```c
    //..

    struct WireMock_Mapping mapping = tc_wm_get_mappings(containerId);
    if (mapping.responseCode != 200) {
        printf("Failed to get WireMock mapping: %s\n", mapping.error);
        return -1;
    } else {
        printf("WireMock Mapping:\n%s\n", mapping.json);
    }

    printf("Sending HTTP request to the container\n");
    struct tc_send_http_get_return response = tc_send_http_get(containerId, 8080, "/hello");
    if (response.r0 == -1) {
        printf("Failed to send HTTP request: %s\n", response.r2);
        return -1;
    }
    if (response.r0 != 200) {
        printf("Received wrong response code: %d instead of %d\n%s\n", response.r0, 200, response.r2);
        return -1;
    }
    printf("Server Response: HTTP-%d\n%s\n\n", response.r0, response.r1);
    return 0;
}
```