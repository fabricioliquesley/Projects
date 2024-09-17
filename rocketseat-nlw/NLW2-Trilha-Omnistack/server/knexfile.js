const { resolve } = require("node:path")

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: resolve(__dirname, "src", "database", "database.sqlite"),
    },
    migrations: {
      directory: resolve(__dirname, "src", "database", "migrations"),
    },
    useNullAsDefault: true,
  },
};
