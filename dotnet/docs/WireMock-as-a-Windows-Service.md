It's also possible to wrap WireMock in a Windows Service.


# Program.cs

Create a **Program.cs** with the following content:

``` csharp
public static class Program
{
	#region Nested classes to support running as service
	public const string ServiceName = "Wiremock.Net.Service";

	public class Service : ServiceBase
	{
		public Service()
		{
			ServiceName = Program.ServiceName;
		}

		protected override void OnStart(string[] args)
		{
			Start();
		}

		protected override void OnStop()
		{
			Program.Stop();
		}
	}
	#endregion

	private static WireMockServer _server;

	static void Main(string[] args)
	{
		// running as service
		if (!Environment.UserInteractive)
		{
			using (var service = new Service())
			{
				ServiceBase.Run(service);
			}
		}
		else
		{
			// running as console app
			Start();

			Console.WriteLine("Press any key to stop...");
			Console.ReadKey(true);

			Stop();
		}
	}

	private static void Start()
	{
		_server = StandAloneApp.Start(new FluentMockServerSettings
		{
			Urls = new[] { "http://*:9091/" },
			StartAdminInterface = true,
			ReadStaticMappings = true,
			Logger = new WireMockConsoleLogger()
		});
	}

	private static void Stop()
	{
		_server.Stop();
	}
}
```

When you start the exe file in Visual Studio or from the commandline, the application will behave same like [WireMock-as a standalone process](https://github.com/WireMock-Net/WireMock.Net/wiki/WireMock-as-a-standalone-process).

# Example
For a full working example which also provides an **Installer** and batch-files to 
* Install
* Start
* Stop
* Uninstall

the service, see [examples/WireMock.Net.Service](https://github.com/WireMock-Net/WireMock.Net/tree/master/examples/WireMock.Net.Service).
