## Info
Because WireMock.Net uses [MimeKitLite](https://www.nuget.org/packages/MimeKitLite) for multipart parsing, this can introduce errors when your project uses [MimeKit](https://www.nuget.org/packages/MimeKit):

## Issue
`
error CS0433: The type 'MimeMessage' exists in both 'MimeKit, Version=4.1.0.0, Culture=neutral, PublicKeyToken=bede1c8a46c66814' and 'MimeKitLite, Version=4.1.0.0, Culture=neutral, PublicKeyToken=bede1c8a46c66814'
`

## Solution
The only solution for this is to apply the following changes to your project:

``` xml
 <PackageReference Include="MailKit" Version="4.1.0" />

 <!-- ⭐ Add an Alias for the MimeKit NuGet -->
 <PackageReference Include="MimeKit" Version="4.1.0">
   <Aliases>MimeKitAlias</Aliases>
 </PackageReference>

 <PackageReference Include="WireMock.Net" Version="1.5.35" />
```

In your C# code change this:

``` c#
extern alias MimeKitAlias; // ⭐ Add this

namespace MyNamespace
{
    public class MyClass
    {
        public void MyMethod()
        {
            var mail = new MimeKitAlias::MimeKit.MimeMessage(); // ⭐ Use this
        }
    } 
}
```

The code should build now without getting the error.

## :books: References
- https://github.com/WireMock-Net/WireMock.Net/issues/990