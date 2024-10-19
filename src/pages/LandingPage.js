// src/LandingPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-black mb-4">Welcome to HealthCare</h1>
      <p className="text-lg text-gray-700 mb-8">
        Your health is our priority. Connect with doctors and manage your health efficiently.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/patientlogin')}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition duration-200"
        >
          Login as Patient
        </button>
        <button
          onClick={() => navigate('/doctorlogin')}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition duration-200"
        >
          Login as Doctor
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
