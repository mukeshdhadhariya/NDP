import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearAuthUser } from '../redux/authSlice.js';
import { Link } from "react-router-dom";

function CreatePost() {

  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if(!user){
    return <Navigate to="/login" replace/>
  }

  const LogoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", { withCredentials: true });
      if (res.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


  const handleuser = async () => {
    dispatch(clearAuthUser());
    await LogoutHandler();
  };

  return (
    <>
      <div>
        <nav className="sticky top-0 z-50 bg-black text-white p-2 flex justify-between items-center shadow-md">
          <div className="text-lg font-bold text-blue-500">Admin Panel</div>

          <div className="flex space-x-3">
            <Link to="/admin/createpost" className="text-green-500 text-sm">Create Post</Link>
            <Link to="/admin/createuser" className="text-green-500 text-sm">Create User</Link>
            <Link to="/admin/deletepost" className="text-green-500 text-sm">Delete Post</Link>
            <Link to="/admin/deleteuser" className="text-green-500 text-sm">Delete User</Link>
            <button onClick={handleuser} className="bg-red-600 px-3 py-1 rounded">
            Logout
          </button>
          </div>

        </nav>
        <Outlet />
      </div>
      
    </>
  );
}

export default CreatePost;
