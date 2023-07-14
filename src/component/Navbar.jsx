import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

  function pathMatchRoute(route) {
    return route === location.pathname;
  }

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  return (
    <div>
      <header className="flex items-center justify-between bg-blue-900 h-24 text-white cursor-pointer">
        <div className="w-full max-w-screen-lg mx-auto flex items-center justify-between">
          <h1
            onClick={() => navigate("/")}
            className="text-left ml-6 text-bold text-2xl  cursor-pointer"
          >
            Text Generator
          </h1>
          <div className="flex items-center mr-6 cursor-pointer">
            <ul
              className={`md:flex space-x-4 md:space-x-10 md:space-y-0 ${
                isMenuOpen ? "" : "hidden"
              }`}
            >
              <li
                onClick={() => navigate("/")}
                className={`cursor-pointer ${
                  isMenuOpen ? "ml-5" : "ml-4 md:ml-0"
                }`}
              >
                Home
              </li>
              <li
                onClick={() => navigate("/translator")}
                className="cursor-pointer"
              >
                Translator
              </li>
              <li
                onClick={() => navigate("/dictionary")}
                className="cursor-pointer"
              >
                Dictionary
              </li>
              <li
                onClick={() => navigate("/contact")}
                className="cursor-pointer"
              >
                Contact
              </li>
            </ul>
            <div
              className="flex items-center md:hidden ml-2"
              onClick={toggleMenu}
            >
              <div
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "transform rotate-45" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-white my-1 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "transform -rotate-45" : ""
                }`}
              ></div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
