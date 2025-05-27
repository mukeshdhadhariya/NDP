import React, { useState } from 'react';
import axios from 'axios';

function CreateP() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('caption', caption);

      const res=await axios.post('http://localhost:8000/api/v1/user/createpost',
        formData,
        {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials:true
      });

      setCaption('');
      setImage(null);
      setPreview('');
      e.target.reset();

      if(res.data.success){
          toast.success('Post Created', {
          style: {
            backgroundColor: '#000',
            color: '#00ff99',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
          },
          duration: 3000,
        });
      }
      
    } catch (error) {
      console.error('Post creation failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full min-h-[90vh] flex items-center justify-center">

      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
        style={{ backgroundImage: "url('https://www.eteknix.com/wp-content/uploads/2022/02/1-105.jpg')" }}
      ></div>

      <form 
        onSubmit={handleCreatePost}
        className="relative z-10 bg-gray-800 p-6 rounded-lg w-full max-w-md mx-4 space-y-6"
      >
        <h2 className="text-2xl font-bold text-white text-center">
          Create New Post
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Upload Image
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center w-full cursor-pointer">
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
                disabled={isSubmitting}
              />
              <div className="w-full h-32 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center hover:border-blue-500 transition-colors">
                {preview ? (
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-400">Click to upload image</span>
                )}
              </div>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Caption
          </label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows="3"
            className="w-full px-4 py-2 bg-gray-700 rounded-lg
              text-gray-200 placeholder-gray-400
              focus:ring-2 focus:ring-blue-500
              border border-gray-600 disabled:opacity-50"
            placeholder="Share your thoughts..."
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700
            text-white font-medium rounded-lg transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}

export default CreateP;