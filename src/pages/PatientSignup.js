import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PatientSignup() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [allergies, setAllergies] = useState([]);
  const [allergyInput, setAllergyInput] = useState('');
  const [medications, setMedications] = useState([]);
  const [medicationInput, setMedicationInput] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const medicalHistory = {
      allergies,
      medications,
    };

    const body = {
      name,
      age: Number(age),
      medicalHistory,
      email,
      password,
    };

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/patient/signup`, body);

      if (response.status === 200) {
        navigate('/patientlogin');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addAllergy = () => {
    if (allergyInput) {
      setAllergies([...allergies, allergyInput]);
      setAllergyInput('');
    }
  };

  const addMedication = () => {
    if (medicationInput) {
      setMedications([...medications, medicationInput]);
      setMedicationInput('');
    }
  };

  const removeAllergy = (index) => {
    setAllergies(allergies.filter((_, i) => i !== index));
  };

  const removeMedication = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-full max-h-[90vh] overflow-auto space-y-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center">Patient Signup</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {loading && <p className="text-blue-500 text-center">Loading...</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Allergies</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={allergyInput}
              onChange={(e) => setAllergyInput(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="button"
              onClick={addAllergy}
              className="bg-blue-600 text-white rounded-md p-2"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap mt-2">
            {allergies.map((allergy, index) => (
              <span key={index} className="bg-red-200 text-red-800 rounded-full px-3 py-1 mr-2 mb-2 flex items-center">
                {allergy}
                <button
                  type="button"
                  onClick={() => removeAllergy(index)}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Medications</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={medicationInput}
              onChange={(e) => setMedicationInput(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="button"
              onClick={addMedication}
              className="bg-blue-600 text-white rounded-md p-2"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap mt-2">
            {medications.map((medication, index) => (
              <span key={index} className="bg-green-200 text-green-800 rounded-full px-3 py-1 mr-2 mb-2 flex items-center">
                {medication}
                <button
                  type="button"
                  onClick={() => removeMedication(index)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-200"
        >
          Sign Up
        </button>
        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/patientlogin')}
            className="text-black hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}

export default PatientSignup;
