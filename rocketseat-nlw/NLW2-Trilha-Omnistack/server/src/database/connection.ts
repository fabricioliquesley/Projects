import knex from "knex";
import {resolve} from "node:path"

export const knexClient = knex({
  client: "sqlite3",
  connection: {
    filename: resolve(__dirname, "database.sqlite")
  },
  useNullAsDefault: true,
})