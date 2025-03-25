import React from 'react'
import Post from './Post'

function Posts() {
  return (
    <div className="w-full max-w-md mx-auto pointer-events-none">
      <Post url={"https://res.cloudinary.com/detkeq2tn/image/upload/v1742058878/wfcm5hgi7b1oigcm4tlx.jpg"} caption={"hello"} like={203} />
      <hr className="border-t border-gray-500 my-4" />
      <Post url={"https://res.cloudinary.com/detkeq2tn/image/upload/v1742058901/iz5xxbckfkfs5gc4lng6.jpg"} caption={"how are you?"}  like={100}/>
      <hr className="border-t border-gray-500 my-4" />
      <Post url={"https://res.cloudinary.com/detkeq2tn/image/upload/v1742058901/iz5xxbckfkfs5gc4lng6.jpg"} caption={"how are you?"}  like={100}/>
    </div>
  )
}

export default Posts;
