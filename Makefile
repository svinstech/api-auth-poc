.PHONY: .setup_db clean_db coverage destroy_db dev_db debug_server dev_server e2e_coverage e2e_test format install \
lint prod_serverserver stop stop_db test unit_test
COMPOSE_PROJECT_NAME ?= service-template

.setup_db:
	mkdir -p tmp/postgres

clean_db:
	rm -rf tmp/postgres && rm -rf tmp/postgres-test

coverage:
	yarn run test:cov

destroy_db:
	COMPOSE_PROJECT_NAME=$(COMPOSE_PROJECT_NAME) \
		docker-compose -f docker-compose-dev.yml down

dev_db: .setup_db
	COMPOSE_PROJECT_NAME=$(COMPOSE_PROJECT_NAME) \
		docker-compose -f docker-compose-dev.yml up -d

debug_server:
	yarn run start:debug

dev_server:
	yarn run start:dev

e2e_coverage:
	yarn run test:cov:e2e

e2e_test:
	yarn run test:e2e

format:
	yarn run format

install:
	yarn install

lint:
	yarn run test:lint

prod_server:
	yarn run start:prod
server:
	yarn run start

stop_db:
	COMPOSE_PROJECT_NAME=$(COMPOSE_PROJECT_NAME) \
		docker-compose -f docker-compose-dev.yml stop

test: unit_test e2e_test

unit_test:
	yarn run test
