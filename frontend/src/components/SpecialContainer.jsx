import React from 'react'

const imgurl="https://res.cloudinary.com/detkeq2tn/image/upload/v1742058878/wfcm5hgi7b1oigcm4tlx.jpg"

const SpecialContainer = () => {

  return (
    <div className="relative w-screen h-[60vh] mt-10 flex flex-col items-center justify-center">
      <img
        src={imgurl}
        alt="Centered Image"
        className="max-w-full max-h-full object-contain pointer-events-none"
      />
      <p className="text-2xl  text-red-500 font-bold  bg-white bg-opacity-50 px-4 py-2 rounded-lg mt-2" >
        happy birth day pradeep
      </p>
    </div>
  );
};

export { SpecialContainer,imgurl };
