# Event Registration API

Event Registration API built with Express, TypeScript, Joi validation, and Firebase Firestore.

The API allows clients to create, list, update, and delete events stored in Firestore. It is designed as a backend service for event management dashboards or registration forms, with validation, security headers, and OpenAPI documentation included.

## Project Overview

- **What it does**: Provides REST endpoints for managing events (CRUD operations) backed by Firebase Firestore.
- **Problem it solves**: Centralizes event data in a consistent, validated API instead of ad‑hoc data storage.
- **Who it is for**: Front-end applications (web or mobile) and integrations that need a secure event management backend.

Full API documentation is available at: https://arshpreet-k607.github.io/Assignment_3_Back_end/

When running locally, Swagger UI is available at: http://localhost:3000/api-docs

## Installation

### Prerequisites

- Node.js 20
- Firebase project with Firestore enabled
- A Firebase service account JSON file

### Steps

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create an `.env` file based on `.env.example` and set:

   - `FIREBASE_SERVICE_ACCOUNT_PATH` to the path of your service account JSON file.
   - `PORT` to the port you want the server to listen on (optional, defaults to `3000`).
   - `CORS_ALLOWED_ORIGINS` to a comma-separated list of allowed origins (for example `http://localhost:3000`).

3. Build the project:

   ```bash
   npm run build
   ```

### Running the API

- Development mode (with ts-node-dev):

  ```bash
  npm run dev
  ```

- Production build:

  ```bash
  npm start
  ```

The server listens on port `3000` by default, or the value of `PORT` if provided.

## Testing

- Run the Jest test suite:

  ```bash
  npm test
  ```

Tests use Jest with ts-jest and mock Firebase via `test/jest.setup.ts`.

## API Request Examples

Below are example requests using `curl`. Replace `localhost:3000` with your deployed host if needed.

### Get API Health

**Request:**

```bash
curl -X GET "http://localhost:3000/api/v1/health" \
  -H "Accept: application/json"
```

**Response (200 OK):**

```json
{
  "status": "ok"
}
```

### Create an Event

**Request:**

```bash
curl -X POST "http://localhost:3000/api/v1/events" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TypeScript Workshop",
    "description": "A hands-on workshop covering advanced TypeScript patterns.",
    "date": "2026-04-15T18:00:00.000Z",
    "location": "Online - Zoom",
    "capacity": 100,
    "category": "workshop",
    "status": "draft",
    "isVirtual": true,
    "organizerEmail": "organizer@example.com"
  }'
```

**Response (201 Created):**

```json
{
  "id": "generated-id",
  "name": "TypeScript Workshop",
  "description": "A hands-on workshop covering advanced TypeScript patterns.",
  "date": "2026-04-15T18:00:00.000Z",
  "location": "Online - Zoom",
  "capacity": 100,
  "category": "workshop",
  "status": "draft",
  "isVirtual": true,
  "organizerEmail": "organizer@example.com",
  "createdAt": "2026-03-25T10:00:00.000Z",
  "updatedAt": "2026-03-25T10:00:00.000Z"
}
```

### Get All Events

**Request:**

```bash
curl -X GET "http://localhost:3000/api/v1/events" \
  -H "Accept: application/json"
```

**Response (200 OK):**

```json
[
  {
    "id": "generated-id",
    "name": "TypeScript Workshop",
    "description": "A hands-on workshop covering advanced TypeScript patterns.",
    "date": "2026-04-15T18:00:00.000Z",
    "location": "Online - Zoom",
    "capacity": 100,
    "category": "workshop",
    "status": "draft",
    "isVirtual": true,
    "organizerEmail": "organizer@example.com",
    "createdAt": "2026-03-25T10:00:00.000Z",
    "updatedAt": "2026-03-25T10:00:00.000Z"
  }
]
```

### Get a Single Event by ID

**Request:**

```bash
curl -X GET "http://localhost:3000/api/v1/events/{id}" \
  -H "Accept: application/json"
```

**Response (200 OK):**

```json
{
  "id": "generated-id",
  "name": "TypeScript Workshop",
  "description": "A hands-on workshop covering advanced TypeScript patterns.",
  "date": "2026-04-15T18:00:00.000Z",
  "location": "Online - Zoom",
  "capacity": 100,
  "category": "workshop",
  "status": "draft",
  "isVirtual": true,
  "organizerEmail": "organizer@example.com",
  "createdAt": "2026-03-25T10:00:00.000Z",
  "updatedAt": "2026-03-25T10:00:00.000Z"
}
```

## Local and Public Documentation

- **Local Swagger UI**: When running locally, access the interactive API docs at `http://localhost:3000/api-docs`.
- **Public GitHub Pages docs**: After GitHub Actions deployment, the static documentation is available at `https://arshpreet-k607.github.io/Assignment_3_Back_end/`.

The static docs are generated from the inline OpenAPI JSDoc comments using `swagger-jsdoc` and published from the `docs/` folder via GitHub Pages.
