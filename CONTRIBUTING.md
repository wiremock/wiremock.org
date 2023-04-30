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
After that, all changes can be discussed in the `#help-contributing` channel.
Do not hesitate to ask there if you hit an obstacle.

## Key locations

### WireMock 3.x

WireMock Java 3.x documentation (`wiremock.org/3.x`), including API specifications and other resources is located in the
[`3.0.0-beta` branch](https://github.com/wiremock/wiremock.org/tree/3.0.0-beta)
that i included as a submodule and build by the CD flow.
To update the documentation, submit pull requests against the branch,
and they will be included into the main release line.

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
For example, if the `3.x` baseline is a preview one...

- There is a branch in the repository, for example `3.0.0-beta` for `3.x`
- There is a `wiremorg.org/3.x` entry on the website.
  It is included from the branch via Git submodules and packaging scripts in GitHub Actions
- For this version, there is a `_config-3.x.yml` file that defines configuration overrides for this version
- To build and test the baseline on a local machine, one needs to include the overrides config file into `jekyll build` and `jekyll serve` commands.
  For example, `bundle exec jekyll serve --config '_config.yml,_config-3.x.yml'`.

## Deploying the website

The repository includes the GitHub action that automatically deploys the website upon
merge to the `main` branch.
Once your pull requests is reviewed and merged by the maintainers,
it will be automatically deployed to [wiremock.org](https://wiremock.org).

For manual deployments, there are legacy script in [.scripts](/.scripts).
Most likely you do not need them, unless something went horribly wrong.
