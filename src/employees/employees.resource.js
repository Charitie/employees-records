import { knexInstance } from "../db/knexInstance.js";

class EmployeeResource {
  employeeTable = "employees";

  async addEmployee(employeeData) {
    const employee = await knexInstance(this.employeeTable).insert(employeeData, "*");
    return employee[0];
  }

  async getEmployee(filterKey, filterValue) {
    const employee = await knexInstance(this.employeeTable)
      .where({ [filterKey]: filterValue })
      .first();
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
            em.id, em.first_name, em.last_name, em.title,
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

  async deleteEmployee(employeeId) {
    const update = await knexInstance(this.employeeTable).where("id", employeeId).del();
    return update;
  }
}

export const employeeResource = new EmployeeResource();
