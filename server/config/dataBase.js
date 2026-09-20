import mongoose from "mongoose";

const connectDataBase = async () =>{
    try{
        await mongoose.connect(process.env.DATABASE);
        console.log("server Connected!")
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

export default connectDataBase;