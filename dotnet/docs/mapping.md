# Mapping

WireMock.Net is controlled by mappings which define the **Request** and how this should be matched. And the **Response** is defined; what response should be returned.

## Adding or updating mappings

Adding or updating mappings can be done via the 

- [REST Admin interface](https://github.com/WireMock-Net/WireMock.Net/wiki/Admin-API-Reference) 
- [Via C# code](https://github.com/WireMock-Net/WireMock.Net/wiki/WireMock-as-a-standalone-process#option-3--coding-yourself)
- [Static Mappings](#StaticMappings)


## Static Mappings
It's also possible to copy the mapping files in a folder so that these will be picked up when starting the WireMock.Net server.

Place the .json mappings files in `__admin\mappings` folder.

For example, see [this location](https://github.com/WireMock-Net/WireMock.Net/tree/master/examples/WireMock.Net.Console.NET5/__admin/mappings).

See also [the settings](https://github.com/WireMock-Net/WireMock.Net/wiki/Settings#readstaticmappings) for more information about how to define the settings.