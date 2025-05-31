import React from 'react';

const Imgurl = "https://res.cloudinary.com/detkeq2tn/image/upload/v1742058878/wfcm5hgi7b1oigcm4tlx.jpg";

const Specialcontainer = () => {
  return (
    <div className="w-[80vw] sm:w-[70vw] h-[60vh] sm:h-[60vh] mt-10 flex flex-col items-center justify-center">
      <img
        src={Imgurl}
        alt="Centered Image"
        className="w-full max-w-[90%] sm:max-w-[85%] ml-auto object-contain pointer-events-none"
      />
      <p className="text-lg sm:text-2xl text-red-500 font-bold bg-white bg-opacity-70 px-3 sm:px-4 py-1 sm:py-2 rounded-lg mt-2 text-center">
        Today is a special day
      </p>
    </div>
  );
};

export { Specialcontainer, Imgurl };
