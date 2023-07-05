---
layout: docs
title: Listening for Serve Events
meta_title: Listening for Serve Events
description: Creating and registering serve event listeners
---

Serve event listeners are intended for use when you wish to take an action at a specific point in the request processing flow, without affecting processing in any way. For instance a serve event listener would be the most suitable extension point to use for exporting telemetry data to a monitoring/observability tool.

The `ServeEventListener` interface (which deprecates `PostServeAction`) supports two different modes of operation - you can either override specific methods if the listener should only fire at a specific point in the request processing flow, or you can override a generic method then configure which lifecycle points it's fired at when binding the listener to specific stubs. Or it can simply be made to fire at all lifecycle points.

## Listening for specific lifecycle events

TODO