// src/App.js
import './index.css';  // Ensure this imports the Tailwind styles
import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';

function App() {
  const [classificationResult, setClassificationResult] = useState('');

  const handleClassification = (result) => {
    setClassificationResult(result);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div class="lines">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
      <h1 className="text-3xl font-bold mb-6 bg-green-200 text-green-800 rounded mt-4 p-4">Image Classifier</h1>
      <ImageUpload onClassify={handleClassification} />
      {classificationResult && (
        <div className="mt-4 mb-4 p-4 bg-green-200 text-green-800 rounded">
          <h2>Classification Result: {classificationResult}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
