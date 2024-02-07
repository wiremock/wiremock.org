---
description: >
    attach arbitrary metadata to stub mappings,
    to use later in search, deletion, or retrieval.
---

# Associating and using metadata with API stubs

You can attach arbitrary metadata to stub mappings, to be used later for any of the following:

- search. 
- deletion.
- retrieval.

## Adding metadata to stubs

Data under the `metadata` key is a JSON object, represented in Java by a `Map<String, ?>`, and can be added to a stub mapping on creation.

=== "Java"

    ```java
    stubFor(get("/with-metadata")
        .withMetadata(metadata()
            .attr("singleItem", 1234)
            .list("listItem", 1, 2, 3, 4)
            .attr("nestedObject", metadata()
                .attr("innerItem", "Hello")
            )
    ));
    ```

=== "JSON"

    ```json
    {
        "request": {
            "url": "/with-metadata"
        },
        "response": {
            "status": 200
        },

        "metadata": {
            "singleItem": 1234,
            "listItem": [1, 2, 3, 4],
            "nestedObject": {
                "innerItem": "Hello"
            }
        }
    }
    ```

## Search for stubs by metadata

To find stubs by matching against their metadata, use the same matching strategies as when you use [matching HTTP requests](./request-matching.md).
The most useful matcher for this is `matchesJsonPath`:

=== "Java"

    ```java
    List<StubMapping> stubs =
        findStubsByMetadata(matchingJsonPath("$.singleItem", containing("123")));
    ```

=== "JSON"

    ```json
    POST /__admin/mappings/find-by-metadata

    {
        "matchesJsonPath" : {
        "expression" : "$.singleItem",
        "contains" : "123"
        }
    }
    ```

## Remove stubs by metadata

Similarly, stubs with matching metadata can be removed:

=== "Java"

    ```java
    removeStubsByMetadata(matchingJsonPath("$.singleItem", containing("123")));
    ```

=== "JSON"

    POST /__admin/mappings/remove-by-metadata

    ```json
    {
        "matchesJsonPath" : {
        "expression" : "$.singleItem",
        "contains" : "123"
        }
    }
    ```

## Remove request journal events by metadata

See [Removing items from the journal](./verifying.md#by-criteria)
