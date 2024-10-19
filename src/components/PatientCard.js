// src/components/PatientCard.js

import React, { useState } from 'react';

function PatientCard({ patient }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="font-bold text-lg">Name: {patient.name}</h3>
      <p className="text-gray-700">Email: {patient.email}</p>
      <button
        onClick={handleToggleDetails}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>

      {showDetails && (
        <div className="mt-2 border-t border-gray-300 pt-2">
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Id:</strong> {patient._id}</p>
          <p><strong>Medical History:</strong></p>
          <p><strong>Allergies:</strong> {patient.medicalHistory.allergies.join(', ') || 'None'}</p>
          <p><strong>Medications:</strong> {patient.medicalHistory.medications.join(', ') || 'None'}</p>
        </div>
      )}
    </div>
  );
}

export default PatientCard;
