# Info
In case you install WireMock.Net in a project which also uses another dependency which uses `Microsoft.CodeAnalysis.CSharp`, you get an error.

# Error
```
NU1608: Detected package version outside of dependency constraint: Microsoft.CodeAnalysis.CSharp.Workspaces 3.3.1 requires Microsoft.CodeAnalysis.CSharp (= 3.3.1) but version Microsoft.CodeAnalysis.CSharp 3.4.0 was resolved.
NU1107: Version conflict detected for Microsoft.CodeAnalysis.Common. Install/reference Microsoft.CodeAnalysis.Common 3.4.0 directly to project ConsoleApp1x to resolve this issue. 
 ConsoleApp1x -> CS-Script.Core 1.3.1 -> Microsoft.CodeAnalysis.Scripting.Common 3.4.0 -> Microsoft.CodeAnalysis.Common (= 3.4.0) 
 ConsoleApp1x -> Microsoft.VisualStudio.Web.CodeGeneration.Design 3.1.1 -> Microsoft.VisualStudio.Web.CodeGenerators.Mvc 3.1.1 -> Microsoft.VisualStudio.Web.CodeGeneration 3.1.1 -> Microsoft.VisualStudio.Web.CodeGeneration.EntityFrameworkCore 3.1.1 -> Microsoft.VisualStudio.Web.CodeGeneration.Core 3.1.1 -> Microsoft.VisualStudio.Web.CodeGeneration.Templating 3.1.1 -> Microsoft.VisualStudio.Web.CodeGeneration.Utils 3.1.1 -> Microsoft.CodeAnalysis.CSharp.Workspaces 3.3.1 -> Microsoft.CodeAnalysis.Common (= 3.3.1).
Package restore failed. Rolling back package changes for '***'.
```

# Analysis
The problem is that the last dependency (**Microsoft.CodeAnalysis.Common**) uses a different FIXED version.

# Solution
In order to fix this, you need to find out the dependency which uses `Microsoft.CodeAnalysis.Common`, in this example it's `Microsoft.CodeAnalysis.CSharp.Workspaces`.

So you need to reference the 3.4.0 version from `Microsoft.CodeAnalysis.CSharp.Workspaces` in your main project.

When that's done, you can use CS-Script.Core and that other library.