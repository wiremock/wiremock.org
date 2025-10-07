# Welcome to WireMock .NET

<p>
  WireMock .NET is a powerful .NET library for API mock testing. It's the .NET 
  implementation of the popular WireMock tool, providing API simulation capabilities
  for testing, development, and integration scenarios. Create stable test environments,
  isolate from unreliable third-party services, and simulate APIs that don't exist yet.
</p>

<h2>Getting Started</h2>

<div class="grid-container">
  <a class="card" href="What-Is-WireMock.Net/">
    <img src="assets/images/logos/doc-sections/summary.svg" />
    Overview
  </a>
  <a class="card" href="Using-WireMock-in-UnitTests/">
    <img src="assets/images/logos/doc-sections/quickstart.svg" />
    Quick Start
  </a>
  <a class="card" href="https://www.nuget.org/packages/WireMock.Net/" target="_blank">
    <img src="assets/images/logos/technology/npm.svg" />
    NuGet Package
  </a>
  <a class="card" href="References/">
    <img src="assets/images/logos/doc-sections/help.svg" />
    Get Help
  </a>
</div>

<h2>Deployment Options</h2>

<p>
  WireMock.Net provides multiple deployment options for different scenarios,
  from unit testing to standalone services and cloud deployments.
</p>

<div class="grid-container">
  <a class="card" href="Using-WireMock-in-UnitTests/">
    <img src="assets/images/logos/doc-sections/checklist.svg" />
    Unit Testing
  </a>
  <a class="card" href="WireMock-as-a-standalone-process/">
    <img src="assets/images/logos/technology/dotnet.svg" />
    Standalone Process
  </a>
  <a class="card" href="WireMock-as-dotnet-tool/">
    <img src="assets/images/logos/doc-sections/download.svg" />
    .NET Tool
  </a>
  <a class="card" href="WireMock-as-a-Windows-Service/">
    <img src="assets/images/logos/doc-sections/cloud.svg" />
    Windows Service
  </a>
  <a class="card" href="WireMock-as-a-(Azure)-Web-App/">
    <img src="assets/images/logos/doc-sections/cloud.svg" />
    Azure Web App
  </a>
  <a class="card" href="Using-WireMock.Net.Testcontainers/">
    <img src="assets/images/logos/technology/docker.svg" />
    Testcontainers
  </a>
</div>

<h2>Key Features</h2>

<p>
  Explore WireMock.Net's powerful features for comprehensive API mocking and testing.
</p>

<div class="grid-container">
  <a class="card card-use-case" href="Request-Matching/">
    <img src="assets/images/requestIcon.svg" alt="Request Matching" />
    Advanced request matching
  </a>
  <a class="card card-use-case" href="Response-Templating/">
    <img src="assets/images/responseIcon.svg" alt="Response Templating" />
    Dynamic response templating
  </a>
  <a class="card card-use-case" href="Stubbing/">
    <img src="assets/images/httpIcon.svg" alt="Stubbing" />
    HTTP API stubbing
  </a>
  <a class="card card-use-case" href="Faults/">
    <img src="assets/images/faultIcon.svg" alt="Fault Simulation" />
    Fault and latency injection
  </a>
  <a class="card card-use-case" href="Scenarios-and-States/">
    <img src="assets/images/logos/doc-sections/connect.svg" alt="Scenarios" />
    Scenarios and state management
  </a>
  <a class="card card-use-case" href="Proxying/">
    <img src="assets/images/logos/doc-sections/link.svg" alt="Proxying" />
    HTTP proxying
  </a>
</div>

<style>
  .md-sidebar.md-sidebar--secondary{
    display: none;
  }

  .grid-container {
    display: grid;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2rem;
    max-width: 160rem;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(10.5rem, 1fr));
    vertical-align: middle;
  }

  .card {
    display: flex;
    flex-direction: column;
    border: 3px solid #18253d !important;
    color: #18253d;
    border-radius: 0.75rem;
    height: 5.5rem;
    width: 10.5rem;
    font-size: 0.8rem;
    font-weight: 600;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    margin: 0.25rem;
    box-sizing: border-box;
    word-wrap: break-word;
    line-height: 1.2;
    background-color: white;
    position: relative;
    z-index: 1;
  }

  .card-use-case {
    height: 7rem;
    font-size: 0.75rem;
    line-height: 1.15;
    padding: 0.4rem;
  }

  .card > img {
    width: 2rem;
    height: auto;
    border-style: none;
    margin-bottom: 0.4rem;
    flex-shrink: 0;
  }

  .md-content a:hover {
    text-decoration: underline; 
  }

  .md-content a {
    color: #18253d !important;
  }

</style>