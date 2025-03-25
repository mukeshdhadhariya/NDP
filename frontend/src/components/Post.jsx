import React from 'react';
import { Bookmark, MessageCircle, Send } from 'lucide-react';
import { FaHeart ,FaRegHeart } from "react-icons/fa";

function Post({ url, caption,like }) {
  return (
    <div className="flex flex-col  bg-white/10 rounded-md opacity-85 justify-between  min-h-[80vh] w-full mx-auto max-w-sm sm:max-w-md px-8 py-5 mb-6">
      
      <img
        className="rounded-sm my-2 w-full  h-[60vh] object-cover flex-grow"
        src={url}
        alt="post_img"
      />

      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-4 ml-2">
          <FaRegHeart size="24px" className="cursor-pointer text-red-600 " />
          <MessageCircle className="cursor-pointer text-gray-400" />
          <Send className="cursor-pointer text-gray-400" />
        </div>
        <Bookmark className="cursor-pointer text-gray-400" />
      </div>

      <span className="font-medium block mb-2 text-gray-300">{like} likes</span>
      <p className="text-sm sm:text-base text-gray-300">
        <span className="font-medium mr-2 text-white">Mukesh Dhadhariya</span>
        {caption}
      </p>
      
    </div>
  );
}

export default Post;
