// src/DoctorNavbar.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function DoctorNavbar2() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); 

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); 
  };
  const doctorDetails = {
    name: 'Sharma Dr.',
    degree: 'MBBS',
    yearsOfPractice: 20,
  };

  return (
    <nav className="fixed top-0 left-0 w-full px-4 py-2 bg-white shadow-md z-10 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-black">HealthApp</h1>
      <div className="flex flex-grow justify-center">
        <Link
          to="/doctordashboard"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200"
        >
          Go to Dashboard
        </Link>
      </div>
      <div className="relative">
        <div
          className="w-12 h-12 bg-pink-500 text-white flex items-center justify-center rounded-full cursor-pointer"
          onClick={toggleDropdown}
        >
          {doctorDetails.name.charAt(0)} {/* Display first initial */}
        </div>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
            <div className="p-2">
              <p className="font-bold">{doctorDetails.name}</p>
              <p>{doctorDetails.degree}</p>
              <p>{doctorDetails.yearsOfPractice} years of practice</p>
              <button 
                onClick={handleLogout} 
                className="mt-2 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default DoctorNavbar2;
