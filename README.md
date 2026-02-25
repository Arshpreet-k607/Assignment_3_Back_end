# Event Registration API

Event Registration API built with Express, TypeScript, Joi validation, and Firebase Firestore.

## Prerequisites

- Node.js 20
- Firebase project with Firestore enabled
- A Firebase service account JSON file

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create an `.env` file based on `.env.example` and set:

   - `FIREBASE_SERVICE_ACCOUNT_PATH` to the path of your service account JSON file.

3. Build the project:

   ```bash
   npm run build
   ```

## Running the API

- Development mode (with ts-node-dev):

  ```bash
  npm run dev
  ```

- Production build:

  ```bash
  npm start
  ```

The server listens on port `3000` by default, or `PORT` if provided.

## Testing

- Run the Jest test suite:

  ```bash
  npm test
  ```

Tests use Jest with ts-jest and mock Firebase via `test/jest.setup.ts`.

## API Overview

- `GET /api/v1/health` – Health check.
- `POST /api/v1/events` – Create event (Joi validation required).
- `GET /api/v1/events` – Get all events.
- `GET /api/v1/events/:id` – Get event by ID.
- `PUT /api/v1/events/:id` – Update event.
- `DELETE /api/v1/events/:id` – Delete event.

Validation behavior for creating events is based on the course demo video and enforced via Joi schemas and validation middleware.
