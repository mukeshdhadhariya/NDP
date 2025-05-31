import { Bell,Contact } from "lucide-react";
import { Link } from "react-router-dom";
import {Storyicon} from './Storyicon.jsx'

const Uppernavbar = () => {
  return (
  <nav className="z-50 fixed top-0 left-0 w-full bg-gradient-to-r from-gray-900 to-gray-800 backdrop-blur-lg border-b border-white/20 shadow-xl shadow-blue-500/10 flex items-center justify-between px-4 py-2 h-14">
      {/* Left Section - Logo */}
      <div className="flex items-center space-x-2">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 active:scale-95">
              <Storyicon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tighter bg-gradient-to-r from-red-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
            NDP
          </h1>
      </div>

      <div className="hidden sm:block flex-1 text-center mx-2">
          <span className="text-sm font-medium bg-gradient-to-r from-red-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
              NDP Social Network
          </span>
      </div>

      <div className="flex items-center space-x-4">
          <Link 
              to='/message' 
              className="relative p-2 rounded-full hover:bg-white/10 transition-all duration-300 group"
              aria-label="Notifications"
          >
              <Bell 
                  size={22} 
                  className="text-gray-300 group-hover:text-blue-400 transition-colors duration-300" 
              />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  3
              </span>
          </Link>
          
          <Link 
              to='/contact' 
              className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 group"
              aria-label="Contacts"
          >
              <Contact 
                  size={22} 
                  className="text-gray-300 group-hover:text-green-400 transition-colors duration-300" 
              />
          </Link>
      </div>
  </nav>
  );
};

export default Uppernavbar;
