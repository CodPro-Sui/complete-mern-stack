import express from "express";
import {login,resend,verifyLogin,registerUser,verifyRegister,updatePassword,verifyUpdate,logout} from "../controllers/register.controller.js";
import loginValid from "../validators/login.valid.js";
import registerValid from "../validators/register.valid.js";
import updateValid from "../validators/updatePassword.valid.js";

import multer from "multer";

const upload = multer();

const router = express.Router();

router.route("/register")
.post(upload.none(),registerValid,registerUser);

router.route("/verify-register")
.post(verifyRegister);

router.route("/login")
.post(upload.none(),loginValid,login);

router.route("/verify-login")
.post(verifyLogin);

router.route("/reset")
.post(upload.none(),updateValid,updatePassword);

router.route("/verify-reset")
.post(verifyUpdate);

router.route("/resend")
.post(resend);

router.route("/logout")
.get(logout);

export default router;
