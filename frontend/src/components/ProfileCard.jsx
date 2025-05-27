import { FaInstagram, FaFacebook } from "react-icons/fa";

const ProfileCard = ({image_url,name,jobprofile,about,i_id,f_id}) => {
  return (

  <div className="max-w-sm mx-auto bg-gradient-to-br from-white/10 to-indigo-500/10 backdrop-blur-lg shadow-2xl shadow-indigo-500/20 rounded-3xl overflow-hidden p-4 text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl hover:shadow-indigo-500/30 md:w-96 w-11/12 my-3 border border-white/20 group">
    <div className="relative overflow-hidden rounded-2xl aspect-square">
        <img
            className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 ease-out"
            src={image_url}
            alt="Profile"
            loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    </div>

    <h2 className="text-3xl font-bold mt-2 bg-gradient-to-r from-cyan-400 to-purple-300 bg-clip-text text-transparent drop-shadow-md">
        {name}
    </h2>
    
    <div className="my-1">
        <span className="inline-block bg-indigo-500/20 text-indigo-200 text-sm font-semibold px-4 py-1 rounded-full">
            {jobprofile}
        </span>
    </div>

    <p className="text-gray-300 text-sm px-4 leading-relaxed min-h-[20px] line-clamp-4 hover:line-clamp-none transition-all">
        {about}
    </p>

    <div className="flex justify-center gap-6  mb-2">
        <a 
            href={i_id} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="transition-all duration-300 hover:-translate-y-1.5 hover:drop-shadow-xl"
            aria-label="Instagram profile"
        >
            <FaInstagram className="text-pink-400/90 text-3xl hover:text-pink-300" />
        </a>
        <a 
            href={f_id} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="transition-all duration-300 hover:-translate-y-1.5 hover:drop-shadow-xl"
            aria-label="Facebook profile"
        >
            <FaFacebook className="text-blue-400/90 text-3xl hover:text-blue-300" />
        </a>
    </div>
</div>
  );
};

export default ProfileCard;
