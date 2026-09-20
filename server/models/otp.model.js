import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
 email:{
 type: String,
  required: true,
lowercase: true
},
otp:{
type: String,
required: true,
},
purpose:{
type: String,
required: true,
enum: ["register","login","update"]
},
temppassword:{
type: String,
default: null
},
expireAt:{
type: Date,
required: true
}

});
otpSchema.index({expireAt:1},{expireAfterSeconds: 0});
export default mongoose.model("Otp",otpSchema);
