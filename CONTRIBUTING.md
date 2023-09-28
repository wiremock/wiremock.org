# Contributing to the WireMock website

[![a](https://img.shields.io/badge/slack-Join%20us-brightgreen?style=flat&logo=slack)](https://slack.wiremock.org/)

All contributions to the website are welcome!
Whether you develop new documentation, want to share your use-case,
fix an issue or improve the website's look and feel...
just submit a pull request!
See the contributor notes below.

General WireMock contributing guide is available [here](https://github.com/wiremock/community/tree/main/contributing).

## Discussing changes

Make sure to join the community Slack as documented in the contributing guide.
After that, all changes can be discussed in the `#help-contributing` or `#documentation` channels.
Do not hesitate to ask there if you hit an obstacle.

## Key locations

### WireMock 3 docs

WireMock Java 3.x documentation, including API specifications and other resources is located in the
[`main` branch](https://github.com/wiremock/wiremock.org/tree/main).

### WireMock 2.x docs archive

WireMock Java 2.x documentation (`wiremock.org/2.x`) documentation archive,
including API specifications and other resources is located in the
[`2.x` branch](https://github.com/wiremock/wiremock.org/tree/2.x)
that is included as a submodule and build by the CD flow.
To update the documentation, submit pull requests against the branch,
and they will be included into the main release line.

## Editing

### Code Tabs

To reduce vertical space and provide examples by multiple technology stacks,
we added support for code tabs in the documentation.
It is a custom Jekyll plugin providing the `{% codetabs %}` macro in Markdown.
See the example here: https://wiremock.org/docs/stubbing/ .

Example:

```markdown
    {% codetabs %}
    
    {% codetab JSON %}
    
    ```json
    {
      "request": {
        "method": "GET",
        "url": "/some/thing"
      }
      "response": {
        "status": 200,
        "body": "Hello, world!",
        "headers": {
            "Content-Type": "text/plain"
        }
      }
    }
    ```
    
    {% endcodetab %}
    
    {% codetab Java %}
    
    ```java
    @Test
    public void exactUrlOnly() {
        stubFor(get(urlEqualTo("/some/thing"))
                .willReturn(aResponse()
                    .withHeader("Content-Type", "text/plain").withBody("Hello world!")));
    }
    ```
    
    {% endcodetab %}
    
    {% endcodetabs %}
```


When editing the existing code, make sure to also copy-edit text around it to ensure consistency.
Example of a patch: [PR #165 - Code tabs in stubbing overview](https://github.com/wiremock/wiremock.org/pull/165).

## Preparing the developer environment

The website is powered by Jekyll, and hence the Ruby developer environment is needed.
It is recommended to use `Ruby 2.7.6` because of the known compatibility issues between recent Jekyll version and Ruby 3.
The website can be developed on both Windows and Unix systems,
as long as the environment is set properly.

Prerequisites:

- Ruby 2.7.6
- Bundler 2.4.10

## Building the website

```bash
# Install the dependencies including Jekyll
bundle install

## Build the website
bundle exec jekyll build --config '_config.yml'
```

Note that `_config_preview.yml' is used to disable analytics in the deployed versions

## Running the website locally

You can run the website locally and get live preview of the changes
on the website and in the documentation contents.
To do so, run the following command:

```bash
bundle exec jekyll serve --config '_config.yml'
```

It will start the website on [http://localhost:4000](http://localhost:4000).

## Preview and Previous site baselines

The website may include preview and deprecated baselines, mainly to serve the documentation.
The websites have slightly different layouts to help users navigate (links, headers, etc.).

Alternative baselines are managed in the `main` branch,
but the content comes from other Git branches.
For example, if the `4.x` baseline is a preview one...

- There is a branch in the repository, for example `4.x` for WireMock 4
- There is a `wiremorg.org/4.x` entry on the website.
  It is included from the branch via Git submodules and packaging scripts in GitHub Actions
- For this version, there is a `_config-4.x.yml` file that defines configuration overrides for this version
- To build and test the baseline on a local machine, one needs to include the overrides config file into `jekyll build` and `jekyll serve` commands.
  For example, `bundle exec jekyll serve --config '_config.yml,_config-4.x.yml'`.

## Checking for broken links

The CI will soon verify that, but for now you can check manually, e.g. with the
[broken-link-checker](https://github.com/stevenvachon/broken-link-checker).

```bash
blc http://localhost:4000/ --exclude-external
```

## A/B Testing

Occasionally we run A/B tests to find out what design changes might help our users navigate the site.

Major changes to navigation and layout can impact the results of A/B tests,
so we will be delaying merges of non-critical pull requests that impact pages and components under test.
You can find the list of ongoing A/B tests and contacts (as assignees) using [this GitHub Issue query](https://github.com/wiremock/wiremock.org/labels/ab-tests)

## Deploying the website

The repository includes the GitHub action that automatically deploys the website upon
merge to the `main` branch.
Once your pull requests is reviewed and merged by the maintainers,
it will be automatically deployed to [wiremock.org](https://wiremock.org).

For manual deployments, there are legacy script in [.scripts](/.scripts).
Most likely you do not need them, unless something went horribly wrong.
