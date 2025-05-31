import { Home, Users, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const Lowernavbar = () => {
  return (
  <nav className="fixed bottom-0 left-0 w-full bg-black/50 backdrop-blur-3xl border-t border-white/10 shadow-2xl shadow-blue-500/10 flex justify-around items-center py-3 h-16
    before:absolute before:inset-0 before:bg-gradient-to-t before:from-blue-500/10 before:via-blue-500/5 before:to-transparent before:pointer-events-none">
    
    {['Home', 'Family', 'Profile'].map((item, index) => (
      <NavLink 
        key={item}
        to={index === 0 ? '/' : index === 1 ? '/profiles' : '/login'}
        className={({ isActive }) => 
          `flex flex-col items-center text-gray-300 hover:text-green-500 transition-all  group relative z-10
          ${isActive ? 'text-white' : ''}`
        }
        aria-label={item}
      >
        <div className="p-1 rounded-full group-hover:bg-white/10 transition-all duration-300 relative
          before:absolute before:inset-0 before:rounded-full before:bg-blue-400/10 before:opacity-0 
          before:group-hover:opacity-100 before:transition-opacity before:duration-300">
          {index === 0 ? <Home size={24} /> : 
          index === 1 ? <Users size={24} /> : 
          <User size={24} />}
        </div>
        
        <span className="text-xs font-medium mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
          {item}
        </span>
        
        <span className="absolute -top-1.5 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-[.active]:opacity-100
          shadow-[0_0_12px_3px_rgba(59,130,246,0.3)] transition-opacity duration-300" />
      </NavLink>
    ))}
  </nav>
  );
};

export default Lowernavbar;