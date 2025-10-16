# VCode Component

A custom Astro component that wraps Starlight's `<Code>` component with automatic template variable substitution.

## Problem Statement

In Starlight/Astro MDX files, standard markdown code blocks (triple backticks) do not support JavaScript expression interpolation. This means you cannot do:

```mdx
❌ This doesn't work:
```xml
<version>{WIREMOCK_STABLE}</version>
```
```

The `VCode` component solves this by providing a simple template variable syntax.

## Solution

`VCode` uses double-brace syntax `{{VARIABLE_NAME}}` to substitute values from `src/config/versions.ts`:

```mdx
✅ This works:
import VCode from '../../../components/VCode.astro';

<VCode lang="xml" code={`
<version>{{WIREMOCK_STABLE}}</version>
`} />
```

## Usage

The component supports **two ways** of providing code:

### 1. As Slot Content (Recommended - Write naturally!)

```mdx
import VCode from '../../../components/VCode.astro';

<VCode lang="xml">
<dependency>
    <groupId>org.wiremock</groupId>
    <artifactId>wiremock</artifactId>
    <version>{{WIREMOCK_STABLE}}</version>
</dependency>
</VCode>
```

**Note:** Just write the code naturally between the tags - no need for template literals!

### 2. As `code` Prop (Good for short snippets)

```mdx
import VCode from '../../../components/VCode.astro';

<VCode lang="xml" code={`<version>{{WIREMOCK_STABLE}}</version>`} />
```

### With Tabs

```mdx
import VCode from '../../../components/VCode.astro';
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="Maven">
  <VCode lang="xml">
  <dependency>
      <groupId>org.wiremock</groupId>
      <artifactId>wiremock</artifactId>
      <version>{{WIREMOCK_STABLE}}</version>
  </dependency>
  </VCode>
</TabItem>
<TabItem label="Gradle">
  <VCode lang="groovy">
  testImplementation "org.wiremock:wiremock:{{WIREMOCK_STABLE}}"
  </VCode>
</TabItem>
</Tabs>
```

### With Additional Props

`VCode` supports all the same props as Starlight's `Code` component:

```mdx
<VCode lang="xml" title="pom.xml" mark={["version"]}>
<dependency>
    <groupId>org.wiremock</groupId>
    <artifactId>wiremock</artifactId>
    <version>{{WIREMOCK_STABLE}}</version>
</dependency>
</VCode>
```

## Available Variables

All variables from `src/config/versions.ts` are available:

| Variable | Value | Description |
|----------|-------|-------------|
| `{{WIREMOCK_STABLE}}` | 3.13.1 | Current stable version |
| `{{WIREMOCK_BETA}}` | 4.0.0-beta.15 | Current beta version |
| `{{WIREMOCK_LEGACY}}` | 2.31.0 | Legacy version |
| `{{WEBHOOKS_EXTENSION}}` | 3.13.1 | Webhooks extension version |
| `{{DOCKER_STABLE}}` | 3.13.1 | Docker stable tag |
| `{{DOCKER_LATEST}}` | latest | Docker latest tag |
| `{{ASSERTJ}}` | 3.26.3 | AssertJ version (Maven) |
| `{{ASSERTJ_GRADLE}}` | 3.24.2 | AssertJ version (Gradle) |
| `{{MAVEN_GROUP_ID}}` | org.wiremock | Maven group ID |
| `{{DOCKER_IMAGE}}` | wiremock/wiremock | Docker image name |

## Adding New Variables

1. Edit `src/config/versions.ts`
2. Add your variable to the `CODE_VARIABLES` object:

```typescript
export const CODE_VARIABLES = {
  ...VERSIONS,
  MY_NEW_VARIABLE: 'some-value',
} as const;
```

3. Use it in any MDX file: `{{MY_NEW_VARIABLE}}`

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `code` | string | ✅ | Code content (with `{{VAR}}` placeholders) |
| `lang` | string | ✅ | Language for syntax highlighting |
| `title` | string | ❌ | Optional title displayed above code block |
| `mark` | string[] | ❌ | Lines or text to highlight |
| `ins` | string[] | ❌ | Lines to mark as inserted |
| `del` | string[] | ❌ | Lines to mark as deleted |
| `frame` | string | ❌ | Frame style: 'none', 'terminal', 'code', 'auto' |

All props are passed through to the underlying `<Code>` component.

## How It Works

1. The component receives code with `{{VARIABLE}}` placeholders
2. A regex finds all placeholders: `/\{\{([A-Z_]+)\}\}/g`
3. Each placeholder is replaced with its value from `CODE_VARIABLES`
4. Unknown variables trigger a console warning and remain as-is
5. Processed code is passed to Starlight's `<Code>` component

## Benefits

✅ **Single source of truth** - Update versions in one file
✅ **Type-safe** - TypeScript ensures variable names are valid
✅ **No runtime overhead** - Substitution happens at build time
✅ **Familiar syntax** - Similar to template literals
✅ **Drop-in replacement** - Works like standard `<Code>` component
✅ **Error-friendly** - Unknown variables show warnings, don't break builds

## Migration from Hardcoded Versions

### From Code Prop

**Before:**
```mdx
<Code lang="xml" code={`<version>3.13.1</version>`} />
```

**After:**
```mdx
<VCode lang="xml" code={`<version>{{WIREMOCK_STABLE}}</version>`} />
```

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

## Comparison with Alternatives

| Approach | Code Blocks | Simple | Maintainable |
|----------|-------------|--------|--------------|
| Hardcoded values | ✅ | ✅ | ❌ |
| `<Code>` with template strings | ✅ | ❌ | ⚠️ |
| `<VCode>` with placeholders | ✅ | ✅ | ✅ |
| Custom wrapper components | ✅ | ⚠️ | ✅ |

## See Also

- [`src/config/versions.ts`](../config/versions.ts) - Variable definitions
- [`VCode.example.mdx`](./VCode.example.mdx) - Live examples
- [Starlight Code Component](https://starlight.astro.build/components/code/) - Underlying component
- [Expressive Code](https://expressive-code.com/) - Code rendering engine
