---
title: Dev-Tease
---

# Dev Tease

## Interesting mini-topics

- Architecture
  - Service-Oriented architectures
- C#
  - ~~Integration Testing~~
  - Parallel Programming
  - ~~Dependeny Injection~~
  - ~~Logging~~
  - [Playwright for .NET](https://playwright.dev/dotnet/docs/api/class-playwright)
- JavaScript
  - How to use NPM without giving up
- Docker
  - In-depth:
    - Containers
    - Images and Repositories
  - Handling stateful services
  - Using the Docker daemon API

## "Mini Projects"

### Text Adventure Framework/Engine

A .NET text adventure engine.

- OOP
  - Each scene can be defined as a class inheriting from `Scene`
- Savegames
- Easy to use
  - Little to no knowledge required to setup basic textadventure scenes
- 

### CQRS Framework

A .NET command pattern implementation over HTTP.

- Send and handle commands and queries
- Integrate custom handling pipelines
  - Logging
  - Rate-Limiting
  - Performance Counting
  - Routing to different implementations (A/B Testing) or blue green deployment
- Automatic serialization
- Automatic Dispatch
- Generate swagger OpenAPI documents
- Configuration by Convention
  - Low amount of code required per "endpoint", ideal for building service oriented applications

## Big projects

### Dev Bot

A bot, that allows you to generate application code in conversational manner, like in a customer-to-developer manner.
