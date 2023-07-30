export type CompanySQLResult = {
  id: number;
  name: string;
  description: string;
};

export interface ISearchDBService {
  searchCompanies: (vector: number[]) => Promise<CompanySQLResult[]>;
}

export interface IOpenAIService {
  embedPrompt: (prompt: string) => Promise<number[]>;
}