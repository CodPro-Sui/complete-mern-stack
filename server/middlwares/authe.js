import jwt from "jsonwebtoken";

const authe = async (req,res,next) =>{
try{
const headerAuth = req.headers.authorization;
if(!headerAuth){
return res.json({status: "warning",message: "session expired!"})
}

const [type, token ] = req.headers["authorization"].split(" ");

if(type !== "Bearer" || !token){
return res.status(401).json({status:"error",message:"invalid or token modified"})
}

let decode = jwt.verify(token,process.env.JWT_SECRET)
req.tokenInfo = decode;
next()
}catch(error){
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "error",
        tag: "token",
        message: "Token expired. Please login again."
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: "error",
        tag: "token",
        message: "Invalid token"
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Authentication failed"
    });
}
}
export default authe;
