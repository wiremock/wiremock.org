Use this to match a MultiPart Mime Request.

### C# code
``` c#
var textPlainContentTypeMatcher = new ContentTypeMatcher("text/plain");
var textPlainContentMatcher = new ExactMatcher("This is some plain text");
var textPlainMatcher = new MimePartMatcher(MatchBehaviour.AcceptOnMatch, textPlainContentTypeMatcher, null, null, textPlainContentMatcher);

var partTextJsonContentTypeMatcher = new ContentTypeMatcher("text/json");
var partTextJsonContentMatcher = new JsonMatcher(new { Key = "Value" }, true);
var partTextMatcher = new MimePartMatcher(MatchBehaviour.AcceptOnMatch, partTextJsonContentTypeMatcher, null, null, partTextJsonContentMatcher);

var imagePngContentTypeMatcher = new ContentTypeMatcher("image/png");
var imagePngContentDispositionMatcher = new ExactMatcher("attachment; filename=\"image.png\"");
var imagePngContentTransferEncodingMatcher = new ExactMatcher("base64");
var imagePngContentMatcher = new ExactObjectMatcher(Convert.FromBase64String("iVBORw0KGgoAAAANSUhEUgAAAAIAAAACAgMAAAAP2OW3AAAADFBMVEX/tID/vpH/pWX/sHidUyjlAAAADElEQVR4XmMQYNgAAADkAMHebX3mAAAAAElFTkSuQmCC"));
var imagePngMatcher = new MimePartMatcher(MatchBehaviour.AcceptOnMatch, imagePngContentTypeMatcher, imagePngContentDispositionMatcher, imagePngContentTransferEncodingMatcher, imagePngContentMatcher);

var matchers = new IMatcher[]
{
	textPlainMatcher,
	partTextMatcher,
	imagePngMatcher
};

server
	.Given(Request.Create()
		.WithPath("/multipart")
		.UsingPost()
		.WithMultiPart(matchers)
	)
	.WithGuid("b9c82182-e469-41da-bcaf-b6e3157fefdb")
	.RespondWith(Response.Create()
		.WithBody("MultiPart is ok")
	);
```

### JSON:
``` json
{
    "Guid": "b9c82182-e469-41da-bcaf-b6e3157fefdb",
    "UpdatedAt": "2023-07-24T18:12:55.564978Z",
    "Request": {
        "Path": {
            "Matchers": [
                {
                    "Name": "WildcardMatcher",
                    "Pattern": "/multipart",
                    "IgnoreCase": false
                }
            ]
        },
        "Methods": [
            "POST"
        ],
        "Body": {
            "Matchers": [
                {
                    "ContentTypeMatcher": {
                        "Name": "ContentTypeMatcher",
                        "Pattern": "text/plain",
                        "IgnoreCase": false
                    },
                    "ContentMatcher": {
                        "Name": "ExactMatcher",
                        "Pattern": "This is some plain text",
                        "IgnoreCase": false
                    },
                    "Name": "MimePartMatcher"
                },
                {
                    "ContentTypeMatcher": {
                        "Name": "ContentTypeMatcher",
                        "Pattern": "text/json",
                        "IgnoreCase": false
                    },
                    "ContentMatcher": {
                        "Name": "JsonMatcher",
                        "Pattern": {
                            "Key": "Value"
                        },
                        "IgnoreCase": true
                    },
                    "Name": "MimePartMatcher"
                },
                {
                    "ContentTypeMatcher": {
                        "Name": "ContentTypeMatcher",
                        "Pattern": "image/png",
                        "IgnoreCase": true
                    },
                    "ContentDispositionMatcher": {
                        "Name": "ExactMatcher",
                        "Pattern": "attachment; filename=\"image.png\"",
                        "IgnoreCase": true
                    },
                    "ContentTransferEncodingMatcher": {
                        "Name": "ExactMatcher",
                        "Pattern": "base64",
                        "IgnoreCase": true
                    },
                    "ContentMatcher": {
                        "Name": "ExactObjectMatcher",
                        "Pattern": "iVBORw0KGgoAAAANSUhEUgAAAAIAAAACAgMAAAAP2OW3AAAADFBMVEX/tID/vpH/pWX/sHidUyjlAAAADElEQVR4XmMQYNgAAADkAMHebX3mAAAAAElFTkSuQmCC"
                    },
                    "Name": "MimePartMatcher"
                }
            ],
            "MatchOperator": "Or"
        }
    },
    "Response": {
        "BodyDestination": "SameAsSource",
        "Body": "MultiPart is ok"
    }
}
```
