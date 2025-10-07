# Development Information

This page described some more details about the supported .NET frameworks and some build information.

## Frameworks
The following frameworks are supported:
- net 4.5.1 and up (Microsoft.AspNet.WebApi.OwinSelfHost version 5.2.6)
- net 4.6.1 and up (Microsoft.AspNetCore version 2.1.2)
- netstandard 1.3 (Microsoft.AspNetCore version 1.1.7)
- netstandard 2.0 (Microsoft.AspNetCore version 2.1.2)

## Build info
To building on **Windows** you need:
- Microsoft .NET Framework [4.5.1 Developer Pack](https://www.microsoft.com/en-us/download/details.aspx?id=40772)
- Microsoft .NET Framework [4.5.2 Developer Pack](https://www.microsoft.com/en-us/download/details.aspx?id=42637)
- Microsoft .NET Framework [4.6 Targeting Pack](https://www.microsoft.com/en-us/download/confirmation.aspx?id=48136)
- Microsoft .NET Framework [4.6.1 Developer Pack](https://www.microsoft.com/en-us/download/details.aspx?id=49978)
- .NET Core 1.1 (https://www.microsoft.com/net/download/dotnet-core/1.1)
- .NET Core 2.0 (https://www.microsoft.com/net/download/dotnet-core/2.0)

To build on **Linux** (_not tested yet..._) you need:
- Mono ?
- .NET Core 1.1 (https://www.microsoft.com/net/download/dotnet-core/1.1)
- .NET Core 2.0 (https://www.microsoft.com/net/download/dotnet-core/2.0)

## Build info VSCode
For building and running all code in VSCode:

- download nuget.exe from https://www.nuget.org/downloads
- copy nuget.exe to a folder which is listed in the path or just in c:\Windows
- go to the root from this project and run `nuget restore`
- all packages are now restored into the `WireMock.Net\packages` folder

### Note
An example project like `WireMock.Net.Console.Net452.Classic` still shows some red errors in VSCode, but you can just run `dotnet build`.
But you can just execute `.\bin\Debug\WireMock.Net.ConsoleApplication.exe` to run the application

## Coding Guidelines
**todo**