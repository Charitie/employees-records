import { check, param } from "express-validator";

export const employeeValidation = [
  check("firstName")
    .not()
    .isEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2 })
    .withMessage("First name is invalid"),
  check("lastName")
    .not()
    .isEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2 })
    .withMessage("Last name is invalid"),
  check("email").not().isEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email address"),
  check("title")
    .not()
    .isEmpty()
    .withMessage("Title is required")
    .isLength({ min: 2 })
    .withMessage("Title must have atleast 2 characters"),
];

export const userIdValidation = [
  check("employeeId").not().isEmpty().withMessage("Employee id required"),
  check("managerId").not().isEmpty().withMessage("Manager id required"),
];

export const employeeIdValidation = [param("employeeId").trim().isInt().withMessage("Employee id is required")];

const STATUS = ["active", "suspended", "deleted"];
export const accountStatusValidation = check("status").isIn(STATUS).withMessage("Invalid status");
