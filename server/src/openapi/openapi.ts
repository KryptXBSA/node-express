import { appRouter } from "../router/router";
import { generateOpenApiDocument } from "trpc-openapi";


// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "Example CRUD API",
  description: "OpenAPI compliant REST API built using tRPC with Express",
  version: "1.0.1",
  baseUrl: "http://localhost:3002/api",
  docsUrl: "https://github.com/jlalmes/trpc-openapi",
  tags: ["auth", "user", "posts"],
});
