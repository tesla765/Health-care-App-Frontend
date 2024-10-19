import React, { useState } from 'react';
import axios from 'axios';

const ServeRequest = ({ request }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorNotes, setDoctorNotes] = useState('');
  const [treatmentPlan, setTreatmentPlan] = useState('');

  // Determine the status colors
  let statusColor;
  let backgroundColor;

  switch (request.status) {
    case 'pending':
      statusColor = 'text-blue-500';
      backgroundColor = 'bg-blue-100';
      break;
    case 'approved':
      statusColor = 'text-green-500';
      backgroundColor = 'bg-green-100';
      break;
    case 'denied':
      statusColor = 'text-red-500';
      backgroundColor = 'bg-red-100';
      break;
    default:
      statusColor = 'text-gray-500';
      backgroundColor = 'bg-gray-100';
  }

  const handleApprove = async () => {
    await updateRequestStatus('approved');
  };

  const handleDeny = async () => {
    await updateRequestStatus('denied');
  };

  const updateRequestStatus = async (status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.REACT_APP_API_URL}/doctor/updateRequestStatus`,
        {
          requestId: request._id,
          status,
          doctorNotes,
          treatmentPlan,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setIsModalOpen(false);
      setDoctorNotes('');
      setTreatmentPlan('');
      window.location.reload();
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  return (
    <div className={`bg-gray-100 p-4 mb-1 rounded shadow ${backgroundColor}`}>
      <h1 className='text-lg font-bold mb-2'>Problem:</h1>
      <h1 className="text-md font-semibold mb-2">{request.problemDescription}</h1>
      <p className="text-sm text-gray-600">Patient ID: {request.patientId}</p>
      <p className="text-sm text-gray-600">Status: <span className={statusColor}>{request.status.charAt(0).toUpperCase() + request.status.slice(1)}</span></p>
      <p className="text-sm text-gray-600">Created At: {new Date(request.createdAt).toLocaleString()}</p>
      {request.status === 'pending' && (
        <button onClick={() => setIsModalOpen(true)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Review Request
        </button>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Update Request Status</h2>
            <textarea
              value={doctorNotes}
              onChange={(e) => setDoctorNotes(e.target.value)}
              placeholder="Doctor's Notes"
              className="border p-2 mb-2 w-full"
            />
            <textarea
              value={treatmentPlan}
              onChange={(e) => setTreatmentPlan(e.target.value)}
              placeholder="Treatment Plan"
              className="border p-2 mb-2 w-full"
            />
            <div className="flex justify-between mt-4">
              <button onClick={handleApprove} className="bg-green-500 text-white px-4 py-2 rounded">
                Approve
              </button>
              <button onClick={handleDeny} className="bg-red-500 text-white px-4 py-2 rounded">
                Deny
              </button>
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 text-black px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServeRequest;
