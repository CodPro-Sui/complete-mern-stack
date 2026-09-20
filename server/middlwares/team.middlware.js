import multer from "multer";
import path from "node:path";
export const noFound = (req,res,next) =>{
    res.status(404).json({message: "Page no found"})
};

export const errHandle = (err,req,res,next) =>{
    console.log(err);
   if(err instanceof multer.MulterError){
    return res.status(413).json({status: "error",message: "Invalid file"})
   }
    return res.status(500).json({status:"error",message: "Server error"})
}

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,"./uploads")
    },
    filename: (req,file,cb) =>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
});
const fileFilter = (req,file,cb) =>{
    const exts = [".jpg",".jpeg",".png"];
    const fileType = path.extname(file.originalname).toLowerCase();
    if(exts.includes(fileType)){
        cb(null,true)
    }else{
    cb(new Error("Invalid file extension."),false)
    }
}
export const upload = multer({
    storage,
    fileFilter,
    limits:{
        fileSize: 1024 * 1024 * 3
    }
})
