import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function AuthGuard({ children }) {
  const account = useSelector((state) => state.user);
  const location = useLocation();
  console.log(account);
  if (!account.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.any,
};

export default AuthGuard;
