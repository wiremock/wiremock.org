---
title: "WireMock and GraphQL"
meta_title: "GraphQL Solutions | WireMock"
---


<br>



<div class="solution-block">
    <div class="solution-header"> 
        <img src="../../assets/images/logos/wiremock/logo_square.svg"> 
        <img src="../../assets/images/logos/doc-sections/connect.svg"> 
        <img src="../../assets/images/logos/technology/graphql.svg">
    </div>
</div>

!!! wiremock-cloud "WireMock Cloud"

    [Mock your GraphQL endpoints in WireMock Cloud with instant mock data and federated supergraph](https://www.wiremock.io/post/graphql-mocking-in-wiremock-cloud-beta?utm_source=oss-docs&utm_medium=oss-docs&utm_campaign=cloud-callouts-solutiongraphql&utm_id=cloud-callouts&utm_term=cloud-callouts-solutiongraphql)

## WireMock Extension

There is a [GraphQL extension for WireMock](https://github.com/wiremock/wiremock-graphql-extension)
that allows semantically matching GraphQL queries,
regardless of the order of the fields in the original request.
It brings powers of request matching and response templating to the
[GraphQL](https://graphql.org/) query language.

Example:

```kotlin
import com.github.tomakehurst.wiremock.client.WireMock
import com.github.tomakehurst.wiremock.client.WireMock.*
import io.github.nilwurtz.GraphqlBodyMatcher

fun registerGraphQLWiremock(json: String) {
    WireMock(8080).register(
        post(urlPathEqualTo(endPoint))
            .andMatching(GraphqlBodyMatcher.extensionName, GraphqlBodyMatcher.withRequest(json))
            .willReturn(
                aResponse()
                    .withStatus(200)
            )
    )
}
```

## Read More

- [GraphQL API mocking with the new WireMock extension](https://www.wiremock.io/post/graphql-api-mocking-with-the-new-wiremock-extension?utm_medium=referral&utm_source=wiremock.org&utm_content=solution-page)
  blogpost by Eiki Hayashi
- [GitHub repository with documentation](https://github.com/wiremock/wiremock-graphql-extension)
