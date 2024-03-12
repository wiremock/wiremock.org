---
layout: docs
title: WireMock API Templates Library
meta_title: WireMock API Templates Library
toc_rank: 66
description: >
    The library.wiremock.org site provides a catalog of API Templates
    that can be used with both WireMock or WireMock Cloud.
---

<div class="cloud-callout"><a href="https://www.wiremock.io?utm_source=oss-docs&utm_medium=oss-docs&utm_campaign=cloud-callouts-templates&utm_id=cloud-callouts&utm_term=cloud-callouts-templates" target="_BLANK">To easily share templates across teams or choose from thousands of popular 3rd party templates, learn more about WireMock Cloud.</a></div>

The [library.wiremock.org](https://library.wiremock.org) site provides a catalog of API Templates
that can be used with both
[WireMock](https://wiremock.org/) or [WireMock Cloud](https://wiremock.io).
You can browse our library of mock API templates and examples,
find the API that you need,
and get a running mock in seconds - on your local machine or in the cloud.

[![Mock API Templates Library](https://library.wiremock.org/images/logo/template-library-wide.png)](https://library.wiremock.org/)

## Using templates in WireMock

1. Go to the [Mock API Templates Library](https://library.wiremock.org) site
2. Choose a template you need. There are categories and search capabilities at your disposal
3. Click the _Download WireMock JSON_ button to download the JSON file
4. Use the JSON file to configure your WireMock instance
   See [Using Templates](./usage)

## Using templates in WireMock Cloud

<!-- TODO: Replace by the page -->

For WireMock Cloud there is also the _Run in WireMock Cloud_ button that
allows you to quickly import the Mock API definition into your project.

## Editing and Adding templates

Template definitions can be found in another repository:
[wiremock/api-template-library](https://github.com/wiremock/api-template-library).

If you would like to edit the existing template
or to contribute a new API template,
feel free to submit a pull request to
[wiremock/api-template-library](https://github.com/wiremock/api-template-library).
This is a public repository enables WireMock and WireMock Cloud users 
to build their own Mock APIs based off a public template,
e.g. for your public service.

A template can be added to featured list by adding the `featured` tag in the metadata JSON.
If a template is somehow related to WireMock, please also use the `wiremock` tag.

It may take some time to propagate changes to
WireMock or WireMock Cloud.

## References

- [Templates Repository](https://github.com/wiremock/api-template-library)
- [WireMock Library Sources](https://github.com/wiremock/library.wiremock.org-sources)
