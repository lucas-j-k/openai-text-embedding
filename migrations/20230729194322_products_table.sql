-- +goose Up

-- +goose StatementBegin
CREATE EXTENSION vector;
-- +goose StatementEnd


-- +goose StatementBegin
CREATE TABLE company (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  embedding vector(1536)
);
-- +goose StatementEnd