exports.up = knex => knex.schema.createTable("incomes", table => {
    table.increments("id");
    table.text("type").notNullable();
    table.text("title").notNullable();
    table.text("description").notNullable();
    table.integer("value").notNullable();
    table.text("date").notNullable();
    table.text("category").notNullable();
    table.text("status").notNullable();
    table.integer("user_id").references("id").inTable("users");
});

exports.down = knex => knex.schema.dropTable("incomes");