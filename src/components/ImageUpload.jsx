// src/components/ImageUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const api=import.meta.env.VITE_API_URL
const port=import.meta.env.VITE_PORT

const ImageUpload = ({ onClassify }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedImage) return;
  
    setLoading(true);
  
    const formData = new FormData();
    formData.append('file', selectedImage);  // Changed 'image' to 'file'
    try {
      // Replace with your API endpoint
      const response = await axios.post(`${api}:${port}/predict`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
     
      onClassify(response.data.prediction); // Adjusted to match the Flask response structure
    } catch (error) {
      console.error('Error uploading the image:', error);
      onClassify('Error');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg mb-2">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Upload Image:
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-blue-500"
      />
      <button
        className={`mt-4 px-6 py-2 text-white rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? 'Classifying...' : 'Upload and Classify'}
      </button>
      {selectedImage && (
        <div className="mt-4">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            className="w-64 h-64 object-cover rounded-lg border border-gray-300"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
