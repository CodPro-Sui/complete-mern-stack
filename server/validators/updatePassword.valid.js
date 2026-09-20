import { body } from "express-validator";

const empty = "cannot be empty!";

const update = [
  body("email")
    .notEmpty()
    .withMessage(empty)
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email format!"),

  body("number")
    .notEmpty()
    .withMessage(empty)
    .isNumeric()
    .withMessage("Value must be numberic")
    .isLength({min:10,max:10})
    .withMessage("Length must be 10"),

  body("newPassword")
    .notEmpty()
    .withMessage(empty)
    .isLength({ min: 6 })
    .withMessage("at least 6 chars or more")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@&*%$#!._\-])[a-zA-Z0-9@&*%$#!._\-]{6,}$/
    )
    .withMessage("create a strong password!"),

  body("confirmPassword")
    .notEmpty()
    .withMessage(empty)
    .custom((val, { req }) => {
      if (val !== req.body.newPassword) {
        throw new Error("Passwords do not match!");
      }

      return true;
    }),
];

export default update;
