import {body} from "express-validator";
import Team from "../models/team.model.js";
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
    .withMessage("Only numbers allowed")
    .custom(async (val) =>{
      if(await Team.findOne({number: val})){
      throw new Error("number already exists!")
      }
     }),
    body("email")
    .notEmpty()
    .withMessage("Email cannot be empty.")
    .isEmail()
    .withMessage("Enter valid email")
    .bail()
    .normalizeEmail()
    .custom(async (val) =>{
      if(await Team.findOne({email: val})){
      throw new Error("email id already exists!")
      }
     })
];

export default team;
