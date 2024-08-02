import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next(); // If no errors detected, it will continue with next middleware "Signup" function
    }
    return res.status(422).json({ errors: errors.array() });
  };
};

export const signupValidator = [
  body("name").notEmpty().withMessage("Name is requreded"),
  body("email").trim().isEmail().withMessage("Email is requreded"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password need to be min 8 characters"),
];
