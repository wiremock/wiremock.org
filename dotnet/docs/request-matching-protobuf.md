## ProtoBufMatcher (ProtoBufMatcher)
Can be used to match a gRPC ProtoBuf message.

See also [mstack.nl blog: gRPC / ProtoBuf Support](https://mstack.nl/blogs/wiremock-net-grpc/).

### Proto Definition
Define a Proto Definition file (greet.proto)

``` proto
syntax = "proto3";
 
package greet;
 
// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply);
}
 
// The request message containing the user's name.
message HelloRequest {
  string name = 1;
}
 
// The response message containing the greetings
message HelloReply {
  string message = 1;
}
```

{% raw %}

#### C# option
Start the WireMock.Net server and define the mapping for the Grpc call:


```csharp
// Read the 'greet.proto' ProtoDefinition file as text and store it in a variable
var protoDefinitionText = File.ReadAllText(@"c:\grpc\greet.proto");

// Define an unique identifier for that ProtoDefinition to make it possible to refer
// to that ProtoDefinition in the different mappings
var protoDefinitionId = "GrpcGreet";

// Start the WireMockServer and enable HTTP/2 support
var server = WireMockServer.Start(useHttp2: true);

server
  // Now call the new AddProtoDefinition method to register this identifier
  // and ProtoDefinition in WireMock.Net
  .AddProtoDefinition(protoDefinitionId, protoDefinitionText)

  // Define the Request matching logic which means in this case:
  // - Match on HTTP POST
  // - Match when the client calls the SayHello method on the Greeter-service
  // - Use a JsonMatcher so that this request is only mapped when the name
  //   equals "stef".
  .Given(Request.Create()
    .UsingPost()
    .WithPath("/grpc/greet.Greeter/SayHello")
    .WithBodyAsProtoBuf("greet.HelloRequest", new JsonMatcher(new { name = "stef" }))
  )

  // Define that this mapping should use the specified protoDefinitionId for both 
  // the Request and the Response
  .WithProtoDefinition(protoDefinitionId)

  // Build a response which will:
  // - Return the correct Content-Type header and Grpc Trailing header
  // - Define the response as an anonymous object and use the Handlebars 
  //   Transformer to return a personalized message
  // - Return a ProtoBuf byte-array response using the HelloReply method
  .RespondWith(Response.Create()
    .WithHeader("Content-Type", "application/grpc")
    .WithTrailingHeader("grpc-status", "0")
    .WithBodyAsProtoBuf("greet.HelloReply",
    new
    {
      message = "hello {{request.BodyAsJson.name}} {{request.method}}"
    })
    .WithTransformer()
  );
```

{% endraw %}

### Multiple Proto Definition files
If you have multiple proto files, you have to follow these 2 rules:
1. The first file provided in the array should be the main proto file.
2. A comment is needed for each referenced (imported) proto file, so that WireMock.Net knows how to resolve.

#### Main proto
``` proto
syntax = "proto3";

import "request.proto";

package greet;

service Greeter {
  rpc SayHello (HelloRequest) returns (HelloReply);
}

message HelloReply {
  string message = 1;
}
```

#### other proto file
``` proto
// request.proto
syntax = "proto3";

package greet;

message HelloRequest {
  string name = 1;
}
```

#### C# code
``` c#
var greet = File.ReadAllText(@"c:\grpc\greet.proto");
var request = File.ReadAllText(@"c:\grpc\request.proto");

. . .

server
  // Now call the new AddProtoDefinition method to register this identifier and the 2 ProtoDefinitions in WireMock.Net
  .AddProtoDefinition(protoDefinitionId, greet, request)
```

#### JSON Mapping option
todo