# WireMock OSS Documentation

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

This is the source project for the official WireMock OSS documentation, now hosting both the Java and .Net edition docs.

This site is build on Starlight - a static documentation site builder based on Astro.

## Contributing to these docs

We welcome contributions to improve the WireMock documentation! Here's how to get started:

### Running the Dev Server Locally

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start the development server:**
   ```bash
   pnpm dev
   ```

   The site will be available at `http://localhost:4321`

3. **Make your changes:**
   - Edit markdown files in `src/content/docs/`
   - The dev server will automatically reload as you save changes

4. **Preview your changes:**
   - Check your changes in the browser to ensure they look correct
   - Test any links or navigation you've modified

### Submitting Your Contribution

Once you're happy with your changes:

1. Commit your changes with a descriptive commit message
2. Push your changes to your fork (or create a new branch if you have write access)
3. Open a Pull Request against the `main` branch
4. Provide a clear description of what you've changed and why

Your PR will be reviewed by the maintainers. Thank you for contributing to WireMock!



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


## 📚 Further reading

- [Starlight Documentation](https://starlight.astro.build/)
- [Astro Documentation](https://docs.astro.build)

## 🙋 Support

- WireMock Slack: https://slack.wiremock.org/
- Starlight Discord: https://astro.build/chat
