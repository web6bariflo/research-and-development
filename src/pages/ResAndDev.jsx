import React, { useState } from 'react';

const ResAndDev = () => {
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');

  const handleSubmit = () => {
    console.log('From Time:', fromTime);
    console.log('To Time:', toTime);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
        <span className="text-gray-700 font-medium">Time:</span>
        <input
          type="time"
          value={fromTime}
          onChange={(e) => setFromTime(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="time"
          value={toTime}
          onChange={(e) => setToTime(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ResAndDev;
