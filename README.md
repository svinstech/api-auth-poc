# ServiceTemplate
<a href="https://codeclimate.com/repos/5f9eed8824e75e018c001cba/maintainability"><img src="https://api.codeclimate.com/v1/badges/600342c8241524648927/maintainability" /></a>
<a href="https://codeclimate.com/repos/5f9eed8824e75e018c001cba/test_coverage"><img src="https://api.codeclimate.com/v1/badges/600342c8241524648927/test_coverage" /></a>
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript Policy Admin app.

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
Once the app is running, you can inspect the API with Swagger UI at [http://localhost:3000/api/](http://localhost:3000/api/)

<img width="786" alt="Swagger UI" src="https://user-images.githubusercontent.com/1145493/97812801-8ab15580-1c49-11eb-9071-0d87c525093d.png">

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
## Misc.
See the Makefile for other commands
