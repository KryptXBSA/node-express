import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { createOpenApiExpressMiddleware } from "trpc-openapi";
import "dotenv/config";
import path from "path";
import { openApiDocument } from "./openapi/openapi";
import { appRouter, createContext } from "./trpc/trpc";

const app = express();

var dir = path.join(__dirname, "..", "images");
app.use("/images", express.static(dir));

const port = process.env.PORT || 7002;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

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

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
