// src/components/Requests.js
import React from 'react';
import Request from './request';

function Requests({ requests }) {
  const requestList = requests || [];

  return (
    <div className="p-4">
      <div className="border border-gray-300 rounded-md overflow-y-auto max-h-[800px] max-w-[1200px] p-6"> {/* Increased padding */}
        {requestList.length > 0 ? (
          requestList.map(request => <Request key={request._id} request={request} />)
        ) : (
          <p className="font-bold">You can write a complaint to the Doctor at your Dashboard.</p>
        )}
      </div>
    </div>
  );
}

export default Requests;
