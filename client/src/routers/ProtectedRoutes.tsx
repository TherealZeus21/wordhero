/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { authState } from "../redux/stories/authStory";

const ProtectedRoutes = ({ component: Component, ...rest }): JSX.Element => {
  const isAuthenticated = useState(authState.getValue().isLogged);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoutes;
