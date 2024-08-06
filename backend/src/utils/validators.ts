import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import { VALIDATION_MESSAGES } from "../utils/constants.js";

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

export const loginValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage(VALIDATION_MESSAGES.EMAIL_REQUIRED),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage(VALIDATION_MESSAGES.PASSWORD_LENGTH),
];

export const signupValidator = [
  body("name").notEmpty().withMessage(VALIDATION_MESSAGES.NAME_REQUIRED),
  ...loginValidator,
];

export const chatCompletionValidator = [
  body("message").notEmpty().withMessage(VALIDATION_MESSAGES.MESSAGE_REQUIRED),
];
