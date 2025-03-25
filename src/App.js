import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ResAndDev from "./pages/ResAndDev";
import Nav from "./components/Nav";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <Nav />

        <div className="flex">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-grow p-4">
            <Routes>
              {/* <Route path="/" element={<LandingPage />} /> */}
              <Route path="/" element={<ResAndDev />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
