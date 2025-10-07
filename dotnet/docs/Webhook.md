<br>

It's also possible to define a Webhook (or multiple Webhooks) for a mapping. 

With this you can send request to a specific URL after serving mocked response to a request.

Note that [transformations/templating](https://github.com/WireMock-Net/WireMock.Net/wiki/Response-Templating) is also supported for the `request` and `response` objects.

# Examples
### C#
This is configurable in code:
``` c#
// Option 1
var server = WireMockServer.Start();
server.Given(Request.Create().UsingPost())
    .WithWebhook(new Webhook
    {
        Request = new WebhookRequest
        {
            Url = "https://any-endpoint.com",
            Method = "post",
            BodyData = new BodyData
            {
                BodyAsString = "OK !",
                DetectedBodyType = BodyType.String
            }
        }
    })
    .RespondWith(Response.Create().WithBody("a-response"));

// Option 2
var server2 = WireMockServer.Start();
    server2.Given(Request.Create().UsingPost())
        .WithWebhook("https://any-endpoint.com", "post", null, "OK !", true, TransformerType.Handlebars)
        .RespondWith(Response.Create().WithBody("a-response"));
```

### JSON
Or via posting this mapping:

{% raw %}


``` json
{
    "Guid": "755384f9-2252-433d-ae8b-445b9f1cc729",
    "Priority": 0,
    "Request": {
        "Path": {
            "Matchers": [
                {
                    "Name": "WildcardMatcher",
                    "Pattern": "/wh"
                }
            ]
        },
        "Methods": [
            "POST"
        ]
    },
    "Response": {
        "Body": "<xml>ok</xml>",
        "StatusCode": 201,
        "Headers": {
            "Content-Type": "application/xml"
        }
    },
    "Webhook": {
        "Request": {
            "Url": "https://any-endpoint.com",
            "Method": "POST",
            "Headers": {
                "x": "x-value"
            },
            "Body": "ok - RequestPath used = {{request.path}}, RESP = {{response.StatusCode}}",
            "UseTransformer": true
        }
    }
}
```

{% endraw %}
