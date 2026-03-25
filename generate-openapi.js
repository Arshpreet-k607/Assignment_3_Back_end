// Script to generate the OpenAPI specification JSON file into docs/openapi.json
// Uses swagger-jsdoc to read inline OpenAPI JSDoc comments from the TypeScript source.

const fs = require("fs");
const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

/** @type {import('swagger-jsdoc').Options} */
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event Registration API",
      version: "1.0.0",
      description:
        "API for managing event registration, including creating, updating, listing, and deleting events.",
    },
    servers: [
      {
        url: "https://arshpreet-k607.github.io/Assignment_3_Back_end",
      },
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [path.join(__dirname, "src/**/*.ts")],
};

const outputPath = path.join(__dirname, "docs", "openapi.json");

const spec = swaggerJsdoc(swaggerOptions);

fs.writeFileSync(outputPath, JSON.stringify(spec, null, 2), "utf-8");

console.log(`OpenAPI spec written to ${outputPath}`);
