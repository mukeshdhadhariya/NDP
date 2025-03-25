import mongoose, { Schema } from "mongoose";

const PostSchema=new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    caption:{
        type:String, 
        default:''
    }
},
{
    timestamps:true
})

export const Post=mongoose.model('Post',PostSchema)