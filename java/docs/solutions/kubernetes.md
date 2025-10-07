---
title: WireMock and Kubernetes
meta_title: Kubernetes Solutions | WireMock
---

<br>

<div class="solution-block">
    <div class="solution-header"> 
        <img src="../../assets/images/logos/wiremock/logo_square.svg"> 
        <img src="../../assets/images/logos/doc-sections/connect.svg"> 
        <img src="../../assets/images/logos/technology/kubernetes.svg">
    </div>
</div>

!!! wiremock-cloud "WireMock Cloud"

    [Centralize and scale your API mocks with WireMock Cloud.](https://www.wiremock.io?utm_source=oss-docs&utm_medium=oss-docs&utm_campaign=cloud-callouts-solutionk8s&utm_id=cloud-callouts&utm_term=cloud-callouts-solutionk8s)

## WireMock Helm Chart (Experimental)

There is an [experimental Helm Chart](https://wiremock.github.io/helm-charts/) for WireMock.
It allows deploying the official WireMock Docker images and also other charts that extend it.

- [GitHub Repository](https://github.com/wiremock/helm-charts)
- [Helm Repository](https://wiremock.github.io/helm-charts/)

## gRPC Proxy

**grpc-wiremock** is a proxy wrapper around the WireMock Standalone server that offers support
for the gRPC protocol.
It is implemented in Java and runs as a standalone proxy
that can be deployed in the same or another container.
The project is under active development, and the contributions are welcome!

> **DISCLAIMER:** This repository was forked from [Adven27/grpc-wiremock](https://github.com/Adven27/grpc-wiremock) which was archived by the maintainer.
> This fork is used to preserve the repository, and to make it available for experimental use and contributions.
> See [wiremock/wiremock #2148](https://github.com/wiremock/wiremock/issues/2148) for the feature request about providing an officially supported implementation

![gRPC WireMock](https://cdn.jsdelivr.net/gh/wiremock/grpc-wiremock/doc/overview.drawio.svg)

References:

- [GitHub Repository](https://github.com/wiremock/grpc-wiremock)

## Useful pages

- [WireMock and Golang](../solutions/golang.md) - There's WireMock for Golang developers too!
