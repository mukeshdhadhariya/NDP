import mongoose, { Schema } from "mongoose";

const PostSchema=new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    caption:{
        type:String, 
        default:''
    },
    likes: { 
        type: Number, 
        default: 0 
    },
    likedIPs: [String]
},
{
    timestamps:true
})

export const Post=mongoose.model('Post',PostSchema)