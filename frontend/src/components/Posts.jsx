import React, { useState, useEffect } from "react";
import Post from "./Post";
import axios from "axios";
import { Loader } from "lucide-react";

function Posts() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch posts when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/user/getallpost", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

      if (res.data.success) {
        setPosts(res.data.data);
      }
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      {loading ? (
        <div className="flex justify-center items-center h-[75vh]">
          <Loader size={50} className="animate-spin text-gray-300" />
        </div>
      ) : posts && posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index} className="mt-2">
            <Post url={post.image} caption={post.caption}  id={post._id} />
            <hr className="border-t border-gray-500 my-4" />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400 mt-4">No posts</p>
      )}
    </div>
  );
}

export default Posts;
