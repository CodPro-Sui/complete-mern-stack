import mongoose from "mongoose";

const register = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    number:{
        type:String,
        required: true,
        minLength:10,
       maxLength:10
    },
    email:{
        type:String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,}$/
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isLogin:{
    type: Boolean,
    default:false
 },
     password:{
     type:String,
     required:true,
     minlength:6
     }
},{timestamps:true});



export default mongoose.model("registers",register);
