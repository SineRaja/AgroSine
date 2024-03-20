import mongoose from "mongoose";
import User from "../modelsMembers/User.js";
import bcrypt from 'bcryptjs';
import { createOwnError } from "../../errorCreatetor.js";
import jwt from "jsonwebtoken";

export const createAccount = async (req, res, next) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.memberPassword, salt);
        const newAccount = new User({...req.body, memberPassword:hash})

        await newAccount.save();
        res.status(200).send("successfully, Account created!!!!!")
    }
    catch(err){
        next(err)
    }
}

export const loginAccount = async (req, res, next) => {
    try {
        const loginMember = await User.findOne({memberName:req.body.memberName})
        if(!loginMember) return next(createOwnError(404,"The Member has not found!"))

        const isMatched = await bcrypt.compare(req.body.memberPassword, loginMember.memberPassword)

        if(!isMatched) return next(createOwnError(400, "Sorry, You Entered Wrong Password! can you please re enter your password again."))

        const token = jwt.sign({id:loginMember._id}, process.env.JWT)
        const {memberPassword, ...remainingData} = loginMember._doc 

        res.cookie("access_token", token, {
            httpOnly:true
        }).status(200)
        .json(remainingData)
    }
    catch(error){
        next(error)
    }
} 