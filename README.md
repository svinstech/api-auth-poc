# APIAuthPOC

## Description

API Auth Related POC Work.

This POC work involved working on,

### Configuring Auth0:

1. Listing [Partner API POC](https://manage.auth0.com/dashboard/us/vouch-dev/apis/618ec13cdfa68d00479cce54/settings).
2. Registering a [test application](https://manage.auth0.com/dashboard/us/vouch-dev/applications/kxrODb3qdrkyHMvq3fBOVxneID7OX5QW/settings) that has access to Partner API POC. We get our partner `Client Id` & `Client Secret`.
3. Use credentials obtained in step 2 to get JWT Token.

    Request Payload

    ```json
    POST https://vouch-dev.auth0.com/oauth/token

    {
       "client_id": "CLIENT_ID",
       "client_secret":"CLIENT_SECRET",
       "audience": "https://partner-api-poc/api",
       "grant_type": "client_credentials",
       "user_context": {
            "user_id": "sateesh.kadiyala@vouch.us",
           "comapny_id": "c154bf3c-36d0-40ec-a687-abed1c2ce85a"
       }
    }

    ```

    Response

    ```json
    {
        "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJrRkVRelJFT1RRMlJqa3hSVU15TTBNd1F6Z3hNVE00TmpFMU4wTXdNVE5HTWpSRE16ZzFNUSJ9.eyJodHRwczovL2FwaS52b3VjaC51cy9jb250ZXh0L3VzZXIiOnsidXNlcl9pZCI6InNhdGVlc2gua2FkaXlhbGFAdm91Y2gudXMiLCJjb21hcG55X2lkIjoiYzE1NGJmM2MtMzZkMC00MGVjLWE2ODctYWJlZDFjMmNlODVhIn0sImlzcyI6Imh0dHBzOi8vdm91Y2gtZGV2LmF1dGgwLmNvbS8iLCJzdWIiOiJreHJPRGIzcWRya3lITXZxM2ZCT1Z4bmVJRDdPWDVRV0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wYXJ0bmVyLWFwaS1wb2MvYXBpIiwiaWF0IjoxNjM3MTAyMTM4LCJleHAiOjE2MzcxODg1MzgsImF6cCI6Imt4ck9EYjNxZHJreUhNdnEzZkJPVnhuZUlEN09YNVFXIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.tb_6KCWldEFsNah1GgPTtq2Xn-XavU2_PFxxUSBbN6oy5ef468fOs3kpGwLcl5HqrGLCpDMGsBcZditBvOvjpsc2j1nVPEL_Gm38uRotf-vFJ6nPe95GiYb5agrjUJugwsX4UNJ9HwNjIx6a26BMwasxabZHDvVcye1Cmau3jengYg6zw47N6DmRQ_hA5faSztMZBgPeuAG-0Jq5AqB70GZ6OZt3zzC9C9vQjPtcvTOy5Cw4N2T8vlG3_fp6c7DcBxCkwy91BNh16eWUmAZROmqOCNucX_xnUjtCJE2cw9NVrGyov6DXkIWtzv0w8EbjhyBXqbiHqYDnUpZZssATCQ",
        "expires_in": 86400,
        "token_type": "Bearer"
    }
    ```

4. An Auth0 Webhook, [partner-api-poc-client-credentials-hook] (https://manage.auth0.com/dashboard/us/vouch-dev/hooks) is configured to attach user context to the access token.

### Validating Token on API:

For demonstration purposes, on the API side we have couple routes,

-   `/api/v1/application/public` : access_token not required.
-   `/api/v1/application/private` : access_token is required.

1.  Grab the `access_token` and send the request to access our `private` endpoint like shown below.

Request

```bash
curl --location --request GET 'http://localhost:3000/api/v1/application/private' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJrRkVRelJFT1RRMlJqa3hSVU15TTBNd1F6Z3hNVE00TmpFMU4wTXdNVE5HTWpSRE16ZzFNUSJ9.eyJodHRwczovL2FwaS52b3VjaC51cy9jb250ZXh0L3VzZXIiOnsidXNlcl9pZCI6InNhdGVlc2gua2FkaXlhbGFAdm91Y2gudXMiLCJjb21hcG55X2lkIjoiYzE1NGJmM2MtMzZkMC00MGVjLWE2ODctYWJlZDFjMmNlODVhIn0sImlzcyI6Imh0dHBzOi8vdm91Y2gtZGV2LmF1dGgwLmNvbS8iLCJzdWIiOiJreHJPRGIzcWRya3lITXZxM2ZCT1Z4bmVJRDdPWDVRV0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wYXJ0bmVyLWFwaS1wb2MvYXBpIiwiaWF0IjoxNjM3MTAyMTM4LCJleHAiOjE2MzcxODg1MzgsImF6cCI6Imt4ck9EYjNxZHJreUhNdnEzZkJPVnhuZUlEN09YNVFXIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.tb_6KCWldEFsNah1GgPTtq2Xn-XavU2_PFxxUSBbN6oy5ef468fOs3kpGwLcl5HqrGLCpDMGsBcZditBvOvjpsc2j1nVPEL_Gm38uRotf-vFJ6nPe95GiYb5agrjUJugwsX4UNJ9HwNjIx6a26BMwasxabZHDvVcye1Cmau3jengYg6zw47N6DmRQ_hA5faSztMZBgPeuAG-0Jq5AqB70GZ6OZt3zzC9C9vQjPtcvTOy5Cw4N2T8vlG3_fp6c7DcBxCkwy91BNh16eWUmAZROmqOCNucX_xnUjtCJE2cw9NVrGyov6DXkIWtzv0w8EbjhyBXqbiHqYDnUpZZssATCQ'

```

Response

```json
{
    "application": "privateApplicationId",
    "partnerKey": "kxrODb3qdrkyHMvq3fBOVxneID7OX5QW"
}
```

## Installation

```bash
$ make install
```

## Running the app

### Start the database

This will run the docker compose file in a backgrounded process

```bash
make dev_db
```

### Start the App

```bash
# development
$ make server

# watch mode
$ make debug_server

# production mode
$ make prod_server
```

### Swagger UI

Once the app is running, you can test the API with Swagger UI at [http://localhost:3000/api/](http://localhost:3000/api/)

## Test

```bash
# unit tests
$ make unit_test

# e2e tests
$ make e2e_test

# unit test coverage
$ make coverage

# e2e test coverage
$ make e2e_coverage
```

## Dependency Scanning

This repo is integrated with FOSSA: https://vouch.fossa.app

Dependencies will be scanned in CircleCI for vulnerabilities and license policy exceptions.

## Misc.

See the Makefile for other commands
