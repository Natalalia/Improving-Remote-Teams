exports.up = function(knex) {
  return knex.schema.createTable("shifts", shiftsTable => {
    shiftsTable.increments("shifts_id").primary();
    shiftsTable.string("employee_id").notNullable();
    shiftsTable.datetime("start_time").defaultTo(knex.fn.now());
    shiftsTable.datetime("finish_time");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("shifts");
};
