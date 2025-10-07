## Issue
When creating a .NET framework console app targeting .NET 4.7.2 and referencing the WireMock.Net.RestClient NuGet you get this exception when running the application:

`Unhandled Exception: System.IO.FileLoadException: Could not load file or assembly 'RestEase, Version=1.4.10.0, Culture=neutral, PublicKeyToken=null' or one of its dependencies. A strongly-named assembly is required. (Exception from HRESULT: 0x80131044)`

This is because the WireMock.Net assemblies are signed, and RestEase is not signed.

## Solution
The solution is to add the NuGet [Brutal.Dev.StrongNameSigner](https://www.nuget.org/packages/Brutal.Dev.StrongNameSigner/) to your .NET framework console app.

In case the **WireMock.RestClient.dll** is not found anymore: remove and add again the reference to the **WireMock.RestClient.dll** in the project after installing the **Brutal.Dev.StrongNameSigner** nuget.

## Example
For a full working example, see : https://github.com/WireMock-Net/WireMock.Net/tree/master/examples/WireMock.Net.Client.Net472.