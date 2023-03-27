import { knexInstance } from "../db/knexInstance.js";

class EmployeeResouce {
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
}

export const employeeResouce = new EmployeeResouce();
