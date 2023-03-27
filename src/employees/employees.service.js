import { CustomError } from "../lib/CustomError.js";
import { employeeResource } from "./employees.resource.js";

class EmployeeService {
  async addEmployee(employeeData) {
    const employeeExist = await employeeResource.getEmployeeByEmail(employeeData.email);

    if (employeeExist) {
      throw new CustomError("Email already exist", 400);
    }
    return employeeResource.addEmployee(employeeData);
  }

  async getEmployee(employeeId) {
    const employee = await employeeResource.getEmployeeById(employeeId);
    if (!employee) {
      throw new CustomError("Employee not found");
    }
    return employee;
  }

  async assignManager(employeeId, managerId) {
    const managerExist = await employeeResource.getEmployeeById(managerId);
    const employeeExist = await employeeResource.getEmployeeById(employeeId);

    if (!managerExist || !employeeExist) {
      throw new CustomError("User not found", 400);
    }

    return employeeResource.assignManager(employeeId, managerId);
  }

  async getEmployees(limit, offset) {
    return employeeResource.getEmployees(limit, offset);
  }

  async updateEmployeeStatus(employeeId, status) {
    return employeeResource.updateEmployeeStatus(employeeId, status);
  }
}

export const employeeService = new EmployeeService();
