# Inggest Lab

## Overview

This project contains tests for Inggest.

## Prerequisites

- Node.js
- bun

## Installation

```bash
bun install
```

## Run

I'd rather to user docker:

```bash
 docker compose -f docker-compose.dev.yaml up -d
```

But you can use the command below to run de express:

```bash
bun dev
```

and this command to run the inngest dev server:

```bash
npx --ignore-scripts=false inngest-cli@latest dev -u http://localhost:3000/api/inngest
```

## Open the inngest dev server

http://localhost:8288

## Trigger a event

[http](http://localhost:8288/runs)

## Load Test

If you have [wrk](https://github.com/wg/wrk) command, you can stress your environment for better insights about inngest:

```bash
 wrk -t4 -c20 -d30s --header "User-Agent: LoadTest/1.0 (wrk)" "http://localhost:3000/trigger"
```
