// src/PatientDashboard.js

import React, { useEffect, useState } from 'react';
import useStore from './store';
import RequestNav from '../Navbar/RequestsNavbar';
import Requests from '../components/Requsts';

function MyRequest() {
  const { setPatientDetails, patientDetails } = useStore();
  const [requests, setRequests] = useState([]); // State for requests

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
          fetchRequests(token); // Fetch requests after getting patient details
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    const fetchRequests = async (token) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/patient/requests-with-status`, {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setRequests(data); // Set requests state
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchPatientDetails();
  }, [setPatientDetails]);

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <RequestNav patientDetails={patientDetails} />
      <div className="mt-16 p-4">
        <h2 className="text-xl text-black">Hey {patientDetails?.name}, Below are your requests</h2>
        <Requests requests={requests} />
      </div>
    </div>
  );
}

export default MyRequest;
