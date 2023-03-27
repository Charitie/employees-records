import { Router } from "express";
import { validationResult } from "express-validator";

import { asyncRequestHandlerWrapper } from "../lib/asyncRequestHandlerWrapper.js";
import {
  employeeValidation,
  employeeIdValidation,
  userIdValidation,
  accountStatusValidation,
} from "../lib/middlewares/validation.js";
import { employeeService } from "./employees.service.js";

export function getEmployeeRouter() {
  const employeeRouter = Router();

  //add new employee
  employeeRouter.post(
    "/add-employee",
    employeeValidation,
    asyncRequestHandlerWrapper(async (req, res) => {
      validationResult(req).throw();
      const employee = await employeeService.addEmployee(req.body);
      res.status(201).json({ message: "Employee added successfully", employee });
    })
  );

  //fetch employee by id
  employeeRouter.get(
    "/fetch-employee/:id",
    employeeIdValidation,
    asyncRequestHandlerWrapper(async (req, res) => {
      validationResult(req).throw();

      const employee = await employeeService.getEmployee(req.params.id);
      res.status(200).json({ message: "Employee fetch successfully", employee });
    })
  );

  //assign a manager to employee
  employeeRouter.post(
    "/employee/assign-manager",
    userIdValidation,
    asyncRequestHandlerWrapper(async (req, res) => {
      validationResult(req).throw();

      const { employeeId, managerId } = req.body;
      const update = await employeeService.assignManager(employeeId, managerId);
      res.status(200).json({ message: "Employee assigned a manager successfully", update });
    })
  );

  //fetch all employees
  employeeRouter.get(
    "/fetch-employees",
    asyncRequestHandlerWrapper(async (req, res) => {
      const employees = await employeeService.getEmployees(req.query.limit, req.query.offset);
      res.status(200).json({ message: "Employees fetched successfully", employees });
    })
  );

  //update employee account status (soft delete)
  employeeRouter.put(
    "/update-employee-status",
    accountStatusValidation,
    asyncRequestHandlerWrapper(async (req, res) => {
      validationResult(req).throw();

      const { employeeId, status } = req.body;
      const employee = await employeeService.updateEmployeeStatus(employeeId, status);
      res.status(200).json({ message: "Employee status updated successfully", employee });
    })
  );

  return employeeRouter;
}
