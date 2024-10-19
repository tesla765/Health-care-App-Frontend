// src/DoctorDashboard.js

import React, { useState } from 'react';
import DoctorNavbar2 from '../Navbar/DoctorNavbar2';
import ServeRequests from '../components/ServeRequests';

function Requests() {
  const [filter, setFilter] = useState('all'); // Initial filter
  const [page, setPage] = useState(1); // Initial page number

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <DoctorNavbar2 />
      <div className="mt-16 p-4">
        <h2 className="text-xl text-black mb-4">Hey, Below are the requests you need to serve</h2>
        <div className="mb-8">
          <label htmlFor="filter" className="mr-2">Filter:</label>
          <select
            id="filter"
            value={filter}
            onChange={handleFilterChange}
            className="border rounded p-2"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </select>
        </div>
        <ServeRequests page={page} setPage={setPage} filter={filter} />  
      </div>
    </div>
  );
}

export default Requests;
