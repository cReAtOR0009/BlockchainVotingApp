import React, { useState } from "react";
import { navLinks } from "../assets/textAsset";
import logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";

export const Nav = () => {
  const [activeNavigation, setactiveNavigation] = useState("elections");



  return (
    <div>
      {
        <div className="containers navigation">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <ul>
            {navLinks.map((navlink, index) => {
              return navlink.id === "connect_wallet" ? (
                <li
                key={index}
                  className={`navItem ${
                    activeNavigation == navlink.id ? "activeNav" : ""
                  }`}
                  onClick={() => setactiveNavigation(navlink.id)}
                >{navlink.title}</li>
              ) : (
                <Link key={index} to={navlink.id}>
                  <li
                    
                    className={`navItem ${
                      activeNavigation == navlink.id ? "activeNav" : ""
                    }`}
                    onClick={() => setactiveNavigation(navlink.id)}
                  >
                    {navlink.title}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      }
    </div>
  );
};
