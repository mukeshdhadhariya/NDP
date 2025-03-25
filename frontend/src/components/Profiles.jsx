import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard.jsx";
import { Trash2, Loader } from "lucide-react";
import axios from "axios";

function Profiles() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/getalluser", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        setTimeout(() => {
          setUsers(res.data.data);
          setLoading(false);
        }, 300);
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="sticky top-13 z-10 text-gray-200 flex justify-center"> All NDP Family</div>

      {loading ? (
        <div className="flex justify-center items-center h-[75vh]">
          <Loader size={50} className="animate-spin text-gray-300" />
        </div>
      ) : (
        <div>
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
                </div>
                <hr className="border-t border-gray-600 my-4" />
              </React.Fragment>
            ))
          ) : (
            <p className="text-center text-gray-300">No users found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Profiles;
