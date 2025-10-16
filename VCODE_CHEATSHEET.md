# VCode Component - Quick Reference

## Import

```mdx
import VCode from '../../../components/VCode.astro';
```

## Two Ways to Use

### 1. Slot Syntax (Recommended)

Better for multi-line code blocks - **just write code naturally!**

```mdx
<VCode lang="xml">
<dependency>
    <groupId>org.wiremock</groupId>
    <artifactId>wiremock</artifactId>
    <version>{{WIREMOCK_STABLE}}</version>
</dependency>
</VCode>
```

**Key points:**
- Code goes **between the tags**
- **No template literals needed** - write naturally!
- Better formatting/readability
- Perfect for longer code

### 2. Prop Syntax

Better for short one-liners:

```mdx
<VCode lang="xml" code={`<version>{{WIREMOCK_STABLE}}</version>`} />
```

**Key points:**
- Code in `code` prop
- Self-closing tag
- More compact
- Good for short snippets

## With Tabs

```mdx
import VCode from '../../../components/VCode.astro';
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="Maven">
  <VCode lang="xml">
  <version>{{WIREMOCK_STABLE}}</version>
  </VCode>
</TabItem>
<TabItem label="Gradle">
  <VCode lang="groovy">
  version = "{{WIREMOCK_STABLE}}"
  </VCode>
</TabItem>
</Tabs>
```

## Available Variables

| Variable | Value | Example |
|----------|-------|---------|
| `{{WIREMOCK_STABLE}}` | 3.13.1 | Current stable |
| `{{WIREMOCK_BETA}}` | 4.0.0-beta.15 | Beta version |
| `{{DOCKER_STABLE}}` | 3.13.1 | Docker tag |
| `{{MAVEN_GROUP_ID}}` | org.wiremock | Maven group |
| `{{DOCKER_IMAGE}}` | wiremock/wiremock | Docker image |
| `{{ASSERTJ}}` | 3.26.3 | AssertJ (Maven) |

[See all variables](src/config/versions.ts)

## Common Props

```mdx
<VCode
  lang="xml"              // Required: language for syntax highlighting
  title="pom.xml"         // Optional: file title
  mark={["version"]}      // Optional: highlight text/lines
  ins={["2-3"]}          // Optional: mark as inserted
  del={["4"]}            // Optional: mark as deleted
  frame="code"           // Optional: frame style
>
code here
</VCode>
```

## Migration Patterns

### From Triple Backticks

**Before:**
```mdx
```xml
<version>3.13.1</version>
```
```

**After:**
```mdx
<VCode lang="xml">
<version>{{WIREMOCK_STABLE}}</version>
</VCode>
```

### From Code Component

**Before:**
```mdx
<Code lang="xml" code={`<version>3.13.1</version>`} />
```

**After:**
```mdx
<VCode lang="xml" code={`<version>{{WIREMOCK_STABLE}}</version>`} />
```

## Common Mistakes

❌ **Using triple backticks:**
```mdx
```xml
{{WIREMOCK_STABLE}}  <!-- Won't interpolate -->
```
```

✅ **Correct:**
```mdx
<VCode lang="xml">
{{WIREMOCK_STABLE}}  <!-- Will interpolate -->
</VCode>
```

---

❌ **Wrong variable format:**
```mdx
<VCode lang="xml">
<version>{WIREMOCK_STABLE}</version>  <!-- Wrong: single braces -->
</VCode>
```

✅ **Correct:**
```mdx
<VCode lang="xml">
<version>{{WIREMOCK_STABLE}}</version>  <!-- Right: double braces -->
</VCode>
```

## When to Use Which Syntax?

| Scenario | Recommended Syntax | Why |
|----------|-------------------|-----|
| Long code blocks (>3 lines) | Slot | Better readability |
| Short snippets (1-2 lines) | Prop | More compact |
| Inside `<TabItem>` | Slot | Cleaner nesting |
| With many props | Either | Personal preference |
| Dynamic code generation | Prop | Easier to compose |

## Quick Decision Tree

```
Do you have more than 3 lines of code?
├─ Yes → Use slot syntax
│   <VCode lang="xml">
│   multi-line code here
│   </VCode>
│
└─ No → Use prop syntax
    <VCode lang="xml" code={`short code`} />
```

## Full Example

```mdx
---
title: "Download WireMock"
---

import VCode from '../../../components/VCode.astro';
import { Tabs, TabItem } from '@astrojs/starlight/components';
import { VERSIONS } from '../../../config/versions';

## Installation

Current version: **{VERSIONS.WIREMOCK_STABLE}**

<Tabs>
<TabItem label="Maven">

<VCode lang="xml" title="pom.xml">
<dependency>
    <groupId>org.wiremock</groupId>
    <artifactId>wiremock</artifactId>
    <version>{{WIREMOCK_STABLE}}</version>
    <scope>test</scope>
</dependency>
</VCode>

</TabItem>

<TabItem label="Gradle">

<VCode lang="groovy" title="build.gradle">
testImplementation "org.wiremock:wiremock:{{WIREMOCK_STABLE}}"
</VCode>

</TabItem>

<TabItem label="Docker">

<VCode lang="bash">
docker run -it --rm \
  -p 8080:8080 \
  wiremock/wiremock:{{DOCKER_STABLE}}
</VCode>

</TabItem>
</Tabs>
```

## Need Help?

- [Full Documentation](src/components/VCode.README.md)
- [Live Examples](src/components/VCode.example.mdx)
- [Version Management Guide](VERSIONING_GUIDE.md)
- [All Patterns](STARLIGHT_PATTERNS.md#variables--constants)
