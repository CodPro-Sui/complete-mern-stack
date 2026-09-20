import {body} from "express-validator";

const login = [
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty.")
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email format."),

  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters.")
];

export default login;
