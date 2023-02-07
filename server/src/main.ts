import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { createOpenApiExpressMiddleware } from "trpc-openapi";
import "dotenv/config";
import path from "path";
import { openApiDocument } from "./openapi/openapi";
import {  createContext } from "./trpc/trpc";
import { appRouter } from "./router/router";

const app = express();

var dir = path.join(__dirname, "..", "images");
app.use("/images", express.static(dir));

// Setup CORS
app.use(cors());

// Handle incoming tRPC requests
app.use(
  "/api/trpc",
  createExpressMiddleware({ router: appRouter, createContext })
);
// Handle incoming OpenAPI requests
app.use(
  "/api",
  createOpenApiExpressMiddleware({ router: appRouter, createContext })
);

// Serve Swagger UI with our OpenAPI schema
app.use("/", swaggerUi.serve);
app.get("/", swaggerUi.setup(openApiDocument));

const port = process.env.PORT || 7002;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
