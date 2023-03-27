import { CustomError } from "../lib/CustomError.js";
import { employeeResouce } from "./employees.resource.js";

class EmployeeService {
  async addEmployee(employeeData) {
    return employeeResouce.addEmployee(employeeData);
  }
}

export const employeeService = new EmployeeService();
