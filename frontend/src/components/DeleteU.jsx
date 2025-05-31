import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "./Profilecard";
import axios from "axios";
import { useSelector } from "react-redux";
import { Trash2 } from "lucide-react";

function DeleteU() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isFetched, setIsFetched] = useState(false); 

  const adminUser = useSelector((state) => state.auth.user);

  const API_URI=import.meta.env.VITE_API_URL

  if(!adminUser){
    return navigate("/login");
  }


  const handleDelete = async (user_id) => {
    try {
      await axios.delete(`${API_URI}/api/v1/user/deleteuser/${user_id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
  
      console.log("User deleted successfully");
  
      setUsers((prevUsers) => prevUsers.filter(user => user._id !== user_id));
  
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };
  
  const handleUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URI}/api/v1/user/getalluser`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        setUsers(res.data.data);
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
          disabled={isFetched} // Disable button if users are fetched
          className={`px-3 py-2 rounded-md shadow-md transition ${
            isFetched ? "bg-gray-500 cursor-not-allowed" : "bg-purple-500 "
          }`}
        >
          {isFetched ? "Users Fetched" : "Fetch Users"}
        </button>
      </div>
  
      {/* Header Title */}
      <div className="sticky top-0 bg-gray-900 text-gray-200 text-center p-2 rounded-md shadow-md z-20">
        All NDP Family
      </div>
  
      {/* Scrollable Profile List */}
      <div className="max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 ">
        {users.length > 0 ? (
          users.map((user) => (
            <React.Fragment key={user._id}>
              <div className="flex justify-between items-center">
                <ProfileCard
                  image_url={user.image}
                  name={user.username}
                  jobprofile={user.jobprofile}
                  about={user.about}
                  i_id={user.instaUrl}
                  f_id={user.facebookUrl}
                />
                <button onClick={()=>handleDelete(user._id)} className="text-white-500 hover:text-red-700">
                  <Trash2 size={20} />
                </button>
              </div>
              <hr className="border-t border-gray-600 my-4" />
            </React.Fragment>
          ))
        ) : (
          <p className="text-center text-gray-300">No users found</p>
        )}
      </div>
    </div>
  </div>
  
  );
}

export default DeleteU;
