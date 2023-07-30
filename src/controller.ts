import { Request, Response } from "express";
import { IOpenAIService, ISearchDBService } from "./types";

/**
 * Route handlers for company search functionality
 */
export default class SearchController {
  openAiService: IOpenAIService;
  dbService: ISearchDBService;

  constructor(openAiService: IOpenAIService, dbService: ISearchDBService) {
    this.openAiService = openAiService;
    this.dbService = dbService;
  }

  renderSearchForm = async (req: Request, res: Response) => {
    res.render("index", { results: [] });
  };

  searchCompanies = async (req: Request, res: Response) => {
    const prompt = req.body.term as string;

    // embed the user prompt with OpenAI and retrieve the embedding vector
    const embeddedPrompt = await this.openAiService.embedPrompt(prompt);

    // pass the vector to the DB search function to match on similarity
    const vectorMatches = await this.dbService.searchCompanies(embeddedPrompt);

    // render a partial, as UI is using HTMX swaps
    return res.render("partials/results", { results: vectorMatches });
  };
}
