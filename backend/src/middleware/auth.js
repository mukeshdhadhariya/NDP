import jwt from "jsonwebtoken"
import {ApiError} from "../utils/ApiError.js"
import { Admin } from "../models/admin.js"

export const jwtVerfy=async (req,res,next)=>{
    try {
        const token=req.cookies?.token || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }

        const decodedToken=jwt.verify(token,process.env.TOKEN_SECRATE)
    
        const user=await Admin.findById(decodedToken?._id).select(
            "-password"
        )
    
        if(!user){
            throw new ApiError(401,"invalid access token")
        }

        req.user=user
        next()
    } catch (error) {
        throw new ApiError(401,"invalid accessToken")
    }


}

