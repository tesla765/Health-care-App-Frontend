import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServeRequest from './ServeRequest'; // Import the ServeRequest component

const ServerRequests = ({ page, setPage, filter }) => {
  const [requests, setRequests] = useState([]); // Local state for requests
  const [loading, setLoading] = useState(true);
  const count = 5; // Hardcoded count

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token'); // Get the token

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/doctor/getAllRequests/${page}/${count}/${filter}`, {
          headers: {
            Authorization: token, // Send the token in the Authorization header
          },
        });

        setRequests(response.data); // Set local requests
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [page, filter]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {requests.length === 0 ? (
        <div>No requests available.</div>
      ) : (
        <div className="space-y-4"> 
          {requests.map((request) => (
            <ServeRequest key={request._id} request={request} />
          ))}
        </div>
      )}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-gray-300 text-black px-4 py-2 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-gray-300 text-black px-4 py-2 rounded"
          disabled={requests.length === 0}
        >
          Next
        </button>
      </div>
      {requests.length === 0 && (
        <div className="mt-4 text-red-600">
          There are no more requests available for this filter.
        </div>
      )}
    </div>
  );
};

export default ServerRequests;
