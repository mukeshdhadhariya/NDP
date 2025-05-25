import React, { useState } from "react";
import { Upload, User, Briefcase, Instagram, Facebook,Award } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function CreateU() {

  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    instaUrl: "",
    about: "",
    facebookUrl: "",
    jobprofile: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };


  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("instaUrl", formData.instaUrl);
    formDataToSend.append("about", formData.about);
    formDataToSend.append("facebookUrl", formData.facebookUrl);
    formDataToSend.append("jobprofile", formData.jobprofile);
    formDataToSend.append("image", formData.file); 

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/createuser",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if(res.data.success){
        toast.success(res.data.message)
        navigate("/admin/deleteuser")
        setFormData({
          username: "",
          instaUrl: "",
          about: "",
          facebookUrl: "",
          jobprofile: "",
          file: null,
        })
      }

    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="relative w-full h-[82vh] flex items-center justify-center text-white p-4">

      <div
        className="absolute w-full h-[82vh] sm:h-[93vh] inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('https://www.eteknix.com/wp-content/uploads/2022/02/1-105.jpg')" }}
      ></div>

      <div className="relative w-full max-w-sm bg-white/2 backdrop p-6 rounded-2xl shadow-lg border border-white/20">
        <h2 className="text-center text-white text-2xl font-bold mb-4">Create User</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
        
          <div className="flex items-center bg-white/10 p-2 rounded-lg">
            <User className="text-orange-400 mr-2" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="bg-transparent outline-none text-white w-full placeholder-gray-400"
            />
          </div>

          <div className="flex items-center bg-white/10 p-2 rounded-lg">
            <Instagram className="text-pink-400 mr-2" />
            <input
              type="url"
              name="instaUrl"
              placeholder="Instagram URL"
              value={formData.instaUrl}
              onChange={handleChange}
              className="bg-transparent outline-none text-white w-full placeholder-gray-400"
            />
          </div>

          <div className="flex items-center bg-white/10 p-2 rounded-lg">
          <Award className="text-yellow-400 mr-2" />
          <input
            name="about"
            placeholder="About"
            value={formData.about}
            onChange={handleChange}
            required
            className="w-full   rounded-lg outline-none text-white placeholder-gray-400"
          ></input>
          </div>

          <div className="flex items-center bg-white/10 p-2 rounded-lg">
            <Facebook className="text-blue-500 mr-2" />
            <input
              type="url"
              name="facebookUrl"
              placeholder="Facebook URL"
              value={formData.facebookUrl}
              onChange={handleChange}
              className="bg-transparent outline-none text-white w-full placeholder-gray-400"
            />
          </div>

          <div className="flex items-center bg-white/10 p-2 rounded-lg">
            <Briefcase className="text-green-400 mr-2" />
            <input
              type="text"
              name="jobprofile"
              placeholder="Job Profile"
              value={formData.jobprofile}
              onChange={handleChange}
              required
              className="bg-transparent outline-none text-white w-full placeholder-gray-400"
            />
          </div>

          <div className="flex items-center bg-white/10 p-2 rounded-lg">
            <Upload className="text-blue-300 mr-2" />
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="bg-transparent outline-none text-white w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg font-bold transition-all"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateU;
