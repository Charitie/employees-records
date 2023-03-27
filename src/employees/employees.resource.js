import { knexInstance } from "../db/knexInstance.js";

class EmployeeResource {
  employeeTable = "employees";

  async addEmployee(employeeData) {
    const employee = await knexInstance(this.employeeTable).insert(employeeData, "*");
    return employee[0];
  }

  async getEmployeeByEmail(email) {
    const employee = await knexInstance(this.employeeTable).where({ email }).first();
    return employee;
  }

  async getEmployeeById(id) {
    const employee = await knexInstance(this.employeeTable).where({ id }).first();
    return employee;
  }

  async assignManager(employeeId, managerId) {
    const update = await knexInstance(this.employeeTable).update({ managerId }, "*").where("id", employeeId);
    return update;
  }

  async getEmployees(limit, offset) {
    const employees = await knexInstance
      .select(
        knexInstance.raw(
          `
            em.id, em.first_name, em.last_name,
            coalesce(manager.first_name || ' ' || manager.last_name, 'No Manager') as manager 
            FROM ${this.employeeTable} em
            LEFT JOIN ${this.employeeTable} manager 
            ON em.manager_id = manager.id
        `
        )
      )
      .offset(offset)
      .limit(limit);
    return employees;
  }

  async updateEmployeeStatus(employeeId, status) {
    const update = await knexInstance(this.employeeTable).update({ status }, "*").where("id", employeeId);
    return update;
  }
}

export const employeeResource = new EmployeeResource();
