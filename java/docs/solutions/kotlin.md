---
title: WireMock and Kotlin
meta_title: Kotlin Solutions | WireMock
---

<br>

<div class="solution-block">
  <div class="solution-header"> 
    <img src="../../assets/images/logos/wiremock/logo_square.svg"> 
    <img src="../../assets/images/logos/doc-sections/connect.svg"> 
    <img src="../../assets/images/logos/technology/kotlin.svg">
  </div>
</div>

!!! wiremock-cloud "WireMock Cloud"

    [Centralize and scale your API mocks with WireMock Cloud.](https://www.wiremock.io?utm_source=oss-docs&utm_medium=oss-docs&utm_campaign=cloud-callouts-solutionkotlin&utm_id=cloud-callouts&utm_term=cloud-callouts-solutionkotlin)

## Kotlin DSL Bindings

There is a [Kotlin WireMock](https://github.com/marcinziolo/kotlin-wiremock) library
that provides handy Kotlin DSL bindings for WireMock.
Note that this library is maintained outside the WireMock organization on GitHub.

Example:

```kotlin
wiremock.get {
    url equalTo "/users/1"
} returns {
    statusCode = 200
    header = "Content-Type" to "application/json"
    body = """
    {
      "id": 1,
      "name": "Bob"
    }
    """
}
```

## Kotest Extension

[Kotest](https://kotest.io/) is a popular Kotlin test framework
that provides assertions library, property testing and more.
There is a [Kotest extension for WireMock](https://github.com/kotest/kotest-extensions-wiremock)
that integrates WireMock into the framework.
Note that this library is maintained by the Kotest community.

Example:

```kotlin
class SomeTest : FunSpec({
  val customerServiceServer = WireMockServer(9000)
  listener(WireMockListener(customerServiceServer, ListenerMode.PER_SPEC))

  test("let me get customer information") {
    customerServiceServer.stubFor(
      WireMock.get(WireMock.urlEqualTo("/customers/123"))
        .willReturn(WireMock.ok())
    )

    val connection = URL("http://localhost:9000/customers/123").openConnection() as HttpURLConnection
    connection.responseCode shouldBe 200
  }

    //  ------------OTHER TEST BELOW ----------------
})
```

References:

- [Documentation](https://kotest.io/docs/extensions/wiremock.html)
- [GitHub repo: kotest/kotest-extensions-wiremock](https://github.com/kotest/kotest-extensions-wiremock)

