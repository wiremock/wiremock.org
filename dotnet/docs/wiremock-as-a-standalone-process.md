# WireMock as a standalone process
This is quite straight forward to launch a mock server within a console application.

### Option 1 : using the WireMock.Net.StandAlone library.
(https://www.nuget.org/packages/WireMock.Net.StandAlone/)
```c#
class Program
{
    static void Main(string[] args)
    {
        StandAloneApp.Start(args);

        Console.WriteLine("Press any key to stop the server");
        Console.ReadKey();
    }
}
```

See [[WireMock commandline parameters]] for all supported commandline arguments.

### Option 2 : using the WireMock.Net.StandAlone library using the settings object
```c#
class Program
{
    static void Main(string[] args)
    {
        // see source code for all the possible properties
        var settings = new WireMockServerSettings
            {
                AllowPartialMapping=true,
                StartAdminInterface=true
            };
        StandAloneApp.Start(settings);

        Console.WriteLine("Press any key to stop the server");
        Console.ReadKey();
    }
}
```

### Option 3 : coding yourself
```c#
static void Main(string[] args)
{
    int port;
    if (args.Length == 0 || !int.TryParse(args[0], out port))
        port = 8080;

    var server = WireMockServer.Start(port);
    Console.WriteLine("WireMockServer running at {0}", string.Join(",", server.Ports));

    // Order of rules matters. First matching is taken.
    server
        .Given(Request.Create().WithPath(u => u.Contains("x")).UsingGet())
        .RespondWith(Response.Create()
            .WithStatusCode(200)
            .WithHeader("Content-Type", "application/json")
            .WithBody(@"{ ""result"": ""/x with FUNC 200""}"));

    server
        .Given(Request.Create().WithPath("/*").UsingGet())
        .RespondWith(Response.Create()
            .WithStatusCode(200)
            .WithHeader("Content-Type", "application/json")
            .WithBody(@"{ ""msg"": ""Hello world!""}")
        );

    server
        .Given(Request.Create().WithPath("/data").UsingPost().WithBody(b => b.Contains("e")))
        .RespondWith(Response.Create()
            .WithStatusCode(201)
            .WithHeader("Content-Type", "application/json")
            .WithBody(@"{ ""result"": ""data posted with FUNC 201""}"));

    server
        .Given(Request.Create().WithPath("/data").UsingPost())
        .RespondWith(Response.Create()
            .WithStatusCode(201)
            .WithHeader("Content-Type", "application/json")
            .WithBody(@"{ ""result"": ""data posted with 201""}"));

    server
        .Given(Request.Create().WithPath("/data").UsingDelete())
        .RespondWith(Response.Create()
            .WithStatusCode(200)
            .WithHeader("Content-Type", "application/json")
            .WithBody(@"{ ""result"": ""data deleted with 200""}"));

    Console.WriteLine("Press any key to stop the server");
    Console.ReadKey();

    Console.WriteLine("Displaying all requests");
    var allRequests = server.LogEntries;
    Console.WriteLine(JsonConvert.SerializeObject(allRequests, Formatting.Indented));

    Console.WriteLine("Press any key to quit");
    Console.ReadKey();
}
```

## Workaround for Microsoft.Owin.Host.HttpListener exception
Note that when using WireMock in a **NET 4.5x**, **NET 4.6.x** project, you can get this exception when running your console application:

> Unhandled Exception: System.Exception: Service start failed with error: The server factory could not be located for > the given input: Microsoft.Owin.Host.HttpListener ---> System.MissingMemberException: The server factory could not be located for the given input: Microsoft.Owin.Host.HttpListener

The solution is to add the `Microsoft.Owin.Host.HttpListener` (version **4.0.0**) NuGet package to your hosting console application.