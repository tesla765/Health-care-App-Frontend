import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PatientLogin from './pages/Patientlogin';
import PatientSignup from './pages/PatientSignup';
import DoctorLogin from './pages/DoctorLogin';
import LandingPage from './pages/LandingPage';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import MyRequests from './pages/MyRequests';
import Requests from './pages/RecentRequest';
import './index.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/patientlogin" element={<PatientLogin />} />
          <Route path="/patientsignup" element={<PatientSignup />} />
          <Route path="/doctorlogin" element={<DoctorLogin />} />
          <Route path="/patientdashboard" element={<PatientDashboard />} />
        <Route path="/patientdashboard/myrequests" element={<MyRequests />} />
        <Route path="/doctordashboard" element={<DoctorDashboard />} />
        <Route path="/doctordashboard/requests" element={<Requests />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
