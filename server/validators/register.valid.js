import { body} from "express-validator";
import Register from "../models/register.model.js";

const registerValid = [
    body("username")
        .notEmpty()
        .withMessage("cannot be empty.")
        .isLength({ min: 3 })
        .withMessage("username must be 3 chars!")
        .matches(/^[a-zA-Z0-9.]+$/),
    body("number")
        .notEmpty()
        .withMessage("cannot be empty!")
        .isLength({ min: 10, max: 10 })
        .withMessage("enter valid number!"),
    body("email")
        .notEmpty()
        .withMessage("cannot be empty!")
        .normalizeEmail()
        .isEmail()
        .withMessage("please enter valid email"),
    body("password")
        .notEmpty()
        .withMessage("cannot be empty!")
        .isLength({ min: 6 })
        .withMessage("password should be atleast 6 chars")
]

export default registerValid;
