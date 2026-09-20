import {body} from "express-validator";

const team = [
    body("fname")
    .notEmpty()
    .withMessage("Name cannot be empty.")
    .isLength({min: 3})
    .withMessage("Name should be atleast five chars.")
    .isAlpha()
    .withMessage("Only alphabets allowed.")
    .trim(),
    body("lname")
    .optional()
    .isAlpha()
    .withMessage("Only alphabets allowed.")
    .trim(),
    body("number")
    .notEmpty()
    .withMessage("Number required.")
    .isLength({min: 10,max: 10})
    .withMessage("Enter valid phone number.")
    .isNumeric()
    .withMessage("Only numbers allowed"),
    body("email")
    .notEmpty()
    .withMessage("Email cannot be empty.")
    .isEmail()
    .withMessage("Enter valid email")
    .bail()
    .normalizeEmail()
];

export default team;