# Version Management Guide

This guide explains how version numbers and other site-wide variables are managed in the WireMock documentation site.

## Overview

**Problem:** Version numbers like `3.13.1` appear in multiple places across the documentation. When updating versions, you have to find and replace every occurrence manually, which is error-prone.

**Solution:** All version numbers are centralized in `src/config/versions.ts` and automatically substituted using the custom `VCode` component.

## Quick Start

### 1. Adding a New Version

Edit `src/config/versions.ts`:

```typescript
export const VERSIONS = {
  WIREMOCK_STABLE: '3.13.1',  // ← Update here
  WIREMOCK_BETA: '4.0.0-beta.15',
  // ... more versions
};
```

### 2. Using in Documentation

In your MDX files (two ways):

**Option A: Slot syntax (recommended for longer code):**
```mdx
---
title: "My Doc Page"
---

import VCode from '../../../components/VCode.astro';

<VCode lang="xml">
{`<dependency>
    <groupId>org.wiremock</groupId>
    <artifactId>wiremock</artifactId>
    <version>{{WIREMOCK_STABLE}}</version>
</dependency>`}
</VCode>
```

**Option B: Prop syntax (good for short snippets):**
```mdx
<VCode lang="xml" code={`<version>{{WIREMOCK_STABLE}}</version>`} />
```

That's it! The `{{WIREMOCK_STABLE}}` placeholder will automatically be replaced with `3.13.1`.

## Migration Example

### Before (Hardcoded Version)

**File:** `src/content/docs/docs/download-and-installation.mdx`

```mdx
import { Code, Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="Maven">

```xml
<dependency>
    <groupId>org.wiremock</groupId>
    <artifactId>wiremock</artifactId>
    <version>3.13.1</version>
    <scope>test</scope>
</dependency>
```

</TabItem>
</Tabs>
```

**Problem:** The version `3.13.1` is hardcoded. When version updates, you need to find and replace it everywhere.

### After (Using VCode)

```mdx
import VCode from '../../../components/VCode.astro';
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="Maven">

<VCode lang="xml">
{`<dependency>
    <groupId>org.wiremock</groupId>
    <artifactId>wiremock</artifactId>
    <version>{{WIREMOCK_STABLE}}</version>
    <scope>test</scope>
</dependency>`}
</VCode>

</TabItem>
</Tabs>
```

**Result:** When you update `WIREMOCK_STABLE` in `versions.ts`, all pages using it update automatically.

## Available Variables

All variables are defined in `src/config/versions.ts`:

| Variable | Current Value | Usage |
|----------|---------------|-------|
| `{{WIREMOCK_STABLE}}` | 3.13.1 | Main stable version |
| `{{WIREMOCK_BETA}}` | 4.0.0-beta.15 | Beta/preview version |
| `{{WIREMOCK_LEGACY}}` | 2.31.0 | Legacy version (for migration docs) |
| `{{WEBHOOKS_EXTENSION}}` | 3.13.1 | Extension version |
| `{{DOCKER_STABLE}}` | 3.13.1 | Docker image tag |
| `{{DOCKER_LATEST}}` | latest | Docker latest tag |
| `{{ASSERTJ}}` | 3.26.3 | AssertJ (Maven) |
| `{{ASSERTJ_GRADLE}}` | 3.24.2 | AssertJ (Gradle) |
| `{{MAVEN_GROUP_ID}}` | org.wiremock | Maven group |
| `{{DOCKER_IMAGE}}` | wiremock/wiremock | Docker image |

## Common Use Cases

### 1. Maven Dependency

```mdx
<VCode lang="xml">
{`<dependency>
    <groupId>{{MAVEN_GROUP_ID}}</groupId>
    <artifactId>wiremock</artifactId>
    <version>{{WIREMOCK_STABLE}}</version>
</dependency>`}
</VCode>
```

### 2. Gradle Dependency

```mdx
<VCode lang="groovy">
{`testImplementation "{{MAVEN_GROUP_ID}}:wiremock:{{WIREMOCK_STABLE}}"`}
</VCode>
```

### 3. Docker Command

```mdx
<VCode lang="bash">
{`docker run -it --rm \\
  -p 8080:8080 \\
  --name wiremock \\
  {{DOCKER_IMAGE}}:{{DOCKER_STABLE}}`}
</VCode>
```

### 4. Download Link

For text content (not code blocks), import the versions directly:

```mdx
import { VERSIONS } from '../../../config/versions';

Download [wiremock-standalone-{VERSIONS.WIREMOCK_STABLE}.jar](https://repo1.maven.org/maven2/org/wiremock/wiremock-standalone/{VERSIONS.WIREMOCK_STABLE}/wiremock-standalone-{VERSIONS.WIREMOCK_STABLE}.jar)
```

