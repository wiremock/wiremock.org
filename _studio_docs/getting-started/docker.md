---
layout: docs
title: WireMock Studio - Getting Started - Docker
parent: getting-started
description: How to run WireMock Studio using Docker.
---

To start WireMock Studio in Docker locally, run the following in a shell:

```bash
docker run -it \
  -p 9000:9000 \
  -p 8000-8100:8000-8100 \
  up9inc/wiremock-studio:{{site.data.misc.wiremock_studio_version}}
```

Note that WireMock Studio will assign new mock APIs to port 8000 and upwards, so we expose ports 8000 to 8100
in order to access them outside the Docker network.
If you want to run more than 100 mock APIs you'll need to raise the upper limit on this range.

Port 9000 is the UI and management port so should always be exposed.


## Data persistence

By default, WireMock Studio writes stub mappings and the mock API catalogue to JSON files under its home directory inside the container `/home/wiremock`.

When running in Docker or K8s as described above this will be a temporary, writable filesystem that will disappear when the container is removed.

If you want to preserve your mock APIs and their stubs you can mount a volume to `/home/wiremock`. When running directly in Docker you could do something like this (first ensuring Docker has permission to mount the directory you’re in):

```bash
docker run -it \
  -p 9000:9000 \
  -p 8000-8100:8000-8100 \
  -v $PWD/wiremock:/home/wiremock \
  up9inc/wiremock-studio:{{site.data.misc.wiremock_studio_version}}
```

This will mount the wiremock subdirectory under the current directory as the root. This directory and its contents can be committed to source control.
