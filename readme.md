# Sample Custom Database Scripts and API

## Introduction

This repo provides sample login and get user scripts that would call an API provided by the customer to support user login and/or migration via an Auth0 [Custom Database](https://auth0.com/docs/authenticate/database-connections/custom-db/create-db-connection) connection. It also includes a very basic sample API for testing.

## Using the scripts

The scripts should be added to the `login` and `get user` scripts of a connection in Auth0. They require two [configuration parameters](https://auth0.com/docs/authenticate/database-connections/custom-db/create-db-connection#add-configuration-parameters) be added to the database connection.

| parameter  | description                                                                                                    |
| ---------- | -------------------------------------------------------------------------------------------------------------- |
| baseAPIUrl | The base url for the API called by the scripts.                                                                |
| apiKey     | A cryptographically random secret value that the scripts will pass in a x-api-key header when calling the API. |

### Securing API Calls

For simplicity this sample has the scripts pass an API key in an `x-api-key` header. The API key should be shared with the API which will reject all calls that lack it. The calls can alternatively be secured via [Machine to Machine tokens](https://auth0.com/docs/get-started/authentication-and-authorization-flow/client-credentials-flow). This is more secure as security is not based on a shared secret, but a bit more complex to implement as M2M tokens should be cached in the scripts to limit the number that must be fetched.

In addition to one of the above methods your API can reject requests that are not from the range of [expected Auth0 IP addresses](https://auth0.com/docs/secure/security-guidance/data-security/allowlist). Public cloud customers share these IP addresses, while private cloud customers will have their own specific IPs. In both cases this method should be used along with another method of securing the calls and not alone.

## Using the Test API

The `customDbApi` folder contains a bare bones API you can point your scripts at for test purposes. Users should be defined in a `users.json` file. See `user.json.sample` for an example of the user format. An `API_KEY` config value should be set to provide the expected API key sent by the calling scripts.

The sample API will run as is in heroku. The API_KEY needs to be provided in Settings > Config Vars.

To have the API return a 500 error (to test script error handling) login with the email `bad@test.com`.

## Recommended documentation

[Custom Database Connection](https://auth0.com/docs/authenticate/database-connections/custom-db/create-db-connection)

[Custom Database Connection Best Practices](https://auth0.com/docs/authenticate/database-connections/custom-db/custom-database-connections-scripts#learn-more)

[Custom Database Script Action Templates](https://auth0.com/docs/authenticate/database-connections/custom-db/templates) - I recommend reviewing the default Javascript template for each script you implement as they show all variations of callback that should be used with the script.

## Production Use

This code is provided as a proof of concept and should not be considered production ready.

## What is Auth0?

Auth0 helps you to:

- Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
- Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
- Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
- Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
- Analytics of how, when and where users are logging in.
- Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free Auth0 Account

1. Go to [Auth0](https://auth0.com) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)
