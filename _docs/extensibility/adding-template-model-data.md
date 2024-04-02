---
layout: docs
title: Adding Template Model Data
meta_title: Adding Template Model Data
description: Adding extra elements to the template model during request processing
---

Extensions that implement the `TemplateModelDataProviderExtension` interface provide additional model elements to the templating system:

```java
new WireMockServer(.extensions(
    new TemplateModelDataProviderExtension() {
        @Override
        public Map<String, Object> provideTemplateModelData(ServeEvent serveEvent) {
            return Map.of(
                "mydata", Map.of("path", serveEvent.getRequest().getUrl()));
        }

        @Override
        public String getName() {
            return "custom-model-data";
        }
    }
));
```

This can then be accessed via the templating system e.g.:

{% raw %}

```handlebars
{{mydata.path}}
```

{% endraw %}