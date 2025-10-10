# WireMock Documentation - Astro Starlight

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

Official documentation site for WireMock, migrated from MkDocs Material to Astro Starlight.

## 🎉 Migration Complete

This site has been successfully migrated from MkDocs to Astro Starlight with:
- ✅ 114 documentation files (68 Java + 46 .NET)
- ✅ Exact URL structure preservation (`/java/*`, `/dotnet/*`)
- ✅ All images and assets
- ✅ Full navigation structure
- ✅ Analytics configured
- ✅ Custom styling

See [MIGRATION_SUMMARY.md](../MIGRATION_SUMMARY.md) for full details.

## 🚀 Project Structure

```
wiremock.org-starlight/
├── public/
│   └── images/              # All site images (292 files)
├── src/
│   ├── assets/
│   │   └── wiremock-oss-logo.png
│   ├── components/
│   │   └── Head.astro      # Google Analytics
│   ├── content/
│   │   └── docs/
│   │       ├── index.mdx   # Homepage
│   │       ├── java/       # Java docs (68 files)
│   │       └── dotnet/     # .NET docs (46 files)
│   ├── styles/
│   │   └── custom.css      # WireMock brand styling
│   └── content.config.ts
├── astro.config.mjs         # Site configuration
├── STARLIGHT_PATTERNS.md    # Quick reference guide
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project (`wiremock.org-starlight/`):

| Command | Action |
|---------|--------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start dev server at `localhost:4321` |
| `pnpm build` | Build production site to `./dist/` |
| `pnpm preview` | Preview production build locally |

## 📝 Editing Content

### Add/Edit Pages

1. Edit markdown files in `src/content/docs/`
2. Use `.md` for standard pages, `.mdx` for pages with components
3. Add entries to sidebar in `astro.config.mjs` if needed

### Quick Reference

See [STARLIGHT_PATTERNS.md](./STARLIGHT_PATTERNS.md) for:
- Admonitions/callouts syntax
- Tabs conversion
- Card grids
- Links and images
- Common patterns

### Key Differences from MkDocs

| MkDocs | Starlight |
|--------|-----------|
| `!!! note` | `:::note` |
| `=== "Tab"` | `<TabItem label="Tab">` |
| `{{ variable }}` | Static value or import |
| Tabs at top | Sidebar navigation |

## ⚠️ Manual Review Needed

Some files marked with `TODO:` comments need attention:

```bash
# Find all files needing review
grep -r "TODO:" src/content/docs/
```

Common items:
- Convert `===` tabs to `<Tabs>` component
- Update complex HTML grids to Card components
- Verify relative links

## 🎨 Styling

Custom styles in `src/styles/custom.css`:
- WireMock brand colors
- Grid containers for homepage layouts
- Card styling
- Custom admonitions

## 🔗 URL Structure

URLs are preserved exactly:

- Homepage: `/`
- Java docs: `/java/*` (e.g., `/java/quickstart/java-junit/`)
- .NET docs: `/dotnet/*` (e.g., `/dotnet/request-matching/`)

## 📊 Analytics

Google Analytics configured in `src/components/Head.astro`:
- Property ID: `G-6G6E8F439F`

## 🚢 Deployment

Build the site:

```bash
pnpm build
```

The `dist/` folder contains the static site ready for deployment to any static host (Netlify, Vercel, GitHub Pages, etc.).

## 📚 Documentation

- [Starlight Documentation](https://starlight.astro.build/)
- [Astro Documentation](https://docs.astro.build)
- [Migration Summary](../MIGRATION_SUMMARY.md)
- [Pattern Guide](./STARLIGHT_PATTERNS.md)

## 🐛 Troubleshooting

### Images not loading
- Ensure images are in `/public/images/`
- Use absolute paths: `/images/logo.svg`

### Build errors
- Check for syntax errors in frontmatter
- Verify imports in `.mdx` files
- Ensure all referenced images exist

### Dev server slow
- Large number of files may cause slower builds
- Consider using `astro dev --host` for network access

## 📝 Contributing

When adding new content:

1. Add markdown file to appropriate section
2. Update sidebar in `astro.config.mjs` if needed
3. Use correct frontmatter format
4. Follow patterns in `STARLIGHT_PATTERNS.md`
5. Test locally before committing

## 🙋 Support

- WireMock Slack: https://slack.wiremock.org/
- GitHub Issues: https://github.com/wiremock/wiremock
- Starlight Discord: https://astro.build/chat
