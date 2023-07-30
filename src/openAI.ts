import { Configuration, OpenAIApi } from "openai";
import { IOpenAIService } from "./types";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * Wrapper around the OpenAI client interactions for company search
 */
export class OpenAIClientService implements IOpenAIService {
  client: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const activeClient = new OpenAIApi(configuration);
    this.client = activeClient;
  }

  embedPrompt = async (prompt: string) => {
    const parameters = {
      model: "text-embedding-ada-002",
      input: prompt,
    };
    // embed the user query with openAI and return the embedding vector.
    const resp = await openai.createEmbedding(parameters);
    const embedding = resp.data.data[0].embedding;
    return embedding;
  };
}
