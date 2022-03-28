---
layout: docs
title: WireMock Studio - Getting Started - Docker
description: How to download and run WireMock Studio on your local machine.
---

To start WireMock Studio in Docker locally, run the following in a shell:

```bash
docker run -it \
  -p 9000:9000 \
  -p 8000:8000 \
  -p 8001:8001 \
  up9inc/wiremock-studio:{{site.data.misc.wiremock_studio_version}}
```

Note that ports 8000 and 8001 that are exposed in this case are ports we expect
to assign new mock APIs to when we create them. You'll need to add more (or fewer)
of these per your requirements.

Port 9000 is the UI and management port so should always be exposed.

