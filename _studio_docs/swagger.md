---
layout: docs
title: Import & Export - Swagger and OpenAPI
description: Generate your mock API automatically from a Swagger or OpenAPI definition.
---
Swagger / OpenAPI is undoubtedly the most widely used description language for REST and REST-like APIs.
MockLab supports automatic generation of mock APIs from imported Swagger and OpenAPI specifications.

See [Import and Export Overview](/docs/import-and-export/) for basic importing instructions via the UI and
[Importing and Export via the API](/docs/import-export/api) for directions on automating
imports via MockLab's API.

## Customising the import

When importing from a Swagger/OpenAPI spec, it's often useful to be able to control
how certain aspects of the generated stubs are produced. MockLab supports a number
of extension attributes that can be added to your spec document for this purpose.

### Specifying URL path and query parameters

When MockLab converts a response example to a stub, by default it will generate random values for URL path and query parameters.

However, if a response uses the multiple example format, you can specify the exact parameter values you wish to be required
by the stub. This can be useful if your test cases or application under test expects specific
responses to be available in your mock API.

For instance, given the following Open API path element:

```yaml
/people/{id}:
    description: People by ID
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: string

    get:
      description: Get a person
      parameters:
        - name: fields
          in: query
          required: true
          schema:
            type: string
            enum:
              - full
              - summary

      responses:
        '200':
          description: People search returned successfully
          content:
            application/json:
              examples:
                one:
                  summary: First example
                  x-parameter-values:
                    id: abc123
                    fields: summary
                  value: |
                    { "name": "John" }

                two:
                  summary: Second example
                  x-parameter-values:
                    id: cba321
                    fields: full
                  value: |
                    { "name": "Jeff", id: "cba123" }
```

Two stubs will be created from the above example.
One will have a URL path equal to `/people/abc123` and a requred query parameter of `fields=summary`.
The other will have a URL path equal to `/people/cba321` and a requred query parameter of `fields=full`.

Any values not specified in this manner will be randomly generated based on the parameter's schema.


### Controlling data generation from schemas

When importing a response with a schema but no examples, MockLab will randomly generate an example
that conforms to the schema.

For each schema attribute an attempt will be made to determine the data type, using the
`format` if present, but if not making a guess based on the field name. For instance,
a `string` attribute named `date_of_birth` will result in the generation of an ISO8601 local
date within the past 99 years e.g. `1971-08-02`.

However, you can override this behaviour and specify which data generation strategy should be used.
MockLab uses [Faker](https://github.com/DiUS/java-faker) to generate example data, and
you can specify the specific faker to use by adding an `x-faker` attribute to your schema element e.g.

```yaml
schema:
  type: string
  x-faker: name.first_name
```

This can be used both in parameter declarations and response body schemas.

All of the fakers [listed here](https://github.com/DiUS/java-faker/tree/master/src/main/resources/en)
can be used, plus there are some additional rules supplied by MockLab. The following lists all of the most
commonly used, plus all supplied by MockLab:

* `name.name`
* `name.first_name`
* `name.last_name`
* `name.name_with_middle`
* `name.title`
* `name.prefix`
* `name.suffix`
* `name.username`
* `id.alphanumeric_id`
* `id.uuid`
* `date_and_time.birthday`
* `date_and_time.past_date_time`
* `date_and_time.future_date_time`
* `uri.url`
* `lorem.word`
* `lorem.sentence`
* `lorem.paragraph`
* `currency.code`
* `address.street_address`
* `address.secondary_address`
* `address.city_name`
* `address.state`
* `address.postcode`
* `country.name`
* `country.code2`
* `country.code3`
* `phone_number.phone_number`
* `avatar.image`

> **note**
>
> Only required query parameters will be included in the stubs' request criteria. Non-required query parameters
> will excluded, meaning that any or no value will be accepted.
