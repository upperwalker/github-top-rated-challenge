## Description
GitHub top-rated repositories challenge

## Review notes

The project leverages Redis cache to avoid repeatedly read from a CSV source. However, even without a connected Redis instance, the application remains functional, ensuring a robust user experience by utilizing Node.js streams for data processing

The project includes API documentation using OpenAPI. To explore the API documentation, navigate to `/documentation` after running the application. 






## Installation

```bash
$ pnpm install
```

## Setup

```bash
$ cp .env.example .env

nvm use
```
## Running the app
Run locally
```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

Or use docker
```bash
# build Docker image
docker-compose up --build -d
```

## Test

```bash
# e2e test
$ pnpm run test:e2e
```