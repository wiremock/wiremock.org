---
layout: docs
title: "Exploratory Testing a Spring Boot App"
toc_rank: 55
description: Exploratory testing a Spring Boot app with MockLab
---

This tutorial demonstrates how MockLab can be used to perform a manual exploratory test of an application with an API back-end.
The app is a simple to-do list based on Java and Spring Boot, supporting listing of to-do items and posting new ones.

## Mock API setup

If you haven't yet created a mock API in MockLab, start by doing this. See [Getting Started](/docs/getting-started/) for how to do this.
Make a note of the base URL from the Settings page (any of them will do).

## App setup

Ensure that you have Java 8+ installed and the `java` executable on your shell's `PATH`.

Clone the MockLab demo project and change the working directory to the newly checked out project:

```bash
git clone git@github.com:mocklab/mocklab-demo-app.git
cd mocklab-demo-app
```

Edit `src/main/resources/application.properties` changing the `mocklab.baseurl` value to your mock API's base URL noted earlier.

Run the app:

```bash
./gradlew bootRun
```

This should start the app locally on port `9000`.

## Step 1 - show a list of to do items

Navigate to the Stubs page and create a new stub with method `GET`, URL `/todo-items`, response `Content-Type` header `application/json` and the following JSON in the response body:

```json
{
  "items": [
    {
      "id": "1",
      "description": "First item"
    },
    {
      "id": "2",
      "description": "Item number two"
    },
    {
      "id": "3",
      "description": "Do that number three thing"
    },
    {
      "id": "4",
      "description": "Don't forget the fourth thing on the list"
    }
  ]
}
```

Your stub should look something like this:

<img title="To do list stub" src="/images/screenshots/to-do-stub.png"/>

Once you've saved the stub, point your browser to [http://localhost:9000](http://localhost:9000).
You should see the to-do items in your response body listed in the page:

<img title="To do list" src="/images/screenshots/to-do-list-app.png" style="width: 80%"/>

What has happened here is that the Spring Boot app has made a REST request to MockLab, which was matched by the stub you just created.
The stub returned a JSON response which the app parsed and rendered into an HTML page.

Now try modifying one or more of the item descriptions in the stub response and saving it, then refreshing the page. You should
immediately see your new items in the to-to list.


## Step 2 - simulating the posting of a new item

Next we're going to simulate a new item being added to the list via a POST request.

For this you'll need another new stub, this time for `POST` to `/todo-items` , response `Content-Type` header `application/json` and the following JSON in the response body:

```json
{ "message": "Successfully sent new item." }
```

Your stub should look like this:

<img title="To do list POST stub" src="/images/screenshots/to-do-post-stub.png" />


Once that's saved, go to the to-do list page and add a new item by typing a description in the field and clicking the button:

<img title="New to-do item" src="/images/screenshots/new-to-do-item-field.png" style="width: 80%" />


You should now see the success message you put in the stub response:

<img title="Success message" src="/images/screenshots/to-do-list-success-message.png" style="width: 80%"/>


You'll notice that the contents of the list hasn't changed. This is because MockLab stubs aren't stateful - the app will load whatever is
in the `GET /todo-items` stub you created at the start until you change it. However, if you visit the request log in the MockLab UI you can confirm that
the request you expected actually arrived:

<img title="To do post request log" src="/images/screenshots/to-do-request-log.png" />


## Step 3 - posting a new item fails

In this step we're going to deliberately return an error from the API in order to test that the app behaves appropriately.

Navigate to the `POST /todo-items` stub you created in the previous step and clone it (using the Clone button at the end of the form).

In the newly cloned stub, expand the Advanced section and give the stub a higher priority - 4 or less will work as the default is 5.
The reason we need to do this is to ensure that this and not the OK posting stub we cloned from is guaranteed to match an incoming `POST /todo-items`.

In the response section change the response code to 502 and the message in the JSON body to something suitable:

<img title="To do list stub" src="/images/screenshots/to-do-bad-post-stub.png"/>

Now try adding a new to-do item as you did in Step 2. When after submitting it, you should see an error page like this:

<img title="To do error" src="/images/screenshots/to-do-error-page.png" style="width: 50%"/>
