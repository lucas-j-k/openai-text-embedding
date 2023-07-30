import { IOpenAIService, ISearchDBService, CompanySQLResult } from "./types";
import { waitAndReturn } from "./util";

/**
 * MockOpenAIService is a mocked wrapper for the openAI client
 */
export class MockOpenAIService implements IOpenAIService {
  constructor() {}

  async embedPrompt(prompt: string) {
    return waitAndReturn<number[]>([0.1, 0.3, 0.5]);
  }
}

/**
 * MockDBService is a mocked wrapper around the company resource in Postgres
 */
export class MockDBService implements ISearchDBService {
  constructor() {}

  async searchCompanies(vector: number[]) {
    return waitAndReturn<CompanySQLResult[]>([
      { id: 1, name: "test name 1", description: "Test description 1" },
      { id: 45, name: "test name 45", description: "Test description 45" },
    ]);
  }
}
