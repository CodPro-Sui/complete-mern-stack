import Register from "../models/register.model.js";
import Otp from "../models/otp.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getOtp, getExpiry } from "../helper/otp.js";
import { sendMail } from "../helper/mailer.js";
import { validationResult } from "express-validator";

// create jwt session for 30 minutes 
const willExpire = (id) => jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: "30m" });

//register  user
export const registerUser = async (req, res) => {
    try {
        let errs = validationResult(req);
        if (!errs.isEmpty()) {
            return res.status(400).json(errs.mapped())
        }

        const { username, number, email, password } = req.body;

        //check user already exist
        let user = await Register.findOne({ email });
        if (user && user.isVerified) {
            return res.status(409).json({
    status: "error",
    message: "User already exists"
});
        }
        let hashedPassword = await bcrypt.hash(password, 10);

        let freshUser = user ? Object.assign(user, { username, number, password: hashedPassword }) :
            new Register({ username, number, email, password: hashedPassword });
        await freshUser.save();

        let otp = String(getOtp());
        let hashedOtp = await bcrypt.hash(otp, 10);
        await Otp.findOneAndDelete({ email, purpose: "register" });
        await Otp.create({ email, otp: hashedOtp, purpose: "register", expireAt: getExpiry() });
        await sendMail(email, otp, "register");


        res.status(201).json({ status: "success", message: "Successfully otp sent to your register email!" })
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ status: "error", message: "Username already taken" });
        }
        res.status(500).json({ status: "error", message: "Something went wrong" })
    }
};


//verifyRegister
export const verifyRegister = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const session = await Otp.findOne({ email, purpose: "register" });
        if (!session) {
            return res.status(400).json({ status: "error", message: "OTP expired!" })
        }
        let isOtpSame = await bcrypt.compare(otp, session.otp);
        if (!isOtpSame) {
            return res.status(400).json({ status: "error", message: "Invalid OTP!" });
        }
        await Register.findOneAndUpdate({ email }, { isVerified: true });
        await Otp.deleteOne({ _id: session._id });
        res.status(200).json({ status: "success", message: "Email verified successful" });
    } catch (err) {
  
        res.status(500).json({ status: "error", message: "Server error" });
    }
}


//login route
export const login = async (req, res) => {
    try {

        let errs = validationResult(req);
        if (!errs.isEmpty()) {
            return res.status(400).json(errs.mapped())
        }
        const { email, password } = req.body;
        let user = await Register.findOne({email});

        if (!user) {
            return res.status(400).json({ status: "error", tag: "email", message: "No email found" })
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: "error", tag: "password", message: "Incorrect password!" })
        }

        let otp = String(getOtp());
        let hashedOtp = await bcrypt.hash(otp, 10);
        await Otp.findOneAndDelete({ email: user.email, purpose: "login" });
        await Otp.create({ email: user.email, otp: hashedOtp, purpose: "login", expireAt: getExpiry() });

       await sendMail(email,otp,"login");
        res.status(200).json({ status: "success", message: "OTP sent successful" });
    } catch (err) {
        res.status(500).json({ status: "error", message: "Something went wrong!" })
    }
}
//verifyLogin
export const verifyLogin = async (req, res) => {
    try {
        let { email, otp } = req.body;
        let session = await Otp.findOne({ email, purpose: "login" });
        if (!session) {
            return res.status(400).json({ status: "error", message: "OTP session expire!" });
        }
        let isOtpSame = await bcrypt.compare(otp, session.otp);
        if (!isOtpSame) {
            return res.status(400).json({ status: "error", message: "Invalid otp!" });
        }
        let updateLogin = await Register.findOneAndUpdate({ email }, { isLogin: true },{returnDocument: "aftet"});
      if (!updateLogin) {
            return res.status(404).json({
                status: "error",
                message: "User not found!"
            });
        }
        await Otp.deleteOne({ _id: session._id });
        let token = willExpire(updateLogin._id);
        res.status(200).json({ token, status: "success", message: "You are successfully login!" });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Server error" })
    }
}

//update
export const updatePassword = async (req, res) => {
    try {
        let errs = validationResult(req);
        if (!errs.isEmpty()) {
            return res.status(400).json(errs.mapped());
        }

        const { email, number, newPassword } = req.body;

        let user = await Register.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: "error", tag: "username", message: "No user found" })
        }
        if (number !== user.number) {
            return res.status(400).json({ status: "error", tag: "number", message: "No number found" })
        }
        let hashedPassword = await bcrypt.hash(newPassword, 10);

        let otp = String(getOtp());
        let hashedOtp = await bcrypt.hash(otp,10);
        await Otp.deleteOne({ email, purpose: "update"});
        await Otp.create({ email, otp: hashedOtp, purpose: "update", temppassword: hashedPassword, expireAt: getExpiry() });

      await sendMail(email,otp,"update");
        res.status(200).json({ status: "success", message: "OTP sent successfully!" });
    } catch (err) {
        return res.status(500).json({ status: "error", message: "Server error found" });
    }
}

//now verify => update 
export const verifyUpdate = async (req, res) => {
    try {
        const { email, otp } = req.body;
        let session = await Otp.findOne({ email, purpose: "update" });
        let user = await Register.findOne({email});
        if (!session) {
            return res.status(400).json({ status: "error", message: "Session expired!" });
        }
        let isOtpSame = await bcrypt.compare(otp, session.otp);
        if (!isOtpSame) {
            return res.status(400).json({ status: "error", message: "Invalid OTP" })
        }

       user.password = session.temppassword;
       await user.save();
        await Otp.deleteOne({ _id: session._id });
        res.status(200).json({ status: "success", message: "Successfully password updated!" })
    } catch (err) {
        res.status(500).json({ status: "error", message: "Server error" });
    }
}

//resend otp
export const resend = async (req,res) =>{
    try {
        const {email,purpose} = req.body;
        await Otp.findOneAndDelete({email,purpose});
        let otp = String(getOtp());
        let hashedOtp = await bcrypt.hash(otp,10);
       await Otp.deleteOne({email});
       await Otp.create({email,otp:hashedOtp,purpose,expireAt: getExpiry()});
       await sendMail(email,otp,purpose);
       res.status(200).json({status:"success",message:"OTP sent successfully!"});
    } catch (error) {
       res.status(500).json({status:"error",message:"Server error"}) 
    }
}


export const logout = async (req, res) => {
 res.status(200).json({status:"success", message: "logout success" })
}

