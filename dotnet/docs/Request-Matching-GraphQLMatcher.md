# GraphQL Schema (GraphQLMatcher)
Can be used to match a GraphQL `Query` using GraphQL Schema (`Mutation` is not yet supported I think...)

## Define a mappings which include a GraphQL Schema which should be used for matching that body:
### C#
```csharp
private const string TestSchemaQueryStudents =
    """
    type Query {
        students:[Student]
    }

    type Student {
        id:ID!
        firstName:String
        lastName:String
        fullName:String 
    }
    """;

private const string TestSchemaQueryStudentById =
    """
    type Query {
        studentById(id:ID!):Student
    }

    type Student {
        id:ID!
        firstName:String
        lastName:String
        fullName:String 
    }
    """;

var server = WireMockServer.Start();
server
    .Given(Request.Create()
        .WithPath("/graphql")
        .UsingPost()
        .WithGraphQLSchema(TestSchemaQueryStudents)
    )
    .RespondWith(Response.Create()
        .WithHeader("Content-Type", "application/json")
        .WithBody(
            """
            {
              "data": {
                "students": [
                  {
                    "id": "1",
                    "firstName": "Alice",
                    "lastName": "Johnson",
                    "fullName": "Alice Johnson"
                  },
                  {
                    "id": "2",
                    "firstName": "Bob",
                    "lastName": "Smith",
                    "fullName": "Bob Smith"
                  }
                ]
              }
            }
            """)
    );

server
    .Given(Request.Create()
        .WithPath("/graphql")
        .UsingPost()
        .WithGraphQLSchema(TestSchemaQueryStudentById)
        .WithBody(new JsonPartialWildcardMatcher("{ \"variables\": { \"sid\": \"1\" } }"))
    )
    .WithTitle("Student found")
    .RespondWith(Response.Create()
        .WithHeader("Content-Type", "application/json")
        .WithBody(
            """
            {
              "data": {
                "studentById": {
                  "id": "123",
                  "firstName": "John",
                  "lastName": "Doe",
                  "fullName": "John Doe"
                }
              }
            }
            """)
    );

server
    .Given(Request.Create()
        .WithPath("/graphql")
        .UsingPost()
        .WithGraphQLSchema(TestSchemaQueryStudentById)
    )
    .WithTitle("Student not found")
    .RespondWith(Response.Create()
        .WithHeader("Content-Type", "application/json")
        .WithBody(
            """
            {
              "data": null
            }
            """)
    );
```

## Use / Test
When WireMock.Net is started (see above) with that GraphQL Schema, a client can send GraphQL:

### Query Students
#### Request
``` cmd
curl --location 'http://localhost:9091/graphql' \
--header 'Content-Type: application/json' \
--data '{"query":"{\r\n  students {\r\n    fullName\r\n    id\r\n  }\r\n}","variables":{}}'
```

#### Response
``` json
{
    "data": {
        "students": [
            {
                "id": "1",
                "firstName": "Alice",
                "lastName": "Johnson",
                "fullName": "Alice Johnson"
            },
            {
                "id": "2",
                "firstName": "Bob",
                "lastName": "Smith",
                "fullName": "Bob Smith"
            }
        ]
    }
}
```

### Query Student by Id
#### Request
``` cmd
curl --location 'http://localhost:9091/graphql' \
--header 'Content-Type: application/json' \
--data '{"query":"query ($sid: ID!)\r\n{\r\n  studentById(id: $sid) {\r\n    fullName\r\n    id\r\n  }\r\n}","variables":{"sid":"1"}}'
```

#### Response
``` json
{
    "data": {
        "studentById": {
            "id": "123",
            "firstName": "John",
            "lastName": "Doe",
            "fullName": "John Doe"
        }
    }
}
```