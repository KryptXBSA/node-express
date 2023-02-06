import express from "express";
import { router } from "./routes/routes";
import "dotenv/config";
let cors = require("cors");
let path = require("path");
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter, createContext } from "./trpc/trpc";

// created for each request

const app = express();
app.use(cors())

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

var dir = path.join(__dirname, "..", "images");

app.use("/images", express.static(dir));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
const port = process.env.PORT || 7002;
app.use(express.json());
app.use(router);

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
