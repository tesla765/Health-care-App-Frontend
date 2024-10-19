// src/components/Request.js

import React from 'react';

function Request({ request }) {
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
  const createdAt = new Date(request.createdAt).toLocaleDateString();
  const updatedAt = new Date(request.updatedAt).toLocaleDateString();

  return (
    <div className={`border border-lightgray rounded-lg mb-4 shadow-lg ${backgroundColor}`}>
      <div className="p-6">
        <h3 className="font-bold text-lg">{request.problemDescription}</h3>
        <p className="mt-2">Status: <span className={statusColor}>{request.status.charAt(0).toUpperCase() + request.status.slice(1)}</span></p>
        <p className="mt-2 text-gray-600 text-sm">Created At: {createdAt}</p>
        <p className="mt-1 text-gray-600 text-sm">Last Updated: {updatedAt}</p>
      </div>
      {(request.doctorNotes || request.treatmentPlan) && (
        <div className="border-t border-gray-200 p-4">
          {request.doctorNotes && (
            <div>
              <h4 className="font-semibold">Doctor's Notes:</h4>
              <p>{request.doctorNotes}</p>
            </div>
          )}
          {request.treatmentPlan && (
            <div className="mt-2">
              <h4 className="font-semibold">Treatment Plan:</h4>
              <p>{request.treatmentPlan}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Request;
