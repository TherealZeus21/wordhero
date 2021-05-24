import React from "react";
import { NavLink } from "react-router-dom";

const LogoImg: React.FC<any> = () => {
  return (
    <div>
      <NavLink to="/" activeClassName="selected">
        <div className="pm-logo-alt" />
      </NavLink>
    </div>
  );
};

export default LogoImg;
