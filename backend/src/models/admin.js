import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const AdminSchema=new mongoose.Schema({
    AdminName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})

AdminSchema.pre("save",async function(next){
    this.password=await bcrypt.hash(this.password,10)
    next()
})

AdminSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

AdminSchema.methods.GenrateToken=function(){
    try {
        return jwt.sign(
            {
                _id:this._id,
                AdminName:this.AdminName,
            },
                process.env.TOKEN_SECRATE,
            {
                expiresIn:'1d'
            }
        );
    } catch (error) {
        throw new Error("Failed to generate token");
    }
}
export const Admin=mongoose.model('Admin',AdminSchema)