---
layout: docs
title: Simulating Faults
toc_rank: 44
description: Responding with network and HTTP faults
---

Real-world APIs and the networks used to communicate with them can fail in ways that can destabilise your application,
and are hard to test.

MockLab supports responding to requests with four different fault types:
  
* Server closes connection before response sent
* Corrupt data sent, then connection closed
* OK response sent, followed by corrupt data and connection close
* Peer connection reset - `SO_LINGER` is set to 0 causing a non-graceful TCP connection termination.

These are configured per stub, so it is possible to respond to specific requests with a fault.
 
## Usage

Faults are configured when creating or editing a stub by selecting the Fault tab in the response and choosing the fault type:

<img src="/images/screenshots/fault-response.png" title="Fault response"/>