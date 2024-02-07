---
description: >
    WireMock versions that run on Java 1.7
---

# Use older WireMock versions when Java 1.7 is required

!!! WARNING:

    Recent WireMock versions do not run on Java 1.7. If you need to run on ava 1.7, use older 
    WireMock versions. Ability to run on Java 7 was deprecated in the 2.x linee, with version 
    2.27.2 the latest release available. There will be noeither bugfixes nor security patches provided.
    Make sure to update as soon as possible to Java 11 or above.

The Java 7 distribution is aimed primarily at Android developers and enterprise Java teams that still use Java Runtime Environment (JRE) 1.7.
Some of its dependencies are not set to the latest versions. For example, Jetty 9.2.x is Jetty's last minor version to retain Java 7 compatibility.

## Maven dependencies

JUnit:

```xml
<dependency>
    <groupId>com.github.tomakehurst</groupId>
    <artifactId>wiremock</artifactId>
    <version>2.27.2</version>
    <scope>test</scope>
</dependency>
```

Standalone JAR:

```xml
<dependency>
    <groupId>com.github.tomakehurst</groupId>
    <artifactId>wiremock-standalone</artifactId>
    <version>2.27.2</version>
    <scope>test</scope>
</dependency>
```

## Gradle dependencies

JUnit:

```groovy
testImplementation "com.github.tomakehurst:wiremock:2.27.2"
```

Standalone JAR:

```groovy
testImplementation "com.github.tomakehurst:wiremock-standalone:2.27.2"
```
