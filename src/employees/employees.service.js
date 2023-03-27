import { CustomError } from "../lib/CustomError.js";
import { employeeResource } from "./employees.resource.js";

class EmployeeService {
  async addEmployee(employeeData) {
    const employee = await employeeResource.getEmployee("email", employeeData.email);

    if (employee) {
      throw new CustomError("Email already exist", 400);
    }
    return employeeResource.addEmployee(employeeData);
  }

  async getEmployee(filterKey, filterValue) {
    const employee = await employeeResource.getEmployee(filterKey, filterValue);
    if (!employee) {
      throw new CustomError(`Employee with ${filterKey} ${filterValue} not found`);
    }
    return employee;
  }

  async assignManager(employeeId, managerId) {
    const managerExist = await employeeResource.getEmployee("id", managerId);
    const employeeExist = await employeeResource.getEmployee("id", employeeId);

    if (!managerExist || !employeeExist) {
      throw new CustomError("User not found", 400);
    }

    return employeeResource.assignManager(employeeId, managerId);
  }

  async getEmployees(limit, offset) {
    return employeeResource.getEmployees(limit, offset);
  }

  async updateEmployeeStatus(employeeId, status) {
    await this.getEmployee("id", employeeId);
    return employeeResource.updateEmployeeStatus(employeeId, status);
  }

  async deleteEmployee(employeeId) {
    await this.getEmployee("id", employeeId);
    return employeeResource.deleteEmployee(employeeId);
  }
}

export const employeeService = new EmployeeService();
