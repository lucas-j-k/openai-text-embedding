#### Trying out ChatGPT text embeddings

- take an imcoming user search prompt from the front end
- embed the prompt with openAI to produce a vector
- query Postgres with the vector to get the most similar results in the stored embeddings in our data
- return the closest results with HTMX to render a list in the UI