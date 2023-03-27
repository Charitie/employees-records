import { Router } from "express";
import { validationResult } from "express-validator";

import { asyncRequestHandlerWrapper } from "../lib/asyncRequestHandlerWrapper.js";
import { employeeValidation } from "../lib/middlewares/employeeValidation.js";
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
    asyncRequestHandlerWrapper(async (req, res) => {
      const employee = await employeeService.getEmployee(req.params.id);
      res.status(200).json({ message: "success", employee });
    })
  );

  return employeeRouter;
}
