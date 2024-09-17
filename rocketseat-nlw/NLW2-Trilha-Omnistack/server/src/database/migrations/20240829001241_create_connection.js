/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("connections", (table) => {
    table.uuid("id").primary();
    table.timestamp("created_at").defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();

    table.uuid("user_id")
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE")
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("connections")
};
