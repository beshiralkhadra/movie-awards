import React from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as WebLogo } from "../../assets/crown.svg";
import "./index.css";

const NavigationBar = () => {
  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <WebLogo className="logo" />
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default NavigationBar;
