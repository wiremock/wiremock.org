---
title: "Using WireMock with Pact"
meta_title: Running WireMock with Pact | WireMock
---

<br>

## WireMock Pact

WireMock Pact will get the requests from [WireMock](https://github.com/wiremock/wiremock/) and create [Pact JSON](https://docs.pact.io/) files on the filesystem. The Pact JSON can be published to a [Pactflow broker](https://test.pactflow.io/).

WireMock Pact contains:

- `wiremock-pact-lib` - *A library that can transform WireMock [ServeEvent](https://github.com/wiremock/wiremock/blob/master/src/main/java/com/github/tomakehurst/wiremock/stubbing/ServeEvent.java):s to Pact JSON.*
- `wiremock-pact-extension-junit5` - *A WireMock extension, and JUnit 5, that is intended to ease usage of the library.*
- `wiremock-pact-example-springboot-app` - *A SpringBoot application that shows how it can be used.*

WireMock Pact is released to [Maven Central](https://central.sonatype.com/search?q=se.bjurr.wiremockpact). And [available on GitHub](https://github.com/wiremock/wiremock-pact).

## Usage - Junit 5

The extension is both a WireMock extension and a JUnit 5 extension. When using [`wiremock-spring-boot`](https://wiremock.org/docs/solutions/spring-boot/) it can be configured like this in a base class of your tests:

```java
import com.github.tomakehurst.wiremock.core.WireMockConfiguration;
import com.maciejwalkowiak.wiremock.spring.ConfigureWireMock;
import com.maciejwalkowiak.wiremock.spring.EnableWireMock;
import com.maciejwalkowiak.wiremock.spring.WireMockConfigurationCustomizer;
import org.junit.jupiter.api.extension.RegisterExtension;
import se.bjurr.wiremockpact.wiremockpactextensionjunit5.WireMockPactExtension;
import se.bjurr.wiremockpact.wiremockpactlib.api.WireMockPactConfig;

@EnableWireMock({
  @ConfigureWireMock(
      name = "wiremock-service-name",
      property = "wiremock.server.url",
      stubLocation = "wiremock",
      configurationCustomizers = {WireMockPactBaseTest.class})
})
public class WireMockPactBaseTest implements WireMockConfigurationCustomizer {
  @RegisterExtension
  static WireMockPactExtension WIREMOCK_PACT_EXTENSION =
      new WireMockPactExtension(
          WireMockPactConfig.builder() //
              .setConsumerDefaultValue("WireMockPactExample") //
              .setProviderDefaultValue("UnknownProvider") //
              .setPactJsonFolder("src/test/resources/pact-json"));

  @Override
  public void customize(
      final WireMockConfiguration configuration, final ConfigureWireMock options) {
    configuration.extensions(WIREMOCK_PACT_EXTENSION);
  }
}
```

### Usage - Library

It can be used as a library.

```java
public class ExampleTest {
  private static WireMockServer server;
  private static WireMockPactApi wireMockPactApi;

  @BeforeAll
  public static void beforeEach() throws IOException {
    server = new WireMockServer();
    server.start();

    stubFor(
        post(anyUrl())
            .willReturn(
                ok()
                .withHeader("content-type", "application/json")
                .withBody("""
                {"a":"b"}
                """))
            .withMetadata(
                new Metadata(
                    Map.of(
                        WireMockPactMetadata.METADATA_ATTR,
                        new WireMockPactMetadata()
                            .setProvider("some-specific-provider")))));

    wireMockPactApi =
        WireMockPactApi.create(
            new WireMockPactConfig()
                .setConsumerDefaultValue("my-service")
                .setProviderDefaultValue("unknown-service")
                .setPactJsonFolder("the/pact-json/folder"));
    wireMockPactApi.clearAllSaved();
  }

  @Test
  public void testInvoke() {
    // Do stuff that invokes WireMock...
  }

  @AfterAll
  public static void after() {
    for (final ServeEvent serveEvent : server.getAllServeEvents()) {
      wireMockPactApi.addServeEvent(serveEvent);
    }
    // Save pact-json to folder given in WireMockPactApi
    wireMockPactApi.saveAll();
    server.stop();
  }
}
```

### Mappings metadata - Set provider in mapping

You can adjust any mappings file like this to specify the provider of a mapping in its [metadata](https://github.com/wiremock/spec/blob/main/wiremock/wiremock-admin-api/schemas/stub-mapping.yaml) field:

```diff
{
  "id" : "d68fb4e2-48ed-40d2-bc73-0a18f54f3ece",
  "request" : {
    "urlPattern" : "/animals/1",
    "method" : "GET"
  },
  "response" : {
    "status" : 202
  },
  "uuid" : "d68fb4e2-48ed-40d2-bc73-0a18f54f3ece",
+  "metadata": {
+   "wireMockPactSettings": {
+     "provider":"some-other-system"
+   }
+  }
}
```

Or programmatically:

```java
    stubFor(
        post(anyUrl())
            .withMetadata(
                new Metadata(
                    Map.of(
                        WireMockPactMetadata.METADATA_ATTR,
                        new WireMockPactMetadata()
                            .setProvider("some-specific-provider")))));
```

### Publishing to Pact broker

Pact has a [CLI tool](https://docs.pact.io/pact_broker/publishing_and_retrieving_pacts) that can be used for publishing the contracts. But it requires Ruby or Docker. If you don't have that, perhaps `curl` is an option. There is [a shell script here](https://github.com/tomasbjerre/pactflow-publish-sh) that can also be used [via NPM](https://www.npmjs.com/package/pactflow-publish-sh).

You may want to use something like [git-changelog-command-line](https://github.com/tomasbjerre/git-changelog-command-line) to get the next version.

There is a test-server at https://test.pactflow.io/ that can be accessed with user `dXfltyFMgNOFZAxr8io9wJ37iUpY42M` and password `O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1`.

```sh
current_version=$(npx git-changelog-command-line \
  --patch-version-pattern "^fix.*" \
  --print-current-version)
git_hash=`git rev-parse --short HEAD`
participant_version_number="$current_version-$git_hash"

npx pactflow-publish-sh \
 --username=dXfltyFMgNOFZAxr8io9wJ37iUpY42M \
 --password=O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1 \
 --pactflow-broker-url=https://test.pactflow.io/contracts/publish \
 --build-url=http://whatever/ \
 --pact-json-folder=wiremock-pact-example-springboot-app/src/test/resources/pact-json \
 --participant-version-number=$participant_version_number
```

## Useful pages

- [WireMock on Java and JVM](../solutions/jvm.md) - Most of JVM generic solutions are applicable to Spring Boot  development too
