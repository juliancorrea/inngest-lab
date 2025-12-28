# Inngest Lab

## Overview

This project contains tests and examples for working with Inngest, a durable execution engine for TypeScript.

## Prerequisites

- Node.js (v20 or higher recommended)
- Bun package manager
- Docker and Docker Compose (optional, for containerized development)

## Installation

Install dependencies using Bun:

```bash
bun install
```

## Running the Application

### Option 1: Using Docker (I prefer)

Run the application using Docker Compose:

```bash
docker compose -f docker-compose.dev.yaml up -d
```

> To destroy the containers after your tests...
>
> ```bash
> docker compose -f docker-compose.dev.yaml down
> ```

### Option 2: Local Development

Run the Express server:

```bash
bun dev
```

In a separate terminal, start the Inngest dev server:

```bash
npx --ignore-scripts=false inngest-cli@latest dev -u http://localhost:3000/api/inngest
```

## Accessing the Inngest Dev Server

Open your browser and navigate to:

```
http://localhost:8288
```

## Triggering Events

To trigger a test event, visit:

```
http://localhost:3000/trigger/hello-world
```

View all runs at:

```
http://localhost:8288/runs
```

## Load Testing

If you have [wrk](https://github.com/wg/wrk) installed, you can perform load testing:

```bash
wrk -t4 -c20 -d30s --header "User-Agent: LoadTest/1.0 (wrk)" "http://localhost:3000/trigger"
```

**Parameters:**

- `-t4`: 4 threads
- `-c20`: 20 concurrent connections
- `-d30s`: 30-second duration
