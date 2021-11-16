DD_API_KEY := $(shell eval AWS_PROFILE=svinstech_dev CHAMBER_KMS_KEY_ALIAS=stg_chamber chamber read stg-global dd_api_key --quiet)

.PHONY: .setup_db clean_db coverage destroy_db dev_db debug_server dev_server e2e_coverage e2e_test format install \
lint prod_serverserver stop stop_db test unit_test
COMPOSE_PROJECT_NAME ?= api-auth-poc

.setup_db:
	mkdir -p tmp/postgres

clean_db:
	rm -rf tmp/postgres && rm -rf tmp/postgres-test

coverage:
	yarn run test:cov

destroy_db:
	@echo "Tearing down docker-compose..."
	@COMPOSE_PROJECT_NAME=$(COMPOSE_PROJECT_NAME) \
		DD_API_KEY=$(DD_API_KEY) \
		docker-compose -f docker-compose-dev.yml down
	@echo "...Finished"

dev_db: .setup_db
	@echo "Bringing up docker-compose..."
	@COMPOSE_PROJECT_NAME=$(COMPOSE_PROJECT_NAME) \
		DD_API_KEY=$(DD_API_KEY) \
		docker-compose -f docker-compose-dev.yml up -d
	@echo "...Finished"

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