### 5. Multiple Variables in One Block

```mdx
<VCode lang="xml" code={`
<dependencies>
    <dependency>
        <groupId>{{MAVEN_GROUP_ID}}</groupId>
        <artifactId>wiremock</artifactId>
        <version>{{WIREMOCK_STABLE}}</version>
    </dependency>
    <dependency>
        <groupId>org.assertj</groupId>
        <artifactId>assertj-core</artifactId>
        <version>{{ASSERTJ}}</version>
    </dependency>
</dependencies>
`} />
```

## Important Notes

### ✅ Works

- `<VCode>` component with `{{VARIABLE}}` syntax
- Direct import in text: `{VERSIONS.WIREMOCK_STABLE}`
- All props from Starlight's `<Code>` component

### ❌ Doesn't Work

- Triple-backtick code blocks: `` ```xml ... ``` ``
  - These are plain markdown and don't support interpolation
  - Must use `<VCode>` instead

### ⚠️ Notes

- Variable names must be UPPERCASE with underscores
- Pattern: `/\{\{([A-Z_]+)\}\}/g`
- Unknown variables trigger a console warning
- Variables are replaced at build time (no runtime cost)

## Adding New Variables

1. **Define in `src/config/versions.ts`:**

```typescript
export const CODE_VARIABLES = {
  ...VERSIONS,
  MY_NEW_VAR: 'my-value',
} as const;
```

2. **Use in documentation:**

```mdx
<VCode lang="bash" code={`echo "{{MY_NEW_VAR}}"`} />
```

## Updating Versions

When a new WireMock version is released:

1. **Update `src/config/versions.ts`:**

```typescript
export const VERSIONS = {
  WIREMOCK_STABLE: '3.14.0',  // ← Changed from 3.13.1
  // ...
};
```

2. **Rebuild the site:**

```bash
pnpm run build
```

3. **Done!** All pages using `{{WIREMOCK_STABLE}}` now show `3.14.0`.

## Migration Strategy

For existing documentation with hardcoded versions:

1. **Identify files with version numbers:**
   ```bash
   grep -r "3\.13\.1" src/content/docs --include="*.mdx"
   ```

2. **Prioritize high-traffic pages:**
   - Download & installation
   - Quick start guides
   - Docker documentation

3. **Convert to VCode:**
   - Replace `` ```xml `` with `<VCode lang="xml" code={` `} />`
   - Replace version numbers with `{{WIREMOCK_STABLE}}`
   - Add import: `import VCode from '../../../components/VCode.astro';`

4. **Test locally:**
   ```bash
   pnpm run dev
   ```

## Troubleshooting

### Variable not substituting

**Problem:** `{{MY_VAR}}` appears literally in the output

**Causes:**
- Variable not defined in `CODE_VARIABLES`
- Using triple-backtick code blocks instead of `<VCode>`
- Typo in variable name

**Solution:**
- Check `src/config/versions.ts`
- Replace `` ```lang `` with `<VCode lang="lang" code={` `} />`
- Check console for warnings: `VCode: Unknown variable {{MY_VAR}}`

### Import path wrong

**Problem:** `Cannot find module '../../../components/VCode.astro'`

**Solution:** Adjust relative path based on file location:
- `src/content/docs/docs/page.mdx` → `../../../components/VCode.astro`
- `src/content/docs/docs/subdir/page.mdx` → `../../../../components/VCode.astro`

### Syntax highlighting broken

**Problem:** Code doesn't highlight properly

**Solution:**
- Verify `lang` prop is correct: `lang="xml"`, `lang="java"`, etc.
- Check for unescaped backticks inside code string
- Use template literals: `code={\` ... \`}`

## Further Reading

- [VCode Component README](src/components/VCode.README.md) - Full component documentation
- [VCode Examples](src/components/VCode.example.mdx) - Live examples
- [Starlight Code Component](https://starlight.astro.build/components/code/) - Underlying component
- [Pattern Reference](STARLIGHT_PATTERNS.md#variables--constants) - Quick syntax reference

## Summary

**Before:** Version numbers scattered across 25+ files, manual updates required
**After:** One central config file, automatic updates everywhere

This approach mirrors Jekyll's `_config.yaml` variables but with:
- ✅ Better type safety (TypeScript)
- ✅ Better IDE support (autocomplete)
- ✅ Build-time substitution (no runtime cost)
- ✅ Familiar template syntax
