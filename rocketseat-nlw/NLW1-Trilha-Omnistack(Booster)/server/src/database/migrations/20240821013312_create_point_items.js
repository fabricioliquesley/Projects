/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("point_items", (table) => {
    table.uuid("id").primary();
    table.uuid("point_id").notNullable().references("id").inTable("points");
    table.uuid("item_id").notNullable().references("id").inTable("items");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("point_items")
};
