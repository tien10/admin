import React from "react";
import { Route, Redirect } from "react-router-dom";

function PublicRoute({ component: Component, ...rest }) {
  return <Route {...rest} render={(props) => <Component {...props} />} />;
}

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: props.location,
            }}
          />
        );
      }}
    />
  );
}

export { PublicRoute, ProtectedRoute };
