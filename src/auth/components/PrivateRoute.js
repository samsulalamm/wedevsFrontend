import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {userIsLoggedIn} from "../authUtils";

function PrivateRoute({ children, ...rest }) {
  const isAuthenticated = userIsLoggedIn();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
