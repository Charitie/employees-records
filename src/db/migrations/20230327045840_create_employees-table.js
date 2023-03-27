const EMPLOYEE_TABLE = "employees";

const createEmployeeTable = async (knex) => {
  await knex.schema.createTable(EMPLOYEE_TABLE, (table) => {
    table.increments("id").primary();
    table.datetime("date_employed").defaultTo(knex.fn.now());
    table.text("first_name", 128).notNullable();
    table.text("last_name", 128).notNullable();
    table.text("title", 128).notNullable();
    table.integer("manager_id").references("id").inTable("employee").onDelete("SET NULL");
    table.enum("status", ["active", "suspended", "deleted"]).defaultTo("active");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await createEmployeeTable(knex);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.schema.dropTable(EMPLOYEE_TABLE);
};
