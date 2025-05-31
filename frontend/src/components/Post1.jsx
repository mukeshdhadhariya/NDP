import React, { useState, useEffect } from 'react';
import { Bookmark, MessageCircle, Send } from 'lucide-react';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function Post({ url, caption, id,createdAt }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

  const API_URI=import.meta.env.VITE_API_URL

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  });

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const res = await axios.get(`${API_URI}/api/v1/user/likecnt/${id}`);
        console.log("data : ",res.data);
        setLiked(res.data.liked);
        setLikesCount(res.data.likes);
      } catch (err) {
        console.log("Error fetching like status");
      }
    };
    fetchLikeStatus();
  }, [id]);

  const toggleLike = async () => {
    try {
      const res = await axios.post(`${API_URI}/api/v1/user/like/${id}`);
      setLikesCount(res.data.likes);
      setLiked(res.data.liked);
    } catch (error) {
      console.log(error.response?.data?.message || "Error toggling like");
    }
  };

  const handleDoubleClick = async () => {
    if (!liked) {
      await toggleLike();
      setShowHeartAnimation(true);
      setTimeout(() => setShowHeartAnimation(false), 800);
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-br from-white/10 to-purple-500/10 backdrop-blur-lg rounded-xl shadow-xl shadow-purple-500/10 justify-between min-h-[36vh] w-full mx-auto max-w-xs sm:max-w-sm px-3 py-3 mb-4 border border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 group">
      <div 
        className="relative overflow-hidden rounded-lg cursor-pointer"
        onDoubleClick={handleDoubleClick}
      >
        <img 
          className="rounded-lg mb-2 w-full h-[55vh] object-cover transition-transform duration-500 group-hover:scale-105"
          src={url} 
          alt="post_img" 
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <AnimatePresence>
          {showHeartAnimation && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1.5, 2.8, 3.5], opacity: [1, 0.5, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <FaHeart className="text-red-500 text-4xl drop-shadow-lg" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="flex items-center justify-between my-3 px-1">
        <div className="flex items-center gap-4">
          <div className="relative">
            {liked ? (
              <FaHeart 
                size={22} 
                className="cursor-pointer text-red-500 transition-all duration-300 hover:scale-125 active:scale-90"
                onClick={toggleLike}
              />
            ) : (
              <FaRegHeart 
                size={22} 
                className="cursor-pointer text-gray-300 transition-all duration-300 hover:scale-125 hover:text-red-400 active:scale-90"
                onClick={toggleLike}
              />
            )}
          </div>
          <MessageCircle 
            size={22} 
            className="cursor-pointer text-gray-300 transition-all duration-300 hover:scale-125 hover:text-blue-400 active:scale-90" 
          />
          <Send 
            size={22} 
            className="cursor-pointer text-gray-300 transition-all duration-300 hover:scale-125 hover:text-green-400 active:scale-90" 
            onClick={''}
          />
        </div>
        <Bookmark 
          size={22} 
          className="cursor-pointer text-gray-300 transition-all duration-300 hover:scale-125 hover:text-purple-400 active:scale-90" 
        />
      </div>

      <div className="px-1 mt-1 space-y-2 relative">
        <p className="text-sm font-medium text-gray-100">
          {likesCount} {likesCount === 1 ? 'like' : 'likes'}
        </p>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          <span className="font-medium bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
            About Post
          </span>{" "}
          {caption}
        </p>
          <p className="text-xs text-gray-400 absolute bottom-0 right-0 px-1 pb-1">
            {formattedDate}
          </p>
      </div>
    </div>
  );
}

export default Post;