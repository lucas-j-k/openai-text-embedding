/**
 * Query all rows in the DB and populate the embedded vector for the name + description
 */

const { Pool } = require("pg");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASS,
  port: process.env.PG_PORT,
});

const wait = (ms) => new Promise((res) => setTimeout(() => res(), ms));

async function run() {
  const { rows } = await pool.query("SELECT * FROM company");

  console.log("Rows to embed : ", rows.length);

  for (const row of rows) {
    const combined = row.name + " - " + row.description;
    const parameters = {
      model: "text-embedding-ada-002",
      input: combined,
    };
    console.log("Embedding: ", combined);

    const resp = await openai.createEmbedding(parameters);
    const embedding = resp.data.data[0].embedding;
    const formatted = "[" + embedding.join() + "]";

    await pool.query("UPDATE company SET embedding = $1 WHERE id = $2", [
      formatted,
      row.id,
    ]);

    await wait(500);
  }

  process.exit(0);
}

run();
