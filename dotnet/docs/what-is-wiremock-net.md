# What Is WireMock.Net?
WireMock.Net is a tool which mimics the behaviour of an HTTP API, it captures the HTTP requests and sends it to WireMock.Net HTTP server, which is started and as a result, we can setup expectations, call the service and then verify its behaviour.

# When Should We Use WireMock.Net?
Below are three situations when we should use WireMock.Net:

#### 1.	`HTTP Dependencies Not Ready`

An engineering team needs to implement a feature which uses an HTTP API that is not ready, this occurs often in an microservice based architecture.

To avoid engineering waste, you can mimic the behaviour of the HTTP API using WireMock.Net and then replace the call to WireMock.Net API to the actual API. 

#### 2.	`Unit Test classes which use HTTP APIs`

Scenario: `Class A -> depends on -> Class B -> depends on -> HTTP API`

We want to unit test for Class A.

Option1: Replace depend Class B with a MockObject when unit testing Class A.

However, if the API client is written by you, using a mock object is not a good choice because it does not allow us to verify that our code can communicate with the HTTP API. 

`Sociable Tests`

Therefore, Class A & Class B should be tested as one unit and as a result we can verify that the correct information is send to the HTTP API and ensure that all legal responses can be processed by both Class A & Class B.

#### 3.	`Integration or End-to-end tests using external HTTP APIs`

`Dependency Down`

External HTTP API cannot initialise into a known state before the tests are run. Therefore, we cannot write tests which use the data returned by the external HTTP API, as it can differ.

`Slow tests` 

External HTTP API takes longer than getting the same response from WireMock.Net and we cannot use a short timeout because the test will fail, when the call is timed out.

`API Requests Blocked`

Wrong network connection, the API request which does not come from a known IP address is blocked.

##### To write fast and consistent tests for HTTP APIs we should be using WireMock.Net.

##### However, WireMock.Net cannot guarantee that our application is compatible with the consumed HTTP API. 

The WireMock.Net tests will ensure 
1.	Our application sends the expected requests to the used HTTP API.
2.	Our application is working as expected when it receives an expected response from the HTTP API.
It is important that our expectations are correct otherwise those tests can be false positive.  

# Summary of what WireMock.Net Offers
1. Configure the response returned by the HTTP API when it receives a specific request.
2. Capture the incoming HTTP requests and write assertions for that requests.
3. Identify the stubbed or captured HTTP requests by using request matching
4. Configure request matchers by comparing the request.
5. URL, path, request method, request headers, cookies and request body
6. Run it as a standalone process. (flexible deployments)
7. Or integrate it in your unit-tests
8. Redirect HTTP Requests to another location, record and playbacks
9. Support edge case failures

**Note**: this page is based on https://github.com/AdriseYounis/WireMock.Net/blob/master/README.md