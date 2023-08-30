---
layout: docs
title: Adding Template Helpers
meta_title: Adding custom template helpers
description: Adding custom Handlebars helpers to the template system via extensions
---

Extensions that implement the `TemplateHelperProviderExtension` interface provide additional Handlebars helpers to the templating system:

```java
.extensions(
    new TemplateHelperProviderExtension() {
        @Override
        public String getName() {
            return "custom-helpers";
        }

        @Override
        public Map<String, Helper<?>> provideTemplateHelpers() {
            Helper<String> helper = (context, options) -> context.length();
            return Map.of("string-length", helper);
        }
    }
);
```