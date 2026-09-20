import Team from "../models/team.model.js";
import crypto from "node:crypto";
import { validationResult } from "express-validator";
import fs from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";
import pegination from "../helper/pegination.js";
export const getTeam = async (req,res) =>{
    try{
     const search = req.query.search || "";
  
    const filter = search ? {
     $or:[
     {fname: {$regex: search,$options:"i"}},
      {lname: {$regex: search,$options:"i"}},
      {email: {$regex: search,$options:"i"}},
      {role: {$regex: search,$options:"i"}},
       {number: {$regex: search,$options:"i"}}
     ]
    } : {};
     
     const pageInfo = await pegination(req.query.page,req.query.limit,Team,filter);
     const {limit,skip} = pageInfo;

    let teams = await Team.find(filter).skip(skip).limit(limit);
    res.status(200).json({teams,pageInfo});
  }catch(err){
  res.status(500).json({status: "warning",message: "something went wrong!"})
   }
}

export const addTeam = async (req,res) => {
     try{
      const errs = validationResult(req);
      if(!errs.isEmpty()){
       return res.status(400).json(errs.mapped());
       }
      const unique_id = crypto.randomBytes(5).toString("base64url").slice(0, 7);
      const {fname,lname,number,email,role} = req.body;
  
const team_info = new Team({
        avatar: req.file.filename,
         fname,
         lname,
         number,
         email,
         role,
         unique_id
        });
await team_info.save();
       res.status(201).json({status: "success",message: "User created successful!"}) 
 }catch(err){
      res.status(500).json({status:"warning",message: "failed"})
}
}

export const updateSingle = async (req,res) => {
      const mongodIdFromClient =  req.body.unique_id;
     try{
    const alreadyTeam = await Team.findOne({unique_id: mongodIdFromClient});
    if(!alreadyTeam){
     return res.status(400).json({status: "error",message:"No Team Found"});
    }
    const errs = validationResult(req);
    if(!errs.isEmpty()){
    return res.status(400).json(errs.mapped());
    }
    if(req.file){ 
    req.body.avatar = req.file.filename;
    await fs.unlink(path.join(process.cwd(),"uploads",alreadyTeam.avatar));
    }else{
    req.body.avatar = alreadyTeam.avatar;
    }
    
    const result = await Team.findByIdAndUpdate(alreadyTeam._id,{$set:req.body},{returnDocument:"after",runValidators:true});
    return res.status(200).json({status:"success",message:"Updated!"}); 
   }catch(err){
     console.log(err);
     res.status(500).json({status:"error",message:"Server problem"})
    }

}


export const deleteSingle = async (req, res) => {
  const mongodIdFromClient = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(mongodIdFromClient)) {
      return res.status(400).json({
        status: "warning",
        message: "Invalid ID"
      });
    }

    const alreadyTeam = await Team.findOne({
      _id: mongodIdFromClient
    });

    // IMPORTANT: check null before using .avatar
    if (!alreadyTeam) {
      return res.status(404).json({
        status: "warning",
        message: "Team member not found"
      });
    }

    if (alreadyTeam.avatar) {
      await fs.unlink(
        path.join(process.cwd(), "uploads", alreadyTeam.avatar)
      );
    }

    await Team.deleteOne({
      _id: alreadyTeam._id
    });

    return res.status(200).json({
      status: "success",
      message: "Deleted successfully!"
    });

  } catch (err) {
    return res.status(500).json({
      status: "warning",
      message: err.message
    });
  }
};
