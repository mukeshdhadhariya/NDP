import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { imgurl } from "./SpecialContainer";

const StoryIcon = () => {
  return (
    <Link to="/special" className="relative w-10 h-10 flex items-center justify-center">
      
      <motion.div 
        className="absolute w-full h-full rounded-full border-[3px] border-transparent"
        animate={{ rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }} 
        style={{
          
          background: "conic-gradient(from 20deg, #ff6b6b, #ffcc67, #70e1f5, #a67bee, #2ecc71, #ff6b6b)",
          padding: "2px",
          boxSizing: "border-box",
        }}
      ></motion.div>

      <div className="absolute w-9 h-9 bg-white rounded-full flex items-center justify-center overflow-hidden">
        
        <img 
          src={imgurl}
          alt="Story"
          className="w-full h-full rounded-full"
        />
      </div>
    </Link>
  );
};

export { StoryIcon };
