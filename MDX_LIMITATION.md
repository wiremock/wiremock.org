# MDX Limitation with VCode Component

## The Problem

MDX treats **any tag-like syntax** as JSX components. When you write:

```mdx
<VCode lang="xml">
<dependency>
    <version>{{WIREMOCK_STABLE}}</version>
</dependency>
</VCode>
```

MDX tries to interpret `<dependency>` as a React/Astro component, which causes an error.

## The Solution

Unfortunately, there's **no way around this MDX limitation**. You must use one of these approaches:

### Option 1: Use `code` Prop with Template Literals (REQUIRED)

```mdx
<VCode lang="xml" code={`
<dependency>
    <groupId>org.wiremock</groupId>
    <artifactId>wiremock</artifactId>
    <version>{{WIREMOCK_STABLE}}</version>
</dependency>
`} />
```

### Option 2: Create Wrapper Components

For commonly repeated patterns, create dedicated components:

**Create `src/components/MavenDependency.astro`:**
```astro
---
import VCode from './VCode.astro';
import { VERSIONS } from '../config/versions';

interface Props {
  artifact?: string;
  version?: 'stable' | 'beta';
}

const { artifact = 'wiremock', version = 'stable' } = Astro.props;
const ver = version === 'beta' ? VERSIONS.WIREMOCK_BETA : VERSIONS.WIREMOCK_STABLE;
---

<VCode lang="xml" code={`<dependency>
    <groupId>org.wiremock</groupId>
    <artifactId>${artifact}</artifactId>
    <version>${ver}</version>
    <scope>test</scope>
</dependency>`} />
```

**Then use it:**
```mdx
import MavenDependency from '../../../components/MavenDependency.astro';

<MavenDependency />
<MavenDependency version="beta" />
<MavenDependency artifact="wiremock-standalone" />
```

## Why This Happens

MDX is a **superset of Markdown that supports JSX**. This means:
- Any `<TagName>` syntax is treated as a JSX component
- You cannot write raw XML/HTML inside JSX components without escaping
- Template literals (`\`...\``) bypass this by passing strings as props

## Recommendation

Given this limitation, I recommend **Option 2** - create wrapper components for your common code patterns:

1. `MavenDependency.astro` - Maven dependencies
2. `GradleDependency.astro` - Gradle dependencies
3. `DockerCommand.astro` - Docker run commands
4. Use `<VCode code={...} />` for unique/one-off code blocks

This gives you clean MDX files like:

```mdx
<Tabs>
<TabItem label="Maven">
  <MavenDependency />
</TabItem>
<TabItem label="Gradle">
  <GradleDependency />
</TabItem>
</Tabs>
```

Much cleaner than template literals everywhere!
