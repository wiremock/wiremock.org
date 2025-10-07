# Contributing to the WireMock website

All contributions to the website are welcome! Whether you develop new documentation, want to share your use-case, fix an issue or improve the websites look and feel...  just submit a pull request! See the contributor notes below.

General WireMock contributing guide is available [here](https://github.com/wiremock/community/tree/main/contributing).

## Discussing changes 

Make sure to join the community [Slack](https://slack.wiremock.org/) as documented in the contributing guide. After that, all changes can be discussed in the `#help-contributing` or `#documentation` channels. Do not hesitate to ask there is you hit an obstacle.

## Preparing the developer environment

The website is powered by [mkdocs-material](https://squidfunk.github.io/mkdocs-material/getting-started/), and hence a [python developer environment](https://www.python.org/downloads/) is needed. It is recommended to use the latest python3 version to avoid compatibility issues.

Ideally you should set up a python [virtual environment](https://realpython.com/what-is-pip/#using-pip-in-a-python-virtual-environment) within the project folder to avoid [pip](https://pip.pypa.io/en/stable/) package installer conflicts. 


## File Structure

All documentation sources should be written as regular Markdown files placed in the documentation directory. In this project we make use of the [mkdocs-monorepo-plugin](https://backstage.github.io/mkdocs-monorepo-plugin/) to allow us to have multiple documentation sets of documentation in a single mkdocs folder. This allows us to have multiple `docs/` folders: `java`, `dotnet` and `v4`. 

```
.
├── dev                           # dev scripts
│   ├── build.sh
│   ├── clean.sh
│   ├── common.sh
│   ├── serve.sh
│   └── setup_env.sh
├── docs                          # mkdocs entry point
│   ├── assets
│   │   ├── images
│   │   ├── scripts
│   │   └── stylesheets
│   └── index.md
├── dotnet                        # .NET documentation
│   ├── docs
│   |   ├── index.md
│   |   └── ...
│   └── mkdocs.yml
├── java                          # JAVA documentation
│   ├── docs
│   │   ├── index.md
│   │   └── ...
│   └── mkdocs.yml
├── v4                            # Beta documentation
│   ├── docs
│   │   ├── index.md
│   │   └── ...
│   └── mkdocs.yml
├── mkdocs.yml                    # config file
├── nav.yml                       
├── overrides                     # custom pages
│   ├── main.html
│   └── partials
│       ├── copyright.html
│       ├── header.html
│       ├── nav.html
│       ├── search.html
│       └── tabs.html
├── README.md
└── requirements.txt

```

## Writing your docs

Mkdocs pages must be authored in [Markdown](https://daringfireball.net/projects/markdown/). MkDocs uses the Python-Markdown library to render Markdown documents to HTML. In addition to the base Markdown [syntax](https://daringfireball.net/projects/markdown/syntax) MkDocs includes support for extending the syntax with [Python-Markdown extensions](https://squidfunk.github.io/mkdocs-material/setup/extensions/python-markdown-extensions/) these can be enabled or disabled as needed in the `mkdocs.yml` config file.

### Creating a new documentation set

In the documentation structure there are three documentation sets `Java`, `.NET` and `Beta`.  To create a new documentation set do the following:

  - Create a subfolder within the `root` folder, with a `mkdocs.yml` with the `site_name` and `nav` configured, as well as a `docs/` folder with an `index.md`

      ```yml
      site_name: java
      docs_dir: ./docs

      nav:
        - WireMock Java: index.md
        - Getting started:
          - Overview: overview/
          - Quick Start API Mocking with Java and JUnit 4: java-junit/
          - Download and Install: download-and-installation/
          - WireMock Tutorials: docs/getting-started/
          - Frequently Asked Questions: faq/
          - Community Resources: external-resources/
      ...
      ```



      > Note: Each docs folder must have an `index.md` entry point configured in the `nav` to enable navigation to that set of documentation. 
      > ```yml
      > nav:
      >    - WireMock Java: index.md
      > ```

  - Back in in the root `mkdocs.yml`, use the `!include` syntax in the `nav.yml` in the `root` folder to link to the subfolder `mkdocs.yml`

      ```yml
      nav:
        - WireMock Java: "!include ./java/mkdocs.yml" 
        
        - WireMock .NET: "!include ./dotnet/mkdocs.yml"

        - WireMock Beta: "!include ./v4/mkdocs.yml"
      ```

### Pages and Navigation

To add a new document to your MkDocs project, follow these steps:

  - Create a new Markdown file inside the `docs/` subfolder within the approrite documentation set. An example would `java/docs/index.md`.
  - Update the `mkdocs.yml` in the documentation set, if you want the new document to appear in the site's navigation. 

The [nav](https://www.mkdocs.org/user-guide/configuration/#nav) setting in the `mkdocs.yml` file defines which pages are included in the global site navigation menu as well as the structure of that menu.

Here is a sample navigation configuration from the project:

```yml
nav:
  - WireMock Java: index.md
  - Getting started:
    - Overview: overview/
    - Quick Start API Mocking with Java and JUnit 4: java-junit/
    - Download and Install: download-and-installation/
    - WireMock Tutorials: docs/getting-started/
    - Frequently Asked Questions: getting_started/frequently_asked_questions.md
    - Community Resources: external-resources/
 ...
```

Navigation subsections can be created by listing related pages together under a section title.

> Note that any pages not listed in the navigation configuration will still be rendered and included in the built site, however, they will not be linked from the global navigation and will not be included in the `previous` and `next` links. Such pages will be `hidden` unless linked to directly.

All paths in the navigation configuration must be relative to the documentation directory which can be configure with the `docs_dir` option in `mkdocs.yml`. The default value is set to `docs`.

> Note: If a title is defined for a page in the navigation , that title will override any title defined within the page itself.

### Links

Mkdocs allows for linking documents using the regular Markdown [link syntax](https://daringfireball.net/projects/markdown/syntax#link)  

- Linking to pages

  `[WireMock](https://github.com/wiremock/wiremock/)`
  `[Wiremock Tutorials](../docs/getting-started/)`

  MkDoc will automatically convert internal links like `../docs/getting-started/` into proper links to the corresponding generated HTML page `/getting-started/` so ensure to include the relative directory path in the link if the target document is in another directory.

  > Note: The path should be relative to the current Markdown file, not the root.

- Linking to images
  
  `![Screenshot](img/screenshot.png)`

  To include images in your documentation source files, simply use any of the regular Markdown image syntaxes

- Linking from raw HTML

  Markdown allows authors to fall back to raw HTML when the syntax does not meet the authors needs. 
  
  > Note: All HTML within the markdown file is ignored by the Markdown parser and as such MkDocs will not be able to validate or convert links contained in raw HTML. Ensure all links within this are manually formatted appropriately for the rendered document.

   `<img src="../../assets/images/logos/technology/android.svg">`

   This is an example of a link within raw HTML , we add `../../` to ensure the path to the image works relative to the location of the generated HTML file, not the Markdown file.

- Link to a section

  MKDocs generates an ID for every header in the Markdown documents. This ID can be used to link to a section within the target document using an anchor link.

  `[Wiremock Community](./support.md#wiremock_community)`

  > Note: IDs are created from the text of a header. All text is converted to lowercase and any disallowed characters, including white-space, are converted to dashes. Consecutive dashes are then reduced to a single dash.

### Fenced Code Blocks

MkDocs provides different ways to set up syntax highlighting for code blocks.

- Code blocks

````
 ```java
  wireMockServer.stubFor(requestMatching(request ->
      MatchResult.of(request.getBody().length > 2048)
  ).willReturn(aResponse().withStatus(422)));
 ``` 
````

- Code Tabs

````
  === "Java"

      ```java
      stubFor(get(urlEqualTo("/local-transform")).willReturn(aResponse()
              .withStatus(200)
              .withBody("Original body")
              .withTransformers("my-transformer", "other-transformer")));
      ```

  === "JSON"

      ```json
      {
          "request": {
              "method": "GET",
              "url": "/local-transform"
          },
          "response": {
              "status": 200,
              "body": "Original body",
              "transformers": ["my-transformer", "other-transformer"]
          }
      }
      ```
````

### Admonitions

MkDocs provides [callouts](https://squidfunk.github.io/mkdocs-material/reference/admonitions/?h=admon#supported-types) for including side content. The project has a custom callout for Wiremock Cloud that can be used with the following syntax:

```
!!! wiremock-cloud "WireMock Cloud"

    [Create stubs and scenarios with WireMock Cloud's intuitive editor and share with your team.](https://www.wiremock.io?utm_source=oss-docs&utm_medium=oss-docs&utm_campaign=cloud-callouts-proxying&utm_id=cloud-callouts&utm_term=cloud-callouts-proxying)

```


### Document content

MkDocs attempts to derive the document title with four methods; the nav title, the `title` meta-data key at the start of a document, the level 1 markdown header `#` and the filename of the document.

To avoid unexpected outcomes , it is important to define the title of the document in the document meta-data, as shown below:

```
  ---
  title: Lorem ipsum dolor sit amet 
  ---

  <br>

  # Lorem ipsum dolor sit amet

```
> Note: Include the `<br>` before the start of a document to ensure the breadcrumb links `Documentation / getting_started / overview` are correctly displayed at the start of the document.

### Variables

This project comes packaged with the [mkdocs-macros plugin](https://mkdocs-macros-plugin.readthedocs.io/en/latest/) that provides variable substitution capabilities. In the config file `mkdocs.yml` , define variables in the `extra:` section:


```yml
  extra:
    wiremock_version: 3.13.1
    wiremock_4_version: 4.0.0-beta.10
```

These variables can then be shared across the documents within macros `{{ wiremock_version }}` and the correct value will be substituted. 

<blockquote>

Note: Sometimes you may need to disable mkdocs from rendering a section your document with the conflicting syntax `{{ }}`. In this case disable rendering with  

```
  {% raw %}
  
  {{ variable }}

  {% endraw %} 
```

Without `{% raw %}`, MkDocs will try to render `{{ variable }}` as a real variable (which may break your build or show unexpected output).

</blockquote>

### Overrides

MkDocs Material allows for [extensive customization](https://squidfunk.github.io/mkdocs-material/customization/#extending-the-theme) through theme extension and overrides, enabling users to modify the appearance and behavior of their documentation site without directly altering the core theme files. It involves creating a `custom_dir` (often named `overrides`) in the project root, alongside the `mkdocs.yml` file. This contains all custom templates.

This project has the following pages customized:

  ```
  .
  └── overrides                     # custom_dir
      ├── main.html
      └── partials
          ├── copyright.html
          ├── header.html
          ├── nav.html
          ├── search.html
          └── tabs.html
  ```

The primary customization involves the `header.html` file. This file contains the static links used in the header navigation dropdowns. These links can be modified or updated directly within `header.html`, below is an example of a dropdown in the `header.html` file.

```html
    <div class="header__links">
      <div class="dropdown">
        <a href="https://wiremock.org/docs" class="header__link"> Docs </a>
        <div class="dropdown-content">
          <a href="https://wiremock.org/docs/"> WireMock </a>

          <a href="https://wiremock.org/docs/mock-api-templates">
            Mock API Templates
          </a>

          <a
            href="https://docs.wiremock.io/overview/?utm_source=wiremock.org&amp;utm_medium=masthead_doc-links&amp;utm_campaign=2022_baseline"
          >
            WireMock Cloud
          </a>

          <a href="https://wiremock.org/external-resources">
            External Resources
          </a>

          <a href="https://wiremock.org/2.x/docs/"> WireMock 2.x (Archive) </a>
        </div>
      </div>

    ...

    </div>

```

## Build and Serve

The repo includes a few convenience scripts to help setup and run the project in the `dev` directory. 

- Setup

This script simply installs all dependencies in the `requirements.txt`

```bash
./dev/setup_env.sh
```

- Serve

This script starts the mkdocs live preview server so you can preview as you write your documentation. The server will automatically rebuild the site upon saving. 

> Note: If you make changes to the config files the server will have to be restarted manually for the changes to be reflected

```bash
./dev/serve.sh
```

- Build

This builds the mkdocs documentation which generates a `site` folder with the rendered HTML documents.

```bash
./dev/build.sh
```

Mkdocs provides [additional options](https://www.mkdocs.org/user-guide/cli/) for the commandline interface if needed.

## Additional resources

Here are some additional resources on Mkdocs, Themes and Plugins used in the project.

  - [Mkdocs Material Theme documentation](https://squidfunk.github.io/mkdocs-material/getting-started/)
  - [MKdocs documentation](https://www.mkdocs.org/getting-started/)
  - [Mkdocs Monorepo plugin](https://backstage.github.io/mkdocs-monorepo-plugin/)
  - [Mkdocs Macros plugin](https://mkdocs-macros-plugin.readthedocs.io/en/latest/)
  - [Pymdownx Extensions plugin](https://facelessuser.github.io/pymdown-extensions/)









