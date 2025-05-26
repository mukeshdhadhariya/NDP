import React, { useState } from 'react';
import { Bookmark, MessageCircle, Send } from 'lucide-react';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from 'axios';
import { useEffect } from 'react';

function Post({ url, caption,id}) {
  const [liked, setLiked] = useState(false);
  const [likesCount,setLikesCount]=useState(0)

  useEffect(() => {
  const fetchLikeStatus = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/like/${id}`);
      setLiked(res.data.liked);
      setLikesCount(res.data.likes)
    } catch (err) {
      console.log("Error fetching like status");
    }
  };
  fetchLikeStatus();
  }, [id]);

  const toggleLike = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/like/${id}`);
      setLikesCount(res.data.likes);
      setLiked(res.data.liked);
    } catch (error) {
      console.log(error.response?.data?.message || "Error toggling like");
    }
  };


  const sharepost=async()=>{

  }

  return (
  <div className="flex flex-col bg-white/10 rounded-md opacity-85 justify-between min-h-[36vh] w-full mx-auto max-w-xs sm:max-w-sm px-3 py-3 mb-4">
    <img 
      className="rounded-sm mb-2 w-full max-h-[60vh] object-cover" 
      src={url} 
      alt="post_img" 
    />
    
    <div className="flex items-center justify-between my-1">
      <div className="flex items-center gap-3 ml-1">
        {liked ? (
          <FaHeart size={20} className="cursor-pointer text-red-500" onClick={toggleLike} />
        ) : (
          <FaRegHeart size={20} className="cursor-pointer text-white" onClick={toggleLike} />
        )}
        <MessageCircle size={20} className="cursor-pointer text-gray-400" />
        <Send size={20} className="cursor-pointer text-gray-400" onClick={sharepost} />
      </div>
      <Bookmark size={20} className="cursor-pointer text-gray-400" />
    </div>

    <span className="font-medium block mb-1 text-gray-300 text-sm">{likesCount} likes</span>
    <p className="text-xs sm:text-sm text-gray-300">
      <span className="font-medium mr-1 text-white">About Post</span>
      {caption}
    </p>
  </div>
  );
}

export default Post;
