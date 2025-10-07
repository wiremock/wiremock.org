It's also possible to run WireMock as a Web-Application on Azure or IIS.

# References
* https://weblog.west-wind.com/posts/2016/Jun/06/Publishing-and-Running-ASPNET-Core-Applications-with-IIS
* https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/iis/development-time-iis-support?view=aspnetcore-2.1
* https://github.com/WireMock-Net/WireMock.Net/blob/master/examples/WireMock.Net.WebApplication.NETCore3/readme.md
* https://github.com/WireMock-Net/WireMock.Net/issues/564

# WireMockService

### Code
See this code example how a App-Service could look:

``` csharp
public class WireMockService : IWireMockService
{
	private static int sleepTime = 30000;
	private readonly ILogger _logger;
	private readonly IWireMockServerSettings _settings;

	private class Logger : IWireMockLogger
	{
		// Implement all methods from the IWireMockLogger here ...
	}

	public WireMockService(ILogger logger, IWireMockServerSettings settings)
	{
		_logger = logger;
		_settings = settings;

		_settings.Logger = new Logger(logger);
	}

	public void Run()
	{
		_logger.LogInformation("WireMock.Net server starting");

		StandAloneApp.Start(_settings);

		_logger.LogInformation($"WireMock.Net server settings {JsonConvert.SerializeObject(_settings)}");

		while (true)
		{
			_logger.LogInformation("WireMock.Net server running");
			Thread.Sleep(sleepTime);
		}
	}
}
```

### Web.Config
``` xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <!--
    Configure your application settings in appsettings.json. Learn more at http://go.microsoft.com/fwlink/?LinkId=786380
  -->
  <system.webServer>
    <handlers>
      <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified" />
    </handlers>
    <aspNetCore processPath="%LAUNCHER_PATH%" arguments="%LAUNCHER_ARGS%" stdoutLogEnabled="false" stdoutLogFile=".\logs\stdout" forwardWindowsAuthToken="false" />
  </system.webServer>
</configuration>
```

# Example on Windows
For a full working example, see [examples\WireMock.Net.WebApplication.NETCore3](https://github.com/WireMock-Net/WireMock.Net/tree/master/examples/WireMock.Net.WebApplication.NETCore3)

## Publish Settings
![image](https://user-images.githubusercontent.com/249938/197809823-f8607201-74a8-4a53-bfef-bfbebfad8136.png)

# Example on Linux
For a full working example, see [examples\WireMock.Net.WebApplication.NET6](https://github.com/WireMock-Net/WireMock.Net/tree/master/examples/WireMock.Net.WebApplication.NET6)

## Publish settings:
![image](https://user-images.githubusercontent.com/249938/197809430-f8f29770-f283-4273-89a4-6eff03443027.png)

![image](https://user-images.githubusercontent.com/249938/197813900-ec890c9f-ec77-4da5-809e-b2d48a29c5b6.png)