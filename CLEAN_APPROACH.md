# Clean Approach: Pre-Made Components

## The Problem

MDX interprets any `<tag>` syntax as JSX, making it impossible to write raw XML/HTML inside component tags without ugly template literals.

## The Solution

**Use pre-made components for common patterns!**

Instead of fighting MDX, we embrace it by creating semantic components that make your documentation cleaner and more maintainable.

## Available Components

### WireMockDependency

Displays Maven, Gradle, and Scala dependencies with tabs.

**Basic usage:**
```mdx
import WireMockDependency from '../../../components/WireMockDependency.astro';

<WireMockDependency />
```

**With options:**
```mdx
<!-- Standalone artifact -->
<WireMockDependency artifact="wiremock-standalone" />

<!-- Beta version -->
<WireMockDependency version="beta" />

<!-- Without tabs (Maven only) -->
<WireMockDependency showTabs={false} />

<!-- Combination -->
<WireMockDependency artifact="wiremock-standalone" version="beta" />
```

**Props:**
- `artifact` - Artifact ID (default: `"wiremock"`)
- `version` - `"stable"` | `"beta"` (default: `"stable"`)
- `showTabs` - Show all build tools or just Maven (default: `true`)

### DockerCommand

Displays Docker run command.

**Basic usage:**
```mdx
import DockerCommand from '../../../components/DockerCommand.astro';

<DockerCommand />
```

**With options:**
```mdx
<!-- Custom port -->
<DockerCommand port={9090} />

<!-- HTTPS port -->
<DockerCommand httpsPort={8443} />

<!-- Beta version -->
<DockerCommand version="beta" />

<!-- Latest tag -->
<DockerCommand version="latest" />

<!-- Extra arguments -->
<DockerCommand extraArgs="--verbose" />
```

**Props:**
- `version` - `"stable"` | `"beta"` | `"latest"` (default: `"stable"`)
- `port` - HTTP port (default: `8080`)
- `httpsPort` - HTTPS port (optional)
- `extraArgs` - Additional command arguments (optional)

## Real Example

**Before (with template literals - ugly):**
```mdx
<VCode lang="xml" code={`<dependency>
    <groupId>org.wiremock</groupId>
    <artifactId>wiremock</artifactId>
    <version>{{WIREMOCK_STABLE}}</version>
    <scope>test</scope>
</dependency>`} />
```

**After (with components - clean!):**
```mdx
<WireMockDependency />
```

## Full Page Example

```mdx
---
title: "Download and Installation"
---

import WireMockDependency from '../../../components/WireMockDependency.astro';
import DockerCommand from '../../../components/DockerCommand.astro';
import { Tabs, TabItem } from '@astrojs/starlight/components';

## Stable Release

### Test Dependencies

<WireMockDependency />

### Standalone

<Tabs>
<TabItem label="Docker">
  <DockerCommand />
</TabItem>
<TabItem label="JAR">
  <WireMockDependency artifact="wiremock-standalone" />
</TabItem>
</Tabs>

## Beta Release

<WireMockDependency version="beta" />
```

## Benefits

✅ **Clean MDX** - No template literal noise
✅ **Semantic** - Component names describe what they do
✅ **DRY** - Single source for common patterns
✅ **Flexible** - Props for customization
✅ **Maintainable** - Version changes in one place
✅ **Type-safe** - Props validated by TypeScript

## When to Create Components

Create a component when:
1. The pattern repeats 3+ times across docs
2. It's complex (multi-line with variables)
3. It has variations (different artifacts, versions)

Keep using `VCode` directly for:
- Unique, one-off code examples
- Code that varies significantly each time
- Simple one-liners

## Creating New Components

Follow this pattern:

```astro
---
// 1. Import dependencies
import VCode from './VCode.astro';
import { VERSIONS } from '../config/versions';

// 2. Define props interface
interface Props {
  myProp?: string;
}

// 3. Extract props with defaults
const { myProp = 'default' } = Astro.props;

// 4. Build code string with variables
const code = `<example>${myProp}</example>`;
---

{/* 5. Render using VCode */}
<VCode lang="xml" code={code} />
```

## Component Ideas

Consider creating components for:
- `GradleDependency` - Just Gradle (Groovy & Kotlin)
- `MavenPom` - Full pom.xml snippet
- `ExtensionDownload` - Extension JAR downloads
- `JunitRule` - JUnit rule examples
- `StubExample` - Common stub patterns

## Summary

**Stop fighting MDX's JSX parsing** - embrace it with semantic components!

Your documentation becomes:
- More readable
- Easier to maintain
- Self-documenting
- Version-managed automatically

No more ugly template literals cluttering your MDX files!
