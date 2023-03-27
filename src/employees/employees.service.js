import { CustomError } from "../lib/CustomError.js";
import { employeeResouce } from "./employees.resource.js";

class EmployeeService {
  async addEmployee(employeeData) {
    const employeeExist = await employeeResouce.getEmployeeByEmail(employeeData.email);

    if (employeeExist) {
      throw new CustomError("Email already exist", 400);
    }
    return employeeResouce.addEmployee(employeeData);
  }

  async getEmployee(employeeId) {
    return employeeResouce.getEmployeeById(employeeId);
  }

  async assignManager(employeeId, managerId) {
    const managerExist = await employeeResouce.getEmployeeById(managerId);
    const employeeExist = await employeeResouce.getEmployeeById(employeeId);

    if (!managerExist || !employeeExist) {
      throw new CustomError("User not found", 400);
    }

    return employeeResouce.assignManager(employeeId, managerId);
  }
}

export const employeeService = new EmployeeService();
