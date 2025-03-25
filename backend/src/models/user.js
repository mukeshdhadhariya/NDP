import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    instaUrl:{
        type:String
    },
    image:{
        type:String,
        required:true
    },
    facebookUrl:{
        type:String
    },
    jobprofile:{
        type:String
    },
    about:{
        type:String
    }
})

export const User=mongoose.model("User",UserSchema)