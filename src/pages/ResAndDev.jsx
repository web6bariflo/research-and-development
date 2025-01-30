import React, { useState, useEffect } from "react";
import axios from "axios";

import logo1 from "../assets/images/pond.png";
import logo2 from "../assets/images/img.jpeg";
import logo3 from "../assets/images/Outlook-2kob3y0x.png"

const ResAndDev = () => {
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [imageData, setImageData] = useState([]);

  const apiUrl = process.env.REACT_APP_IP;

  // Function to fetch data from API
  const fetchApiData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/get_project_data/`);
      console.log(response.data.images);
      setImageData(response.data.images);
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  // Update the current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    console.log("From Time:", fromTime);
    console.log("To Time:", toTime);
  };

  // Get the last image from the imageData array
  const lastImage = imageData.length > 0 ? imageData[imageData.length - 1] : null;
  console.log(lastImage);

  // Get all other images except the last one
  const otherImages = imageData.slice(-5, -1);
  console.log(otherImages);

  return (
    <div className="flex flex-wrap items-start h-full p-4 w-full space-y-4">
      {/* Time Input Section */}
      <div className="w-full flex justify-center">
        <div className="bg-green-300 shadow-lg rounded-lg p-6 flex items-center space-x-4 border-2 border-blue-400">
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
      </div>

      {/* Large Images Section */}
      <div className="flex w-full justify-center items-start space-x-4">
        {/* Left Large Image */}
        <div className="relative flex flex-col items-center">
          {/* {lastImage ? (
            <img
              // src={`${apiUrl}${lastImage}`}
              src={logo1}
              alt="Large Image"
              className="w-[650px] h-[400px] border-4 shadow-2xl rounded-lg"
            />
          ) : (
            <div className="w-[650px] h-[400px] border-4 shadow-2xl rounded-lg bg-gray-300"></div>
          )} */}


          <img
            src={logo1}
            alt="Large Image"
            className="w-[650px] h-[400px] border-4 shadow-2xl rounded-lg"
          />

          <div className="mt-2 px-4 py-1 border border-gray-400 rounded-md text-gray-700 bg-gray-100">
            {currentTime}
          </div>
          {/* Small Images Section */}
          <div className="absolute top-full left-0 mt-4 flex flex-wrap gap-2">
            {/* {otherImages.map((img, index) => ( */}
            {[logo3,logo3,logo3,logo3].map((img, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-36 h-28 border-2 rounded-lg overflow-hidden shadow-md"
              >
                <img
                  // src={`${apiUrl}${img}`}
                  src={img}
                  alt={`Example ${index + 1}`}
                  className="w-full h-20 object-cover"
                />
                <div className="mt-1 px-1 py-1 border border-gray-400 rounded-md text-gray-700 bg-gray-100 text-sm">
                  {currentTime}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="flex flex-col items-center">
          <img
            src={logo2}
            alt="Logo 2"
            className="w-[650px] h-[400px] border-4 shadow-2xl rounded-lg"
          />
          <div className="mt-2 px-4 py-1 border border-gray-400 rounded-md text-gray-700 bg-gray-100">
            {currentTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResAndDev;
