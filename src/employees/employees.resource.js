import { knexInstance } from "../db/knexInstance.js";

class EmployeeResouce {
  employeeTable = "employees";

  async addEmployee(employeeData) {
    const employee = await knexInstance(this.employeeTable).insert(employeeData, "*");
    return employee[0];
  }

  async getEmployee(email) {
    const employee = await knexInstance(this.employeeTable).where({ email }).first();
    return employee;
  }
}

export const employeeResouce = new EmployeeResouce();
