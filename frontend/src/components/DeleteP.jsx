import React from 'react'
import { useState} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Trash2 } from "lucide-react";

function DeleteP() {

    const [posts, setPosts] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    const API_URI=import.meta.env.VITE_API_URL

    const adminUser = useSelector((state) => state.auth.user);

    if(!adminUser){
      return navigate("/login");
    }

    const handleDelete = async (post_id) => {
      if (!post_id) {
        console.error("Post ID is undefined or null");
        return;
      }

      try {
        await axios.delete(`${API_URI}/api/v1/user/deletepost/${post_id}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        console.log("Post deleted successfully");
        setPosts((prevPosts) => prevPosts.filter(post => post._id !== post_id));
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
      }
    };

    const handleUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URI}/api/v1/user/getallpost`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        setPosts(res.data.data);
        setIsFetched(true);
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
    };

return (
  <div className="relative w-full h-[92vh] flex flex-col items-center justify-center text-white text-lg font-semibold">
    {/* Background Image */}
    <div
      className="absolute w-full h-full inset-0 bg-cover bg-center opacity-40"
      style={{ backgroundImage: "url('https://www.eteknix.com/wp-content/uploads/2022/02/1-105.jpg')" }}
    ></div>

    <div className="relative z-10 w-full max-w-3xl p-4 mt-0">
      {/* Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={handleUser}
          disabled={isFetched} // Disable button if posts are fetched
          className={`px-3 py-2 rounded-md shadow-md transition ${
            isFetched ? "bg-gray-500 cursor-not-allowed" : "bg-purple-500 "
          }`}
        >
          {isFetched ? "Posts Fetched" : "Fetch Posts"}
        </button>
      </div>

      {/* Header Title */}
      <div className="sticky top-0 bg-gray-900 text-gray-200 text-center p-2 rounded-md shadow-md z-20">
        All Posts
      </div>

      {/* Scrollable Posts List */}
      <div className="max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
        {posts.length > 0 ? (
          posts.map((post) => (
            <React.Fragment key={post._id}>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-20 h-20 rounded-md object-cover shadow-md"
                  />
                  <div>
                    <p className="font-semibold text-white">{post.caption || "No Caption"}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-white hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <hr className="border-t border-gray-600 my-4" />
            </React.Fragment>
          ))
        ) : (
          <p className="text-center text-gray-300">No posts found</p>
        )}
      </div>
    </div>
  </div>
);

}

export default DeleteP