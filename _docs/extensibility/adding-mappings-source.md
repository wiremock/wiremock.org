---
layout: docs
title: Mappings Source Extensions
meta_title: Mappings Source Extensions
description: Adding additional source of loading mappings via extensions.
---

Additional source to load the stub mappings can be configured by implementing `MappingsSourceExtension`.

```java
public class DummyMappingsSourceExtension extends MappingsSourceExtension {
  @Override
  public String getName() {
    return null; // Return the name of extension
  }

  @Override
  public void loadMappingsInto(StubMappings stubMappings) {
    {
        // implementation to load the mappings
        // mappings can be loaded from any source like git repo, database, file storage, stc
    }
  }
}
```

Registering the extension with wiremock.

```java
public class Main {
    public static void main(String[] args) {
        WireMockServer wireMockServer = new WireMockServer(wireMockConfig()
                .extensions(new DummyMappingsSourceExtension())
                ); // Register your extension here
        wireMockServer.start();
    }
}
```