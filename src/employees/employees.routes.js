import { Router } from "express";
import { asyncRequestHandlerWrapper } from "../lib/asyncRequestHandlerWrapper.js";
import { employeeService } from "./employees.service.js";

export function getEmployeeRouter() {
  const employeeRouter = Router();
  employeeRouter.post(
    "/add-employee",
    asyncRequestHandlerWrapper(async (req, res) => {
      const employee = await employeeService.addEmployee(req.body);
      res.status(201).json({ message: "Employee added successfully", employee });
    })
  );

  return employeeRouter;
}
