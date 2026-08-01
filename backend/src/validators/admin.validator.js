import { body } from "express-validator";

export const createUserValidation = [
  body("name")
    .isLength({ min: 20, max: 60 })
    .withMessage("Name must be between 20 and 60 characters"),

  body("email")
    .isEmail()
    .withMessage("Invalid email"),

  body("address")
    .isLength({ max: 400 })
    .withMessage("Address must not exceed 400 characters"),

  body("password")
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/)
    .withMessage(
      "Password must be 8-16 characters with one uppercase letter and one special character"
    ),

  body("role")
    .isIn(["ADMIN", "USER", "OWNER"])
    .withMessage("Invalid role"),
];

export const createStoreValidation = [
  body("name")
    .isLength({ min: 20, max: 60 })
    .withMessage("Store name must be between 20 and 60 characters"),

  body("email")
    .isEmail()
    .withMessage("Invalid email"),

  body("address")
    .isLength({ max: 400 })
    .withMessage("Address must not exceed 400 characters"),

  body("ownerId")
    .isInt({ min: 1 })
    .withMessage("Owner ID is required"),
];