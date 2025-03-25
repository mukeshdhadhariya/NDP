import { Home, Search, User, Users } from "lucide-react";
import { Link } from "react-router-dom";

const LowerNavBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-neutral-900 shadow-md border- flex justify-around py-3 px-5 ">
      <Link to="/" className="flex flex-col items-center text-gray-300 hover:text-black">
        <Home size={24} />
        <span className="text-xs">Home</span>
      </Link>
      
      <Link to="/profiles" className="flex flex-col items-center text-gray-300 hover:text-black">
        <Users size={24} />
        <span className="text-xs">Family</span>
      </Link>

      <Link to='/login' className="flex flex-col items-center text-gray-300 hover:text-black">
        <User size={24} />
        <span className="text-xs">Profile</span>
      </Link>
    </nav>
  );
};

export default LowerNavBar;
