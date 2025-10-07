# Using Scenarios

WireMock.Net supports _State_ via the notion of _scenarios_. A scenario is essentially a state machine whose states can be arbitrarily assigned. Stub mappings can be configured to match on scenario state, such that stub A can be returned initially, then stub B once the next scenario state has been triggered.

For example, suppose we’re writing a to-do list application consisting of a rich client of some kind talking to a REST service. We want to test that our UI can read the to-do list, add an item and refresh itself, showing the updated list.

Example test code:
``` csharp
// Assign
_server = WireMockServer.Start();

_server
  .Given(Request.Create()
    .WithPath("/todo/items")
    .UsingGet())
  .InScenario("To do list")
  .WillSetStateTo("TodoList State Started")
  .RespondWith(Response.Create()
    .WithBody("Buy milk"));

_server
  .Given(Request.Create()
    .WithPath("/todo/items")
    .UsingPost())
  .InScenario("To do list")
  .WhenStateIs("TodoList State Started")
  .WillSetStateTo("Cancel newspaper item added")
  .RespondWith(Response.Create()
    .WithStatusCode(201));

_server
  .Given(Request.Create()
    .WithPath("/todo/items")
    .UsingGet())
  .InScenario("To do list")
  .WhenStateIs("Cancel newspaper item added")
  .RespondWith(Response.Create()
    .WithBody("Buy milk;Cancel newspaper subscription"));

// Act and Assert
string url = "http://localhost:" + _server.Ports[0];
string getResponse1 = await new HttpClient().GetStringAsync(url + "/todo/items");
Check.That(getResponse1).Equals("Buy milk");

var postResponse = await new HttpClient().PostAsync(url + "/todo/items", new StringContent("Cancel newspaper subscription"));
Check.That(postResponse.StatusCode).Equals(HttpStatusCode.Created);

string getResponse2 = await new HttpClient().GetStringAsync(url + "/todo/items");
Check.That(getResponse2).Equals("Buy milk;Cancel newspaper subscription");
```

The first Scenario and State definition can also be used in the JSON Admin interface like:
``` json
[
    {
        "Guid": "60d65393-1556-46ad-9206-8a0ab725b099",
        "UpdatedAt": "2023-05-12T20:03:46.693747Z",
        "Scenario": "To do list",
        "SetStateTo": "TodoList State Started",
        "Request": {
            "Path": {
                "Matchers": [
                    {
                        "Name": "WildcardMatcher",
                        "Pattern": "/todo/items",
                        "IgnoreCase": false
                    }
                ]
            },
            "Methods": [
                "GET"
            ]
        },
        "Response": {
            "BodyDestination": "SameAsSource",
            "Body": "Buy milk"
        }
    },
    {
        "Guid": "8bd98789-4b55-4084-bb5b-fba85176f3a6",
        "UpdatedAt": "2023-05-12T20:03:46.6937938Z",
        "Scenario": "To do list",
        "WhenStateIs": "TodoList State Started",
        "SetStateTo": "Cancel newspaper item added",
        "Request": {
            "Path": {
                "Matchers": [
                    {
                        "Name": "WildcardMatcher",
                        "Pattern": "/todo/items",
                        "IgnoreCase": false
                    }
                ]
            },
            "Methods": [
                "POST"
            ]
        },
        "Response": {
            "StatusCode": 201
        }
    },
    {
        "Guid": "0b818c7c-3778-4504-9baf-229aa57bf1e1",
        "UpdatedAt": "2023-05-12T20:03:46.6938425Z",
        "Scenario": "To do list",
        "WhenStateIs": "Cancel newspaper item added",
        "Request": {
            "Path": {
                "Matchers": [
                    {
                        "Name": "WildcardMatcher",
                        "Pattern": "/todo/items",
                        "IgnoreCase": false
                    }
                ]
            },
            "Methods": [
                "GET"
            ]
        },
        "Response": {
            "BodyDestination": "SameAsSource",
            "Body": "Buy milk;Cancel newspaper subscription"
        }
    }
]
```

# Stay in the same State for a number of requests
In case you want to match a request for a certain state multiple times before moving to the next state, you can specify this. Example code:

In the above scenario, if you want to add more items to the ToDo list, like 
- Fixing the car
- Cancel newspaper

And you want to move to the next state when these two requests are matched, set the `times` variable to `2` like this:


``` c#
_server
  .Given(Request.Create()
    .WithPath("/todo/items")
    .UsingPost())
  .InScenario("To do list")
  .WhenStateIs("TodoList State Started")
  .WillSetStateTo("Cancel newspaper item added", 2) // <-- The number of times this match should be matched before the state will be changed to the specified one.
  .RespondWith(Response.Create()
    .WithStatusCode(201));
```