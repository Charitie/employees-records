import { CustomError } from "../lib/CustomError.js";
import { employeeResouce } from "./employees.resource.js";

class EmployeeService {
  async addEmployee(employeeData) {
    const employeeExist = await employeeResouce.getEmployee('', employeeData.email);

    if (employeeExist) {
      throw new CustomError("Email already exist", 400);
    }
    return employeeResouce.addEmployee(employeeData);
  }

  async getEmployee(employeeId) {
    return employeeResouce.getEmployee(employeeId, '');
  }
}

export const employeeService = new EmployeeService();
