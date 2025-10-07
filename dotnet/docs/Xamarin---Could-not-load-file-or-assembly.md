When using WireMock.Net in a Xamarin test project, you can encounter these errors:

## Could not load file or assembly 'System.Memory, Version=4.0.1.0
```
WireMock.Exceptions.WireMockException : Service start failed with error: One or more errors occurred. (Could not load type of field 'Microsoft.AspNetCore.Server.Kestrel.Transport.Sockets.SocketTransportOptions:<MemoryPoolFactory>k__BackingField' (1) due to: Could not load file or assembly 'System.Memory, Version=4.0.1.0, Culture=neutral, PublicKeyToken=cc7b13ffcd2ddd51' or one of its dependencies.)
  ----> System.AggregateException : One or more errors occurred. (Could not load type of field 'Microsoft.AspNetCore.Server.Kestrel.Transport.Sockets.SocketTransportOptions:<MemoryPoolFactory>k__BackingField' (1) due to: Could not load file or assembly 'System.Memory, Version=4.0.1.0, Culture=neutral, PublicKeyToken=cc7b13ffcd2ddd51' or one of its dependencies.)
  ----> System.TypeLoadException : Could not load type of field 'Microsoft.AspNetCore.Server.Kestrel.Transport.Sockets.SocketTransportOptions:<MemoryPoolFactory>k__BackingField' (1) due to: Could not load file or assembly 'System.Memory, Version=4.0.1.0, Culture=neutral, PublicKeyToken=cc7b13ffcd2ddd51' or one of its dependencies.
TearDown : System.NullReferenceException : Object reference not set to an instance of an object
```

or

```
The operation failed.
Bind result: hr = 0x80070002. The system cannot find the file specified.

Assembly manager loaded from:  C:\Windows\Microsoft.NET\Framework\v4.0.30319\clr.dll
Running under executable  C:\git\WireMock.Net\examples\WireMock.Net.Console.Net461.Classic\bin\Debug\WireMock.Net.Console.Net461.Classic.exe
```


### Solutions:

#### 1. Adding System.Memory and System.Threading.Tasks.Extensions as NuGet references.

#### 2. Assembly binding redirects
Adding assembly binding redirects to the app.config for the assemblies which have an error.
Like:
``` xml
<runtime>
    <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
      <dependentAssembly>
        <assemblyIdentity name="System.Buffers" publicKeyToken="cc7b13ffcd2ddd51" culture="neutral" />
        <bindingRedirect oldVersion="4.0.2.0-4.0.3.0" newVersion="4.0.3.0" />
      </dependentAssembly>

      <dependentAssembly>
        <assemblyIdentity name="System.Numerics.Vectors" publicKeyToken="b03f5f7f11d50a3a" culture="neutral"/>
        <bindingRedirect oldVersion="4.0.0.0-4.1.4.0" newVersion="4.1.4.0"/>
      </dependentAssembly>
    </assemblyBinding>
  </runtime>
```