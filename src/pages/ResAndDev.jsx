import React, { useState } from 'react';

import logo from '../assets/images/Outlook-2kob3y0x.png';

const ResAndDev = () => {
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');

  const handleSubmit = () => {
    console.log('From Time:', fromTime);
    console.log('To Time:', toTime);
  };

  return (
    <div className="flex flex-col items-center h-screen p-4">
      {/* Time Input Section */}
      <div className="bg-sky-100 shadow-lg rounded-lg p-6 flex items-center space-x-4 w-full max-w-md border-2 border-blue-400">
        <span className="text-blue-600 font-medium text-lg">Time:</span>
        <input
          type="time"
          value={fromTime}
          onChange={(e) => setFromTime(e.target.value)}
          className="px-4 py-2 border-2 border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 text-blue-700"
        />
        <input
          type="time"
          value={toTime}
          onChange={(e) => setToTime(e.target.value)}
          className="px-4 py-2 border-2 border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 text-blue-700"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </div>

      {/* Logo Display Section */}
      <div className="mt-8">
        <img
          src={logo}
          alt="Logo"
          className="max-w-full h-auto border-4 shadow-2xl rounded-lg"
        />
      </div>

      
      <div className="mt-8 flex justify-center space-x-4">
        <div className="w-48 h-30 border-2 border-blue-400 rounded-lg overflow-hidden shadow-md">
          <img src={logo} alt="Example 1" className="w-full h-full object-cover" />
        </div>
        <div className="w-48 h-30 border-2 border-blue-400 rounded-lg overflow-hidden shadow-md">
          <img src={logo} alt="Example 2" className="w-full h-full object-cover" />
        </div>
        <div className="w-48 h-30 border-2 border-blue-400 rounded-lg overflow-hidden shadow-md">
          <img src={logo} alt="Example 3" className="w-full h-full object-cover" />
        </div>
        <div className="w-48 h-30 border-2 border-blue-400 rounded-lg overflow-hidden shadow-md">
          <img src={logo} alt="Example 4" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default ResAndDev;
