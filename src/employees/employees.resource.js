import { knexInstance } from "../db/knexInstance.js";

class EmployeeResouce {
  employeeTable = "employees";

  async addEmployee(employeeData) {
    const employee = await knexInstance(this.employeeTable).insert(employeeData, "*");
    return employee[0];
  }
}

export const employeeResouce = new EmployeeResouce();
