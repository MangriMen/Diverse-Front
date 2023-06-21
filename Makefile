.PHONY: deploy

COMPOSE=docker compose

TEST_PROFILE=test
PROD_PROFILE=prod

TEST_ENV_FILE=.env.local
PROD_ENV_FILE=.env.production.local

ENV_FILE=$(TEST_ENV_FILE)
ifeq ($(profile),$(PROD_PROFILE))
	ENV_FILE=$(PROD_ENV_FILE)
endif

define gen_compose_flags
	--env-file $(ENV_FILE) --profile $(1)
endef

define gen_compose_command
	PROFILE=$(strip $(1)) $(COMPOSE) $(call gen_compose_flags,$(1))
endef

COMPOSE_DEPLOY_COMMAND=$(call gen_compose_command,$(profile))

UP_FLAGS_DEPLOY=-d --force-recreate

all:
	@echo "Usage: make BUILD_TARGET"
	@echo ""
	@echo "BUILD_TARGET:"
	@echo "\tdeploy profile=\t-\tdeploy with profile prod or test"

deploy: check_deploy_environment
	$(COMPOSE_DEPLOY_COMMAND) pull
	$(COMPOSE_DEPLOY_COMMAND) up $(UP_FLAGS_DEPLOY)

check_deploy_environment: check_profile_exists

check_profile_exists:
ifeq ($(profile),)
	(error profile argument not set)
endif
