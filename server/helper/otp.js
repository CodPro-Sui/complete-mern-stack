import crypto from "node:crypto";

export const getOtp = () => crypto.randomInt(100000,999999);
export const getExpiry = () =>{
let minute = parseInt(process.env.OTP_TTL_MINUTES || "5",10);
return new Date(Date.now() + minute * 60 * 1000);
}
