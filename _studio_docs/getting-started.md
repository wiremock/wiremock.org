---
layout: docs
title: WireMock Studio - Getting Started
description: How to download, run and use WireMock Studio.
---

<br>

<img src="{{ base_path }}/images/wiremockStudioDashboard.png" alt="WireMock Studio UI" />

WireMock Studio is currently released as a standalone JAR and a Docker image, making
it straightforward to run on your own machine or in your test environment.


## Running the standalone JAR

The standalone JAR requires a minimum of **Java 11**, and this is the best
version to use, however we've tested it on Java 17 and this also works fine except
if you try to enable and use HTTPS browser proxying.

After ensuring you've got a suitable Java version installed, download the
<a href="http://wiremock-studio.s3-website-us-east-1.amazonaws.com/wiremock-studio-{{site.data.misc.wiremock_studio_version}}.jar" id="wiremock-studio-download">WireMock Studio standalone JAR</a>.

Then open a terminal in the directory containing the JAR file and run:

```bash
java -jar wiremock-studio-{{site.data.misc.wiremock_studio_version}}.jar
```

You should see something like the following in the console:

<img src="{{ base_path}}/images/wiremockBYUP9.png"  alt="WireMock Studio console" />

You can now visit the console URL shown, which defaults to [http://localhost:9000](http://localhost:9000){:target="{{site.data.misc.blank}}"}.


## Running in Docker

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

## Deploying to Kubernetes

Start by creating a Kubernetes manifest file called `wiremock-studio.yaml` with the following contents
(tweaking parameters for your environment where appropriate):

```yaml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wiremock-studio
  labels:
    name: wiremock-studio
spec:
  replicas: 1
  selector:
    matchLabels:
      name: wiremock-studio
  template:
    metadata:
      labels:
        name: wiremock-studio
    spec:
      containers:
      - name: wiremock-studio
        image: up9inc/wiremock-studio:{{site.data.misc.wiremock_studio_version}}
        ports:
        - containerPort: 9000
        livenessProbe:
          httpGet:
            path: /status
            port: 9000
          initialDelaySeconds: 60
          periodSeconds: 3
        readinessProbe:
          httpGet:
            path: /status
            port: 9000
          initialDelaySeconds: 10
          periodSeconds: 3

---
apiVersion: v1
kind: Service
metadata:
  name: wiremock-studio
  labels:
    name: wiremock-studio
spec:
  externalTrafficPolicy: Cluster
  ports:
  - port: 80
    protocol: TCP
    targetPort: 9000
  selector:
    name: wiremock-studio
  sessionAffinity: None
  type: LoadBalancer
```

Then apply the manifest to your cluster:

```bash
kubectl apply -f wiremock-studio.yaml
```

After a few moments pod and service will have started in your cluster and you'll
be able to access the console via port forwarding:

```bash
kubectl port-forward deployment/wiremock-studio 9000
```

Then you can access the web UI by pointing your browser to [http://localhost:9000](http://localhost:9000){:target="{{site.data.misc.blank}}"}.

## Data storage when running in Docker or Kubernetes

By default, WireMock Studio writes stub mappings and the mock API catalogue to JSON files under
its home directory inside the container `/home/wiremock`.

When running in Docker or K8s as described above this will be a temporary, writable
filesystem that will disappear when the container is removed.

If you want to preserve your mock APIs and their stubs you can mount a volume to
`/home/wiremock`. When running directly in Docker you could do something like this
(first ensuring Docker has permission to mount the directory you're in):

```bash
docker run -it \
  -p 9000:9000 \
  -p 8000:8000 \
  -v $PWD/wiremock:/home/wiremock \
  up9inc/wiremock-studio:{{site.data.misc.wiremock_studio_version}}
```

This will mount the `wiremock` subdirectory under the current directory as the root.
This directory and its contents can be committed to source control.

## Getting help and support

Check out the [support page](/support/) for the ways you can get help with WireMock Studio.