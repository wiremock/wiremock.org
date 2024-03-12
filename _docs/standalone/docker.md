---
layout: docs
title: Running in Docker
meta_title: Configuring and running WireMock in Docker | WireMock
description: The Docker image supports exactly the same set of command line arguments as the standalone version. These can be passed to the container by appending them to the end of the command.
redirect_from: 
  - "/docs/solutions/docker.html"
  - "/docs/docker.html"
  - "/docs/docker/"
---

<div class="cloud-callout"><a href="https://www.wiremock.io?utm_source=oss-docs&utm_medium=oss-docs&utm_campaign=cloud-callouts-docker&utm_id=cloud-callouts&utm_term=cloud-callouts-docker" target="_BLANK">WireMock Cloud offers secure, publicly hosted mock APIs with nothing to install.</a></div>

From version 2.31.0 WireMock has an [official Docker image](https://hub.docker.com/r/wiremock/wiremock).

## Getting started

### Start a single WireWock container with default configuration

```sh
docker run -it --rm \
  -p 8080:8080 \
  --name wiremock \
  wiremock/wiremock:{{ site.wiremock_version }}
```

> Access [http://localhost:8080/\_\_admin/mappings](http://localhost:8080/__admin/mappings) to display the mappings (empty set)

### Start with command line arguments

The Docker image supports exactly the same set of command line arguments as the [standalone version](../java-jar#command-line-options).
These can be passed to the container by appending them to the end of the command e.g.:

```sh
docker run -it --rm \
  -p 8443:8443 \
  --name wiremock \
  wiremock/wiremock:{{ site.wiremock_version }} \
  --https-port 8443 --verbose
```

#### Passing command line arguments as environment variable

Starting from `3.2.0-2`, the Docker image supports passing command line arguments [standalone version](../java-jar#command-line-options) as the environment variable.
Environment variable `WIREMOCK_OPTIONS` can be passed to container consisting of all command line arguments e.g.:

```sh
docker run -it --rm \
  -e WIREMOCK_OPTIONS='--https-port 8443 --verbose' \
  -p 8443:8443 \
  --name wiremock \
  wiremock/wiremock:{{ site.wiremock_version }}
```

### Mounting stub mapping files

Inside the container, the WireMock uses `/home/wiremock` as the root from which it reads the `mappings` and `__files` directories.
This means you can mount a directory containing these from your host machine into Docker and WireMock will load the stub mappings.

To mount the current directory use `-v $PWD:/home/wiremock` e.g.:

```sh
docker run -it --rm \
  -p 8080:8080 \
  --name wiremock \
  -v $PWD:/home/wiremock \
  wiremock/wiremock:{{ site.wiremock_version }}
```

### Running with extensions

[WireMock extensions](../../extending-wiremock/) are packaged as JAR files. In order to use them they need to be made
available at runtime and WireMock must be configured to enable them.

For example, to use the [Webhooks extension](../../webhooks-and-callbacks/) we would first download [wiremock-webhooks-extension-{{ site.wiremock_version }}.jar](https://repo1.maven.org/maven2/org/wiremock/wiremock-webhooks-extension/{{ site.wiremock_version }}/wiremock-webhooks-extension-{{ site.wiremock_version }}.jar)
into the `extensions` directory under our working directory.

Then when starting Docker we would mount the extensions directory to `/var/wiremock/extensions` and enable the webhooks extension
via a CLI parameter:

```sh
docker run -it --rm \
  -p 8080:8080 \
  --name wiremock \
  -v $PWD/extensions:/var/wiremock/extensions \
  wiremock/wiremock \
    --extensions org.wiremock.webhooks.Webhooks
```

### Building your own image

Inside the container, the WireMock uses `/home/wiremock` as the root from which it reads the `mappings` and `__files` directories.
This means you can copy your configuration from your host machine into Docker and WireMock will load the stub mappings.

Wiremock utilizes a custom entrypoint script that passes all provided arguments as WireMock startup parameters. To modify the WireMock launch parameters it is recommended to override the entrypoint in your custom Docker image. 

```Dockerfile
# Sample Dockerfile
FROM wiremock/wiremock:latest
COPY wiremock /home/wiremock
ENTRYPOINT ["/docker-entrypoint.sh", "--global-response-templating", "--disable-gzip", "--verbose"]
```

### Docker Compose

Configuration in compose file is similar to Dockerfile definition

```yaml
# Sample compose file
version: "3"
services:
  wiremock:
    image: "wiremock/wiremock:latest"
    container_name: my_wiremock
    entrypoint: ["/docker-entrypoint.sh", "--global-response-templating", "--disable-gzip", "--verbose"]
```

You can also mount your local `__files` and `mappings` files into the container e.g:

```yaml
# Sample compose file
version: "3"
services:
  wiremock:
    image: "wiremock/wiremock:latest"
    container_name: my_wiremock
    volumes:
      - ./extensions:/var/wiremock/extensions
      - ./__files:/home/wiremock/__files
      - ./mappings:/home/wiremock/mappings
    entrypoint: ["/docker-entrypoint.sh", "--global-response-templating", "--disable-gzip", "--verbose"]
```
