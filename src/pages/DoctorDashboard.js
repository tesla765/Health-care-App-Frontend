// src/DoctorDashboard.js

import React, { useEffect, useState } from 'react';
import DoctorNavbar from '../Navbar/DoctorNavbar';
import PatientCard from '../components/PatientCard';

function DoctorDashboard() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/doctor/getAllPatients`, {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPatients(data); // Assuming the response is an array of patients
        } else {
          console.error('Failed to fetch patients');
        }
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <DoctorNavbar />
      <div className="mt-16 p-4">
        <h2 className="text-xl text-black">Hello, Below are all your patients</h2>
        <div className="border border-gray-300 rounded-md max-h-[700px] overflow-y-auto p-4 mt-4">
          <div className="flex flex-col space-y-4">
            {patients.length > 0 ? (
              patients.map((patient) => (
                <PatientCard key={patient._id} patient={patient} />
              ))
            ) : (
              <p>No patients found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
