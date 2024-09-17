/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("class_schedule", (table) => {
    table.uuid("id").primary();
    table.integer("week_day").notNullable();
    table.integer("from").notNullable();
    table.integer("to").notNullable();

    table.uuid("class_id")
      .references("id")
      .inTable("classes")
      .onUpdate("CASCADE")
      .onDelete("CASCADE")
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("class_schedule")
};
