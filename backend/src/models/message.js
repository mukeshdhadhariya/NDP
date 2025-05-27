import mongoose, { Schema } from "mongoose";

const MessageSchema=new mongoose.Schema({
    msg:{
        type:String,
        required:true
    },
    expireAt: {
        type: Date,
        default: () => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        expires: 0
    }
},{
    timestamps:true
})

export const Message=mongoose.model('Message', MessageSchema)