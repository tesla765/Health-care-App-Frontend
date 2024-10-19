// src/PatientDashboard.js

import React, { useEffect, useState } from 'react';
import useStore from './store';
import PatientNavbar from '../Navbar/PatientNavbar';

function PatientDashboard() {
  const { setPatientDetails, patientDetails } = useStore();
  const [problemDescription, setProblemDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchPatientDetails = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/patient/dashboard`, {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setPatientDetails(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, [setPatientDetails]);

  const handleRequestSubmission = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/patient/request-for-treatment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ problemDescription }),
      });

      if (response.ok) {
        setSuccessMessage('Treatment request created successfully');
        setProblemDescription(''); // Clear the input after submission
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Failed to create treatment request');
      }
    } catch (error) {
      console.error('Error submitting treatment request:', error);
      setErrorMessage('An error occurred while submitting the request');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <PatientNavbar patientDetails={patientDetails} />
      <h2 className="text-xl mt-16">Welcome {patientDetails?.name}, to Your Dashboard</h2>
      
      {/* Treatment Request Form */}
      <form className="mt-4 w-full max-w-sm" onSubmit={handleRequestSubmission}>
        <textarea
          className="border border-gray-300 rounded p-2 w-full"
          placeholder="Describe your problem"
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <button className="mt-2 bg-black text-white px-4 py-2 rounded">Submit Request</button>
      </form>
    </div>
  );
}

export default PatientDashboard;
