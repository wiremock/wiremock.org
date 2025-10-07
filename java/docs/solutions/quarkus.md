---
title: "WireMock and Quarkus"
meta_title: "Quarkus Solutions | WireMock"
---

<br>

<div class="solution-block">
    <div class="solution-header"> 
        <img src="../../assets/images/logos/wiremock/logo_square.svg"> 
        <img src="../../assets/images/logos/doc-sections/connect.svg"> 
        <img src="../../assets/images/logos/technology/quarkus.svg">
    </div>
</div>

!!! wiremock-cloud "WireMock Cloud"

    [Centralize and scale your API mocks with WireMock Cloud.](https://www.wiremock.io?utm_source=oss-docs&utm_medium=oss-docs&utm_campaign=cloud-callouts-solutionquarkus&utm_id=cloud-callouts&utm_term=cloud-callouts-solutionquarkus)


## WireMock Extension for Quarkus

There is a [WireMock extension](https://github.com/quarkiverse/quarkus-wiremock) in the
[Quarkiverse](https://quarkiverse.io/)!
It allows running WireMock for Quarkus projects in the development mode.
This is a very basic way of running WireMock together with Quarkus,
and only a few configuration options are supported:

```properties
quarkus.wiremock.devservices.enabled=true
quarkus.wiremock.devservices.files-mapping=<path to wiremock root dir with mappings and __files folders>
quarkus.wiremock.devservices.port=8089
quarkus.wiremock.devservices.reload=true
```

References:

- [GitHub Repository](https://github.com/quarkiverse/quarkus-wiremock)

## More info

- [Testing a Quarkus application with WireMock and Rest Assured](https://www.youtube.com/watch?v=DzBGZpdWnT8),
  by Giuseppe Scaramuzzino
- [Building a Resilient Microservice with Quarkus and WireMock](https://levelup.gitconnected.com/building-a-resilient-microservice-with-quarkus-and-wiremock-de59b2a4fac7),
  by Iain Porter
