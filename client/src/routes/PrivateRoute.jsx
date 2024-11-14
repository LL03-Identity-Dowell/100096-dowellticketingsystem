// src/routes/PrivateRoute.js
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// A simple authentication guard
const PrivateRoute = ({ children }) => {
  const isAuthenticated = false; // Replace with actual authentication logic (e.g., context, localStorage, etc.)

  if (!isAuthenticated) {
    // If not authenticated, redirect to login page (or any other page)
    return <Navigate to="/login" />;
  }

  return children;  // If authenticated, render the children (the protected route)
};

// PropTypes validation
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is a valid React element or node
};

export default PrivateRoute;
