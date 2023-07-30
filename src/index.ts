import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import SearchController from "./controller";
import { connect, PostgresSearchService } from "./db";
import { OpenAIClientService } from "./openAI";

dotenv.config();

async function main() {
  // express setup
  const app: Express = express();
  const port = process.env.HTTP_PORT;

  app.set("views", "views");
  app.set("view engine", "ejs");
  app.use(express.urlencoded({ extended: true })); // allows server to accept FormData on POSTs

  // initialise database pool
  const pool = await connect();

  // initialise data services
  const pgService = new PostgresSearchService(pool);
  const aiService = new OpenAIClientService();

  // initialise the company search controller
  const searchController = new SearchController(aiService, pgService);

  // routing
  app.get("/search", searchController.renderSearchForm);
  app.post("/search", searchController.searchCompanies);

  app.listen(port, () => {
    console.log(`[server]: Running at http://localhost:${port}`);
  });
}

main();
