# Custom Components

## CloudCallout

A custom callout component based on Starlight's built-in Card component, designed specifically for highlighting WireMock Cloud features.

### Features

- Custom orange background color (`#ff980080`)
- Optional icon support
- Consistent styling with Starlight theme
- Flexible content via slots

### Usage

To use the CloudCallout component in your MDX files (adjust the relative path based on your file location):

```mdx
---
// From src/content/docs/docs/*.mdx
import CloudCallout from '../../../components/CloudCallout.astro';
---

<CloudCallout title="Your Title">
  Your content here
</CloudCallout>
```

### With Icon

```mdx
<CloudCallout title="Try WireMock Cloud" icon="rocket">
  Get started with WireMock Cloud for enhanced API mocking capabilities.
</CloudCallout>
```

### Props

- `title` (required): The heading text for the callout
- `icon` (optional): A Starlight icon name (e.g., "rocket", "star", "puzzle")

### Available Icons

You can use any icon from the [Starlight Icons list](https://starlight.astro.build/guides/components/#all-icons).

### Example

See `CloudCallout.example.mdx` for a complete example of the component in use.
