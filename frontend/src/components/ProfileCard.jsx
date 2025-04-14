import { FaInstagram, FaFacebook } from "react-icons/fa";

const ProfileCard = ({image_url,name,jobprofile,about,i_id,f_id}) => {
  return (

    <div className="  max-w-sm mx-auto bg-white/15 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden p-8 text-center  transition-transform transform md:w-96 w-11/12 mx-auto my-3">
      <img
        className="w-80 h-80 mx-auto rounded-xl  object-cover shadow-lg  transition duration-300"
        src={image_url}
        alt="Profile"
      />
      <h2 className="text-2xl font-extrabold mt-4 text-gray-300 drop-shadow-lg">{name}</h2>
      <p className="text-gray-300 text-lg font-medium">{jobprofile}</p>
      <p className="text-gray-300 text-sm mt-1 px-5 leading-relaxed"> {about}.</p>
      <div className="flex justify-center gap-6 mt-4">
        <a href={i_id} target="_blank" rel="noopener noreferrer" className="transform  transition duration-300">
          <FaInstagram className="text-pink-500 text-4xl " />
        </a>
        <a href={f_id} target="_blank" rel="noopener noreferrer" className="transform  transition duration-300">
          <FaFacebook className="text-blue-500 text-4xl " />
        </a>
      </div>
    </div>

  );
};

export default ProfileCard;
