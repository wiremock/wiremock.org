---
title: "Adding Template Model Data"
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



```handlebars
{{mydata.path}}
```

