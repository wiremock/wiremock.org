# WireMock.Net.Testcontainers 
WireMock.Net.Testcontainers uses [Testcontainers for .NET](https://dotnet.testcontainers.org/) to spinup a docker container directly from the C# (unittest) code. 

This options requires docker service running locally.

Both the [Linux](https://hub.docker.com/repository/docker/sheyenrath/wiremock.net) and the [Windows](https://hub.docker.com/repository/docker/sheyenrath/wiremock.net-windows/general) version from WireMock.Net are supported <sup>:memo:</sup>.

:memo: It's not needed to specify the version, this is determined automatically. (So if you are running Docker on a Windows Host, the Windows Docker image is used, else the Linux Docker image is used. 

## Usage
### Build and Start
To build a container and startup this container, use this code:
``` C#
var container = new WireMockContainerBuilder()
    .WithAutoRemove(true)
    .WithCleanUp(true)
    .Build();

await container.StartAsync().ConfigureAwait(false);
```

#### Methods
The following builder methods are available for the `WireMockContainerBuilder`:

| Method |  Example | What |
| -      | -        | -    |
| `WithMappings` | `.WithMappings(@"C:\example\\mappings")` | Specifies the path for the (static) mapping json files.
| `WithWatchStaticMappings` | `.WithWatchStaticMappings(true)` | Watch the static mapping files + folder for changes when running.
| `WithAdminUserNameAndPassword` | `.WithAdminUserNameAndPassword("x", "y")` | Set the admin username. and password for the container (basic authentication).
| `WithImage` | `.WithImage("sheyenrath/wiremock.net-alpine:1.6.4")` | You can provide a specific image + tag.

### Create a Admin Client
Use the following code to get a [RestEase Admin Client](https://github.com/WireMock-Net/WireMock.Net/wiki/Admin-API-Reference#client-api) for this running container instance.
``` c#
var restEaseApiClient = container.CreateWireMockAdminClient();
```

### Create a HTTP Client
Use the following code to get a HTTP Client for this running container instance to call WireMock.Net
``` c#
var client = container.CreateClient();
var result = await client.GetStringAsync("/test123");
```

## Usage in Unit Test
Follow the tutorial [here](https://github.com/testcontainers/testcontainers-dotnet/blob/develop/examples/WeatherForecast/tests/WeatherForecast.Tests/WeatherForecastTest.cs) and make sure to use WireMock.Net container instead of the container used in that example.