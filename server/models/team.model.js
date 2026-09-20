import mongoose from "mongoose";

const team = new mongoose.Schema({
    avatar:{
        type:String,
        required: true
    },
    fname:{
        type: String,
        required: true,
        minLength: 3,
        match: /^[a-zA-Z\s]+$/
    },
    lname:{
        type: String,
        match: /^[a-zA-Z\s]+$/
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9\.]+\@[a-zA-Z]+\.[a-zA-Z]+$/
    },
    number:{
        type: String,
        minlength:10,
        maxlength: 10,
        unique: true,
        required:true
    },
    role:{
        type: String,
         required: true
    },
   unique_id:{
   type: String,
   required: true,
   unique:true
   }
},
{
    timestamps: true
}
);

export default mongoose.model("Team",team)
