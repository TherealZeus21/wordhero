import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { loginRedirect } from "../../../services/authProvider";
import { authState } from "../../../redux/stories/authStory";
const HeaderNav: React.FC<any> = () => {
  const [userIsAuthenticated, setAuth] = useState(false);

  useEffect(() => {
    authState.subscribe((story) => {
      setAuth(story.isLogged);
    });
  });
  return (
    <div className="nav-bar">
      <nav>
        <NavLink exact to="/" activeClassName="selected">
          Home
        </NavLink>
      </nav>
      {userIsAuthenticated && <nav></nav>}
      {!userIsAuthenticated && (
        <nav>
          <button type="button" onClick={loginRedirect}>
            Log In or Sign In
          </button>
        </nav>
      )}
    </div>
  );
};

export default HeaderNav;
