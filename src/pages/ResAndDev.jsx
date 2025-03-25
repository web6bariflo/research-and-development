import React, { useState, useEffect } from "react";
import logo2 from "../assets/images/img.jpeg";
import logo3 from "../assets/images/Outlook-2kob3y0x.png";

const ResAndDev = () => {
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [imageData, setImageData] = useState([]);

  const apiUrl = process.env.REACT_APP_IP;
  console.log(apiUrl);

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.31.25:8002/ws/thermal-images/");
    // const socket = new WebSocket("ws://192.168.31.208:8001/ws/thermal-images/");
    setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "ping" }));
      }
    }, 30000);

    // console.log(socket);

    socket.onopen = () => {
      console.log("WebSocket Connected");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data); // Assuming the server sends JSON data
        console.log("WebSocket Message Received:", data);

        // Ensure data contains valid images before updating state
        if (
          data.type === "thermal_images" &&
          Array.isArray(data.data) &&
          data.data.length > 0
        ) {
          setImageData(data.data); // Update state with new images
        } else {
          console.warn("⚠️ No valid image data received:", data);
        }
      } catch (error) {
        console.error("❌ Error parsing WebSocket message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    return () => {
      socket.close(); // Cleanup on unmount
    };
  }, []);

  // Update the current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    console.log("From Time:", fromTime);
    console.log("To Time:", toTime);
  };

  // Get the last image from the imageData array
  const lastImage =
    imageData.length > 0 ? imageData[imageData.length - 1] : null;
  console.log(lastImage);

  // Get all other images except the last one
  // const otherImages = imageData;
  const otherImages = imageData.slice(-5, -1);
  console.log(otherImages);

  return (
    <div className="flex flex-wrap items-center w-full space-y-4 mt-16">
      {/* Time Input Section */}
      {/* <div className="w-full flex justify-center">
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
      </div> */}

      {/* Large Images Section */}
      <div className="flex w-full justify-center space-x-10">
        {/* Left Large Image */}
        <div className="relative flex flex-col items-center">
          {lastImage ? (
            <img
              src={`data:image/png;base64,${lastImage.thermal_image}`} // Add prefix
              alt="Thermal Image"
              className="w-[400px] h-[400px] border-4 shadow-2xl rounded-lg"
            />
          ) : (
            <div className="w-[400px] h-[400px] border-4 shadow-2xl rounded-lg bg-gray-300"></div>
          )}

          <div className="mt-2 px-4 py-1 border border-gray-400 rounded-md text-gray-700 bg-gray-100">
            {currentTime}
          </div>
          {/* Small Images Section */}
          <div className="absolute top-full left-0 mt-4 flex flex-wrap gap-2">
            {otherImages.map((img, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-36 h-28 border-2 rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={`data:image/png;base64,${img.thermal_image}`}
                  alt={`Thermal Image ${index + 1}`}
                  className="w-full h-20 object-cover"
                />
                <div className="mt-1 px-1 py-1 border border-gray-400 rounded-md text-gray-700 bg-gray-100 text-sm">
                  {currentTime}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Image (New Station) */}
        <div className="flex flex-col items-center">
          <img
            src={logo2}
            alt="Logo 2"
            className="w-[400px] h-[400px] border-4 shadow-2xl rounded-lg"
          />
          <div className="mt-2 px-4 py-1 border border-gray-400 rounded-md text-gray-700 bg-gray-100">
            {currentTime}
          </div>
        </div>

        {/* Right Image */}
        <div className="flex flex-col items-center">
          <img
            src={logo2}
            alt="Logo 2"
            className="w-[400px] h-[400px] border-4 shadow-2xl rounded-lg"
          />
          <div className="mt-2 px-4 py-1 border border-gray-400 rounded-md text-gray-700 bg-gray-100">
            {currentTime}
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-10 justify-center m-auto">
        <div className="space-x-2 mt-5">
          <label className="text-blue-600 font-medium text-lg">
            Input:{" "}
          </label>
          <input
            type="text"
            className="px-4 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 text-blue-700 mt-5"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mt-5"
          >
            Submit
          </button>
        </div>

        <div className="space-x-2 mt-5">
          <label className="text-blue-600 font-medium text-lg mt-5">
            Input:{" "}
          </label>
          <input
            type="text"
            className="px-4 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 text-blue-700 mt-5"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mt-5"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResAndDev;
