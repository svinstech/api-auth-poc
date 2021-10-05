# ServiceTemplate
<a href="https://codeclimate.com/repos/5fa587adbb48fb3c68005285/maintainability"><img src="https://api.codeclimate.com/v1/badges/9fa1a1b132d225bbea0c/maintainability" /></a>
<a href="https://codeclimate.com/repos/5fa587adbb48fb3c68005285/test_coverage"><img src="https://api.codeclimate.com/v1/badges/9fa1a1b132d225bbea0c/test_coverage" /></a>
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript service template app.

## Setup
After you clone this template, you will want to replace all the variations of "ServiceTemplate" with whatever your new service is called in the same case:
 - `ServiceTemplate`
 - `Service Template`
 - `service-template`
 - `service_template`
 - `SERVICE_TEMPLATE`
 - `typescript-service-template`

Your build will likely fail on FOSSA the first time. Visit FOSSA App and configure your new Project, following [https://vouchinc.atlassian.net/wiki/spaces/EPAD/pages/1752989726/FOSSA](step 4 here).

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
You can download the OAS(swagger) schema at: [http://localhost:3000/api-json](http://localhost:3000/api-json)

<img width="519" alt="Screen Shot 2020-11-06 at 11 26 09 AM" src="https://user-images.githubusercontent.com/1145493/98396165-ebaea400-2022-11eb-87b9-90aa048545dc.png">
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
