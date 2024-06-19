---
layout: docs
title: Custom Content Matching
meta_title: Adding custom content matchers
description: Adding custom content matchers via extensions
---

If WireMock's standard set of content matching strategies isn't sufficient, you can register one or more content
matcher classes containing your own logic.

Custom content matchers can be attached directly to stubs via the Java API when using the local admin interface (by
calling `stubFor(...)` on `WireMockServer`, `WireMockExtension`, or `WireMockRule`). They can also be added via the
extension mechanism on a remote admin interface (by calling `extensions(...)` on `WireMockBuilder`).

To create a custom content matcher extend `ContentPattern<byte[]>` or `StringValuePattern` (ensuring `Json.write(...)`
appropriately serializes your matcher and a `@JsonCreator` is defined):
```java
public class MagicBytesPattern extends ContentPattern<byte[]> {

  public enum Format {
    GIF("47 49 46 38 37 61", "47 49 46 38 39 61"),
    PNG("89 50 4E 47 0D 0A 1A 0A"),
    ZIP("50 4B 03 04", "50 4B 05 06", "50 4B 07 08");

    private final Set<byte[]> magicBytes;

    Format(String... magicBytes) {
      HexFormat hexFormat = HexFormat.ofDelimiter(" ");
      this.magicBytes = Stream.of(magicBytes).map(hexFormat::parseHex).collect(toSet());
    }
  }

  private final Format format;

  @JsonCreator
  public MagicBytesPattern(@JsonProperty("magicBytes") Format format) {
    super(format.magicBytes.iterator().next());
    this.format = format;
  }

  @Override
  public String getName() {
    return "magicBytes";
  }

  @Override
  public String getExpected() {
    return format.toString();
  }

  @Override
  public MatchResult match(byte[] value) {
    for (byte[] magicByte : format.magicBytes) {
      if (value.length >= magicByte.length) {
        boolean matches = true;
        for (int i = 0; i < magicByte.length; i++) {
          if (value[i] != magicByte[i]) {
            matches = false;
            break;
          }
        }
        if (matches) {
          return MatchResult.exactMatch();
        }
      }
    }
    return MatchResult.noMatch();
  }

  public Format getMagicBytes() {
    return format;
  }
}
```
```java
public class StartsWithMatcher extends StringValuePattern {

  @JsonCreator
  public StartsWithMatcher(@JsonProperty("startsWith") String startsWith) {
    super(startsWith);
  }

  @Override
  public MatchResult match(String value) {
    return MatchResult.of(value.startsWith(expectedValue));
  }

  public String getStartsWith() {
    return expectedValue;
  }
}
```

Then, implement `ContentPatternExtension` giving the extension a unique name and identifying the class of your matcher:
```java
public class StartsWithPatternExtension implements ContentPatternExtension {

  @Override
  public Class<? extends ContentPattern<?>> getContentPatternClass() {
    return StartsWithPattern.class;
  }

  @Override
  public String getName() {
    return "starts-with-pattern";
  }
}
```

After the extension is properly registered, you can define a stub with it:

{% codetabs %}

{% codetab Java %}

```java
stubFor(
    post("/gif")
        .withHeader("X-FileName", new StartsWithMatcher("gif"))
        .withRequestBody(new MagicBytesPattern(MagicBytesPattern.Format.GIF))
        .willReturn(ok()));
```

{% endcodetab %}

{% codetab JSON %}

```json
{
    "request": {
        "url": "/gif",
        "method": "POST",
        "headers": {
            "X-FileName": {
                "startsWith": "gif"
            }
        },
        "bodyPatterns": [{
            "magicBytes": "GIF"
        }]
    },
    "response": {
        "status": 200
    }
}
```

{% endcodetab %}

{% endcodetabs %}