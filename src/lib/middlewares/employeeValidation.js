import { check, oneOf } from "express-validator";

// export const employeeValidation = [body("email").isEmail()];

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
