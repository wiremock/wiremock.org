---
layout: docs
title: WireMock Studio - Getting Started - Kubernetes
description: How to install and run WireMock Studio in your Kubernetes cluster.
---

WireMock Studio can be deployed into a Kubernetes cluster. When doing so it gains some Kubernetes-specific capabilities
including the automatic mocking and proxying through to existing services, and automatic configuration of services when creating new mock APIs.

## Prerequisites

To follow this installation guide you'll need to have [kubectl](https://kubernetes.io/docs/tasks/tools/){:target="{{site.data.misc.blank}}"} installed and authenticated
against a Kubernetes cluster with sufficient privileges to create all resource types
in (at least) the target namespace.

You'll also need to download a copy of [wiremock-studio.yaml](https://github.com/wiremock/wiremock-studio-kubernetes-example/blob/main/wiremock-studio.yaml){:target="{{site.data.misc.blank}}"} from the Kubernetes example project.

## Deploying to Kubernetes

Open a terminal, cd into the directory containing `wiremock-studio.yaml` and run the following command to initiate the deployment:

```bash
kubectl apply -f wiremock-studio.yaml --namespace <target namespace>
```

This will create the following resources:

* A `ServiceAccount` for WireMock Studio to use for cluster operations.
* A `Role`, allowing read/write access to all Services in the namespace.
* A `RoleBinding`, associating the role with the default service account in the namespace.
* A `PersistentVolumeClaim` for stub and config storage.
* A `Deployment` for the WireMock Studio app.
* A `Service` of type `LoadBalancer` (externally accessible) for the app.


Once the deployment has completed, find the ingress (public) address used to access the console:

```bash
kubectl get service wiremock-studio -ojsonpath='{.status.loadBalancer.ingress[0].ip}'
```

This will return an IP address, which you can then use in your web browser to access the console by placing `http://` in front of it e.g.
`http://10.1.2.3`.

For ease of access by your team it is recommended that you create a DNS `A` record pointing to this IP address in a zone you control.

## Getting help and support

Check out the [support page](/support/) for the ways you can get help with WireMock Studio.