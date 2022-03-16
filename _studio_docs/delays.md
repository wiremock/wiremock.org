---
layout: docs
title: Response Delays
toc_rank: 45
description: Adding delays to stub responses
---

Calls over a network to an API can be delayed for many reasons e.g. network congestion or excessive server load. For applications
to be resilient they must be designed to cope with this inevitable variability, and tested to ensure they behave as expected
when conditions aren't optimal.

In particular it is important to check that timeouts work as configured, and that your end user's experience is maintained.

MockLab stubs can be served with a fixed or random delay, or can be "dribbled" back in chunks over a defined time period.

## Fixed delay

A fixed delay straightforwardly adds a pause for the specified number of milliseconds before serving the stub's response.
  
<img src="/images/screenshots/fixed-delay.png" title="Fixed delay" style="width: 50%" />


## Random delay

Random delay adds a random pause before serving the response. Two statistical distributions are available: 

### Uniform

<img src="/images/screenshots/random-uniform-delay.png" title="Random uniform delay" style="width: 50%"/>

### Log normal

<img src="/images/screenshots/random-lognormal-delay.png" title="Random lognormal delay" style="width: 50%"/>


## Chunked dribble delay

Chunked dribble delay flushes the response body out in chunks over the total defined period:

<img src="/images/screenshots/chunked-dribble-delay.png" title="Chunked dribble delay" style="width: 50%"/>


## Delays and proxying

Fixed or random delays can be added to proxy responses in addition to direct responses, however chunked delays cannot at present.