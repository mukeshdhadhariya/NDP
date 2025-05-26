import { Admin } from "../models/admin.js"
import {ApiResponce} from "../utils/ApiResponce.js"
import { ApiError } from "../utils/ApiError.js";
import { Post } from "../models/post.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import cloudinary from "cloudinary"
import { User } from "../models/user.js";
import nodemailer from 'nodemailer'



const AdminRegister = async (req, res) => {
    try {
      const { AdminName, password } = req.body;
 
      let AdminCount = await Admin.countDocuments();
 
      if (AdminCount > 0) {
        return res.status(401).json(
            new ApiResponce(401,{}, "you are not admin")
        )
      }
 
      const user = await Admin.create({
          AdminName,
          password
      });

      const CreatedAdmin = await Admin.findById(user._id).select("-password");
 
      return res.status(200).json(
          new ApiResponce(200, CreatedAdmin, "Admin created successfully")
      );
 
    } catch (error) {
       console.log("Error when admin created:", error);
       return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
 };
 

const LoginUser=async (req,res)=>{
try {
        const {AdminName,password}=req.body
    
        if(!AdminName){
            throw new ApiError(400,"Admin login Wrong")
        }
    
        let user=await Admin.findOne({AdminName})
    
        if(!user){
            throw new ApiError(401,"Admin not exist")
        }
    
        const isPasswordCorrect=await user.isPasswordCorrect(password)
    
        if(!isPasswordCorrect){
            throw new ApiError(401,"admin wrong password")
        }
    
        const token=await user.GenrateToken();
    
        user={
            _id: user._id,
            AdminName:user.AdminName
        }
    
    
        const options={
            httpOnly:true,
            secure:true,
            sameSite:'strict',
            maxAge:1*24*60*60*1000
        }
    
        return res
        .status(200)
        .cookie("token",token,options)
        .json({
            message: `Welcome back ${user.AdminName}`,
            success: true,
            user
        });

} catch (error) {
        return res
        .status(400)
        .json({
            message: `You are not admin`,
            success: false,
        });
}
    

}

const logout=async(req,res)=>{
    try {
        const options={
            httpOnly:true,
            secure:true,
            sameSite:'strict',
            maxAge:0
        }
        return res
        .status(200)
        .clearCookie("token",options)
        .json(
            new ApiResponce(200,{},"logout successfully")
        )
    } catch (error) {
        throw new ApiError(401,"logout error")
    }
}

const CreatePost=async(req,res)=>{
    const {caption}=req.body;

    if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
    }

    const filepath=req.file.path;

    if(!filepath?.trim()){
        throw new ApiError(401,"image is required")
    }

    const ImageUrl=await uploadOnCloudinary(filepath)

    let newpost=await Post.create({
        caption,
        image:ImageUrl.url
    })

    return res.status(200).json(
        new ApiResponce(200,newpost,"post created")
    )

}

const PostLike=async(req,res)=>{
    try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const post = await Post.findById(req.params.postId);

    if (!post) return res.status(404).send("Post not found");

    const index = post.likedIPs.indexOf(ip);

    if (index === -1) {
      post.likes += 1;
      post.likedIPs.push(ip);
    } else {
      post.likes = Math.max(0, post.likes - 1);
      post.likedIPs.splice(index, 1);
    }

    await post.save();
    
    res.status(200).json({ likes: post.likes, liked: index === -1 });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const DeletePost=async(req,res,next)=>{
    try { 
        const {post_id}=req.params
    
        if(!post_id){
            throw new ApiError(401,"id not find")
        }
    
        const post=await Post.findById(post_id)
    
        if(!post){
            throw new ApiError(401,"post empty")
        }
    
        if (post.image) {
            try {
                const publicId = post.image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(publicId);
            } catch (error) {
                return res.status(500).json({ message: "Failed to delete image from Cloudinary", error: error.message });
            }
        }
    
        await Post.findByIdAndDelete(post_id);

        return res.status(200).json({ message: "Post deleted successfully" });

    } catch (error) {
        next(error)
    }
}

const getallpost=async(req,res)=>{
   try {

    const posts=await Post.find()

    if(!posts){
        throw new ApiError(401,"null posts")
    }

    return res.status(200).json(
        new ApiResponce(200,posts,"fetch all posts")
    )

   } catch (error) {
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
   }
}

const createUser=async(req,res)=>{
    try {
        const {username,instaUrl,about,facebookUrl,jobprofile}=req.body;
        

        const user1=await User.findOne({username});
        

        if(user1){
            throw new ApiError(500,"user allready exist")
        }
        
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }
    
        const filepath=req.file.path;
    
        if(!filepath?.trim()){
            throw new ApiError(401,"image is required")
        }
    
        const  imgurl=await uploadOnCloudinary(filepath)
    
        const user=await User.create({
            username,
            about,
            instaUrl,
            facebookUrl,
            jobprofile,
            image:imgurl.url
        })

        return res.status(200).json(
            new ApiResponce(200,user,"user created successfully")
        )


    } catch (error) {
        return res.status(500).json(new ApiError(500,error,"user can not create"))
    }


}

const getalluser=async(req,res)=>{
    try {
        const users=await User.find()
        if(!users || users.length === 0){
            return res.status(500).json(
                new ApiError(500,error,"user does not fetch")
            )
        }

        return res.status(200).json(
            new ApiResponce(200,users,"users fetch successfullly")
        )

    } catch (error) {
        return res.status(500).json(
            new ApiError(500,error,"user can not fetch")
        )
    }
}

const deleteuser=async(req,res)=>{
    const {user_id}=req.params
    const user=await User.findById(user_id)
    if(!user){
        throw new Error("user does not exist");
    }

    await User.findByIdAndDelete(user_id)

    return res.status(200).json(
        new ApiResponce(200,{}," user deleted successfully")
    )
}

const SendMail = async (req, res) => {
    const { senderName, message } = req.body;

    if (!senderName || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587, 
        secure: false,
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.EMAIL_PASSWORD 
        },
    });

    let mailOptions = {
        from: `"${senderName}" <eva.abbott@ethereal.email>`, 
        to: process.env.EMAIL, 
        subject: `New Message from ${senderName}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                <h2 style="color: #4CAF50; text-align: center;">📩 New Message Received</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px; font-weight: bold; color: #333;">👤 Sender:</td>
                        <td style="padding: 10px; color: #555;">${senderName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; font-weight: bold; color: #333;">✉️ Email:</td>
                        <td style="padding: 10px; color: #555;">eva.abbott@ethereal.email</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; font-weight: bold; color: #333;">💬 Message:</td>
                        <td style="padding: 10px; color: #555;">${message}</td>
                    </tr>
                </table>
                <div style="text-align: center; margin-top: 20px;">
                    <p style="color: #777; font-size: 12px;">This is an automated message. Please do not reply.</p>
                </div>
            </div>
        `,
    };
    

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: "Email sent successfully!" });
    } catch (error) {
        console.error("Email send error:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
};


export {
    AdminRegister,
    LoginUser,
    logout,
    CreatePost,
    DeletePost,
    getallpost,
    createUser,
    getalluser,
    deleteuser,
    SendMail,
    PostLike
}