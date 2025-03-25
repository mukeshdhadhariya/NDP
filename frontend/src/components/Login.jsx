import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/authSlice.js";


const AdminLogin = () => {
  const [AdminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch=useDispatch()

  const [showPassword, setShowPassword] = useState(false);

  const navigate=useNavigate()


  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        { AdminName, password }, 
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if(res.data.success){
        dispatch(setAuthUser(res.data.user))
        navigate("/admin")
        setAdminName("")
        setPassword("")
      }

    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };






  return (
    <div className="flex justify-center items-center py-30">
      <div className="bg-white/10 p-6 rounded-lg shadow-lg w-80 sm:w-96">
        <h2 className="text-white text-center text-2xl mb-4">Admin Login</h2>

        <form onSubmit={loginHandler}>
          <input
            type="text"
            placeholder="AdminName"
            value={AdminName}
            onChange={(e) => setAdminName(e.target.value)}
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-0"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 pr-10 mb-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-0"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 flex items-center text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <button
           
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:ring-0"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
