.PHONY: install dev build serve clean lint format test help

# Variables
NODE_BIN := node_modules/.bin
BUILD_DIR := build

# Default target
default: help

## install: Install dependencies
install:
	npm install

## dev: Start development server with hot reload
dev:
	npm run start

## build: Build production documentation
build: lint format
	npm run build

## serve: Serve built documentation
serve:
	npm run serve

## clean: Clean build artifacts
clean:
	npm run clear
	rm -rf $(BUILD_DIR)
	rm -rf .docusaurus

## lint: Run ESLint
lint:
	npm run lint

## lint-fix: Fix ESLint issues
lint-fix:
	npm run lint:fix

## format: Format code with Prettier
format:
	npm run format

## format-check: Check code formatting
format-check:
	npm run format:check

## typecheck: Run TypeScript type checking
typecheck:
	npm run typecheck

## test: Run all checks (lint, format, typecheck)
test: lint format-check typecheck

## help: Show this help message
help:
	@echo "ReifyDB Documentation Build Commands:"
	@echo ""
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' | sed -e 's/^/ /'