---
layout: docs
title: Simulating State with Scenarios
toc_rank: 43
description: Return different responses based on a state machine
---

Some testing activities require that different responses be served for a sequence of identical requests. For instance
if you are testing a to-do list application [such as this one](/docs/exploratory-testing-tutorial/) you may wish to start
with no to-do list items, post a new item, then see the item appear in the list.

Assuming there is a "list to-do items" API call used to fetch the list, this must be called twice during the above test,
returning no items on the first invocation, and the newly added item on the second. Since both of these requests will be
identical (same URL, method, request headers), something additional is required for MockLab to differentiate the first and
second cases.

MockLab's Scenarios solve this problem by providing finite state machines that can be used as additional stub matching conditions.
They allow more than one definition of an otherwise identical stub with different responses based on the current state of the machine.


## Example

To implement the above case, you would declare that the stub returning the empty list is only matched when the scenario state is "Started",
while the stub returning the list with one item is only matched when the scenario state is "First item added".


Start by creating the empty list stub, which is matched only when the scenario named "To do list" is in the "Started" state:

<img title="Empty to-do list stub" src="/images/screenshots/scenarios-empty-list-stub.png" />


Then create a stub to handle posting of the first list item. When triggered this stub will move the scenario state to "First item added":

<img title="To-do list POST stub" src="/images/screenshots/scenarios-post-item-stub.png" />


Finally, create a stub to return the list containing one item, which is matched only then the scenario is in the "First item added" state:

<img title="Single item to-to list stub" src="/images/screenshots/scenario-single-item-stub.png" />


## Testing

First, make a `GET` request to fetch the list, which should be empty. You should be able to do this any number of times
without the result changing:

```
$ curl http://example.mocklab.io/todo-items
{
  "items": []
}
```

Now `POST` a new item (it actually doesn't matter what the request body contains, since we didn't specify a body matcher in the stub):

```
$ curl http://example.mocklab.io/todo-items -X POST
```

This should now have moved the scenario state to "First item added". Getting the list of items again should now return one item:

```
$ curl http://example.mocklab.io/todo-items
{
  "items": [
    {
      "id": "1",
      "description": "Read all about Scenarios"
    }
  ]
}
```

## Scenario reset

All scenarios can be reset to their
"Started" state by clicking <img src="/images/screenshots/scenario-reset-button.png" title="Scenario reset button" style="border: none; height: 50px;" />.
