import { Bell,Contact } from "lucide-react";
import { Link } from "react-router-dom";
import {StoryIcon} from '../components/StoryIcon.jsx'

const UpperNavBar = () => {
  return (
    <nav className=" z-10 fixed top-0 left-0 w-full bg-neutral-800 shadow-md  flex items-center justify-between px-4 py-3">
      <div className="flex items-center h-8">
        <StoryIcon/>
      </div>

      <h1 className="text-xl font-bold text-black tracking-widest">
        <span className="text-red-500">N</span>
        <span className="text-blue-500">D</span>
        <span className="text-green-500">P</span>
      </h1>
      

      
      <div className="flex space-x-4">
        <Link to='/admin' className="text-gray-400 hover:text-black">
          <Bell size={24} />
        </Link>
        <Link to='/contact' className="text-gray-400 hover:text-black">
          <Contact size={24} />
        </Link>
      </div>
    </nav>
  );
};

export default UpperNavBar;
