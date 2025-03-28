import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="border-t-2 h-full">
      {/* Sidebar */}
      <aside
        className="w-32 md:block bg-sky-100 shadow-md transition-all duration-300 h-screen"
        style={{ zIndex: 1000 }}
      >
        <div className="flex flex-col items-center py-3">
          {/* Res & Dev Link */}
          <div className="text-black p-2 mb-3 cursor-pointer flex flex-col items-center rounded hover:bg-white mt-2 overflow-hidden">
            {/* <Link to="/res-and-dev"> */}
              <i className="bi bi-clock text-xl"></i>
              <span className="transition-all duration-200">Res & Dev</span>
            {/* </Link> */}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
