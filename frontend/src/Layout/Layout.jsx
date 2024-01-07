import React from "react";
import { Nav } from "../components/Nav";
import { Outlet } from "react-router-dom";
// import StarsCanvas from '../components'

const Layouts = () => {
  return (
    <div>
      <Nav />
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default Layouts;
