import jwt from "jsonwebtoken"
import {ApiError} from "../utils/ApiError.js"
import { Admin } from "../models/admin.js"

export const jwtVerfy=async (req,res,next)=>{
    try {
        console.log("1")
        const Token=req.cookies?.token || req.header("Authorization")?.replace("Bearer ","")
        console.log("2")
        if(!Token){
            throw new ApiError(401,"Unauthorized request")
        }
        
        console.log("3")
        const decodedToken=jwt.verify(Token,process.env.TOKEN_SECRATE)
        console.log("4")
    
        const user=await Admin.findById(decodedToken?._id).select(
            "-password"
        )
        console.log("5")
    
        if(!user){
            throw new ApiError(401,"invalid access token")
        }
        console.log("6")
        req.user=user
        console.log("7")
        next()
    } catch (error) {
        throw new ApiError(401,"invalid accessToken")
    }


}

