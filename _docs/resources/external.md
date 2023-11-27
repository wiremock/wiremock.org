Community Resources
Code, articles and videos related to WireMock from around the web.

Integrations
WireMocha is a WireMock plugin for IntelliJ:

https://plugins.jetbrains.com/plugin/18860-wiremocha
Mark Winteringham wrote a very handy Chrome extension to provide a UI over WireMock:

http://www.mwtestconsultancy.co.uk/wiremock-chrome-extension/
Spring Contract Verifier (previously called Accurest) is a consumer driven contracts tool that generates WireMock stub mappings as examples for client testing.

http://cloud.spring.io/spring-cloud-contract/
A Spring REST Docs integration for WireMock that generates WireMock stub mappings from your test cases:

https://github.com/epages-de/restdocs-wiremock
WireMock Maven Plugin:

https://github.com/automatictester/wiremock-maven-plugin
Maciej Walkowiak has built a library providing zero-config, fully declarative Spring Boot integration with WireMock in JUnit 5 tests:

https://github.com/maciejwalkowiak/wiremock-spring-boot
@GenerateWireMockStub for Spring REST controllers, built by Lukasz Gryzbon, makes the creation of WireMock stubs for tests safe and effortless:

https://github.com/lsd-consulting/spring-wiremock-stub-generator
Extensions
Simulate webhooks with this extension:

https://github.com/wiremock/wiremock-webhooks-extension
Some folks at Open Table have written a response transformer for injecting data from the request body into the response:

https://github.com/opentable/wiremock-body-transformer
In a similar vein, Adam York has written a response transformer utilising Velocity templates:

https://github.com/adamyork/wiremock-velocity-transformer
Mason Malone has built an extension for matching requests based on the contents of JSON web tokens:

https://github.com/MasonM/wiremock-jwt-extension
Also from Mason, an extension for finding and removing unused stub mappings:

https://github.com/MasonM/wiremock-unused-stubs-extension
Felipe Fernández has built a Spock extension to enhance automation around record and replay functionality:

https://github.com/felipefzdz/spock-wiremock-extension
Automate configuration of stubs, given JAX-RS annotated resources, with this extension:

https://github.com/tomasbjerre/wiremock-jaxrs
Monitor JVM metrics and wiremock response time:

https://github.com/rasklaad/wiremock-metrics
Other languages
PHP client by Rowan Hill:

https://github.com/rowanhill/wiremock-php
Ruby wrapper by Jeffres S. Morgan:

https://rubygems.org/gems/service_mock
Groovy binding by Tom Jankes:

https://github.com/tomjankes/wiremock-groovy
Python client by Cody Lee:

https://pypi.python.org/pypi/wiremock/1.1.1
NodeJS wrapper:

https://www.npmjs.com/package/wiremock
NodeJS + TypeScript client:

https://www.npmjs.com/package/wiremock-captain
Articles
Sam Edwards has been hugely helpful in getting WireMock onto the Android platform and helping others do so. Here is his blog post explaining how to write an Espresso test using WireMock as your app's back-end:

http://handstandsam.com/2016/01/30/running-wiremock-on-android/
Dusan Dević at Yenlo wrote a useful guide to testing error conditions in the WSO2 ESB using Wiremock:

https://www.yenlo.com/blog/wso2torial-error-handling-in-wso2-esb-with-wiremock
Phill Barber has written a couple of interesting posts about practical testing scenarios with WireMock:

http://phillbarber.blogspot.co.uk/2015/05/how-to-write-end-to-end-tests-for-nginx.html http://phillbarber.blogspot.co.uk/2015/02/how-to-test-for-connection-leaks.html
Bas Dijkstra kindly open sourced the content for the workshop he ran on WireMock and REST Assured:

http://www.ontestautomation.com/open-sourcing-my-workshop-on-wiremock/
@GenerateWireMockStub for Spring REST controllers, built by Lukasz Gryzbon, makes the creation of WireMock stubs for tests safe and effortless:

https://dzone.com/articles/wiremock-the-ridiculously-easy-way
WireMock workshop:

https://github.com/basdijkstra/wiremock-workshop
Videos
Fluent and thorough live-coding demonstration of WireMock delivered by Sam Edwards at DevFest DC:

https://youtu.be/x3MvZ8DFrpE
Sebastian Daschner presents a step-by-step guide to running your acceptance tests in Kubernetes using WireMock:

https://blog.sebastian-daschner.com/entries/acceptance_tests_wiremock_kubernetes
Interesting and detailed presentation by Lotte Johansen on testing microservices with WireMock at Norway's top online marketplace:

https://www.youtube.com/watch?v=cmJfMnGK-r0
Chris Batey did an excellent talk at Skillsmatter in London about building fault tolerant microservices. He showed some practical failure testing strategies using WireMock and Saboteur he'd used for real while working at Sky:

https://skillsmatter.com/skillscasts/5810-building-fault-tolerant-microservices
Daniel Bryant's excellent QCon presentation “The Seven Deadly Sins of Microservices” covers the full gamut of microservice anti-patterns seen in the wild, with some sound advice on how to fix them. WireMock and Saboteur get an honourable mention in the testing discussion:

https://www.infoq.com/presentations/7-sins-microservices
The folks at Intuit have built a very impressive and ambitious testing setup, using WireMock to isolate individual services. Here's a talk they did at AWS:Reinvent:

https://www.youtube.com/watch?list=PLhr1KZpdzuke5pqzTvI2ZxwP8-NwLACuU&v=sUsh3EnzKKk
Michael Bailey was the first person to publicly demonstrate the possibility of running WireMock on Android. Here's his presentation at Google's GTAC conference on the testing setup used by his team at Amex:

https://www.youtube.com/watch?v=-xQCNf_5NNM
Tom and Rob Elliot gave a join talk at Skillsmatter about patterns for readable and scalable tests with WireMock, and an approach for unit testing a CDN:

https://skillsmatter.com/skillscasts/6853-scalable-management-of-test-data-making-tests-readable
