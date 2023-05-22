// import React from 'react'
// import PropTypes from 'prop-types'
// // import { Link } from 'react-router-dom';

// export default function Navbar(props) {
//     return (
//         <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
//             <div className="container-fluid">
//                 <h1  >{props.title}</h1>
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                         <li className="nav-item">
//                             Home
//                         </li>
//                         <li className="nav-item">
//                             {props.aboutText}
//                         </li>
//                     </ul>
//                     <div className={`form-check form-switch text-${props.mode==='light'?'dark':'light'}`}>
//                         <input className="form-check-input" onClick={props.toggleMode} type="checkbox" id="flexSwitchCheckDefault"/>
//                         <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable DarkMode</label>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     )
// }

// Navbar.propTypes = {
//     title: PropTypes.string.isRequired,
//     aboutText: PropTypes.string.isRequired
// }

// Navbar.defaultProps = {
//     title: 'Set title here',
//     aboutText: 'About'
//   };

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  return (
    <div>
      <header className="flex items-center justify-between bg-blue-900 h-12 text-white cursor-pointer">
        <h1
          onClick={() => navigate("/")}
          className="text-left ml-6 text-bold cursor-pointer"
        >
          Text <br /> Generator
        </h1>
        <ul className="flex flex-wrap justify-center space-x-4 mr-12 cursor-pointer ">
          <li className="mr-12" onClick={() => navigate("/")}>
            Home
          </li>
          <li onClick={() => navigate("/translator")}>Translator</li>
          <li onClick={() => navigate("/dictionary")}>Dictionary</li>
          <li onClick={() => navigate("/contact")}>Contact</li>
        </ul>
      </header>
    </div>
  );
}
