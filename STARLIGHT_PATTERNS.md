# Starlight Patterns & Conversions

Quick reference for common patterns when editing WireMock documentation in Starlight.

## Admonitions / Callouts

### MkDocs Format (OLD)
```markdown
!!! note "Custom Title"
    Content here

!!! tip
    Content here

!!! warning
    Content here

!!! danger
    Content here

!!! wiremock-cloud "WireMock Cloud"
    Content here
```

### Starlight Format (NEW)
```markdown
:::note[Custom Title]
Content here
:::

:::tip
Content here
:::

:::caution
Content here
:::

:::danger
Content here
:::

:::note[WireMock Cloud]
Content here
:::
```

## Tabs

### MkDocs Format (OLD)
```markdown
=== "Maven"
    ```xml
    <dependency>...</dependency>
    ```

=== "Gradle"
    ```groovy
    implementation "..."
    ```
```

### Starlight Format (NEW)
```mdx
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
  <TabItem label="Maven">
    ```xml
    <dependency>...</dependency>
    ```
  </TabItem>
  <TabItem label="Gradle">
    ```groovy
    implementation "..."
    ```
  </TabItem>
</Tabs>
```

## Cards & Grids

### Simple Card Grid
```mdx
import { Card, CardGrid } from '@astrojs/starlight/components';

<CardGrid>
  <Card title="Feature 1" icon="star">
    Description here
  </Card>
  <Card title="Feature 2" icon="rocket">
    Description here
  </Card>
</CardGrid>
```

### Card with Links
```mdx
<Card title="Get Started" icon="rocket">
  Learn the basics
  [Read more →](/docs/getting-started/)
</Card>
```

## Links

### Internal Links
```markdown
[Text](/java/stubbing/)
[Text](/dotnet/request-matching/)
```

### External Links
```markdown
[GitHub](https://github.com/wiremock/wiremock)
```

## Images

### Relative to public folder
```markdown
![Alt text](/images/diagram.svg)
```

### In MDX with component
```mdx
<img src="/images/logo.svg" alt="Logo" width="100" />
```

## Code Blocks

### Basic
```markdown
    ```java
    WireMockServer server = new WireMockServer();
    ```
```

### With Title
```markdown
    ```java title="Example.java"
    public class Example { }
    ```
```

### With Highlighting
```markdown
    ```java {2-3}
    public class Example {
        // These lines highlighted
        private String name;
    }
    ```
```

## Frontmatter

### Standard Page
```yaml
---
title: "Page Title"
description: "Page description for SEO"
---
```

### Splash Page (Homepage style)
```yaml
---
title: "Welcome"
template: splash
hero:
  tagline: Catchy tagline
  image:
    file: ../../assets/logo.png
  actions:
    - text: Get Started
      link: /docs/
      icon: right-arrow
      variant: primary
---
```

## Variables / Constants

MkDocs macros like `{{ wiremock_version }}` have been replaced with static values.

To add new variables, create a constants file:

```js
// src/constants.ts
export const WIREMOCK_VERSION = '3.13.2';
```

Then import in MDX:
```mdx
import { WIREMOCK_VERSION } from '../../constants';

Version: {WIREMOCK_VERSION}
```

## Asides (Highlighted Boxes)

```markdown
:::note
Informational note
:::

:::tip
Helpful tip
:::

:::caution
Warning or caution
:::

:::danger
Critical warning
:::
```

### Custom Titles
```markdown
:::tip[Pro Tip]
Custom title here
:::
```

## Links & Buttons

### Button-style Links
```mdx
import { LinkButton } from '@astrojs/starlight/components';

<LinkButton href="/docs/getting-started/" variant="primary">
  Get Started
</LinkButton>
```

## File Tree

```markdown
<FileTree>
- src/
  - content/
    - docs/
      - java/
        - index.md
      - dotnet/
        - index.md
</FileTree>
```

## Steps

```mdx
import { Steps } from '@astrojs/starlight/components';

<Steps>
1. Install WireMock
2. Configure your test
3. Run your test
</Steps>
```

## Badges

```mdx
import { Badge } from '@astrojs/starlight/components';

<Badge text="New" variant="tip" size="small" />
<Badge text="Deprecated" variant="caution" size="medium" />
```

## Custom CSS Classes

Use the classes defined in `src/styles/custom.css`:

```html
<div class="grid-container">
  <a class="card" href="/java/">
    <img src="/images/icon.svg" />
    Java Docs
  </a>
</div>
```

## Icons

Starlight includes built-in icons. Use them in Card components:

```mdx
<Card icon="star">Content</Card>
<Card icon="rocket">Content</Card>
<Card icon="document">Content</Card>
<Card icon="magnifier">Content</Card>
<Card icon="warning">Content</Card>
<Card icon="puzzle">Content</Card>
```

See full icon list: https://starlight.astro.build/guides/components/#available-icons

## Astro Components

To create custom components:

1. Create in `src/components/MyComponent.astro`
2. Import in MDX files:
```mdx
import MyComponent from '../../components/MyComponent.astro';

<MyComponent />
```

## Common Conversions

| MkDocs | Starlight |
|--------|-----------|
| `!!! note` | `:::note` |
| `=== "Tab"` | `<TabItem label="Tab">` |
| `{{ variable }}` | Static value or import |
| `--8<-- "file.md"` | Inline content or import |
| `[link](path.md)` | `[link](/path/)` |

## Navigation

Navigation is defined in `astro.config.mjs`. To add a new page:

1. Create the markdown file in `src/content/docs/`
2. Add entry to sidebar config:

```js
{
  label: 'New Page',
  slug: 'java/new-page'
}
```

## Troubleshooting

### Images not loading
- Ensure images are in `/public/images/`
- Use absolute paths: `/images/logo.svg`

### Component not working
- Check import statement
- Ensure you're using `.mdx` extension
- Verify component is exported properly

### Links not working
- Use absolute paths from root: `/java/page/`
- Don't include `.md` extension
- Trailing slash is optional

### Tabs not showing
- Must use `.mdx` file extension
- Import Tabs component at top of file
- Ensure proper nesting (TabItem inside Tabs)
