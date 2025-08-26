//C:\Users\KALPNA\Desktop\secure-coding2\frontend\src\components\ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);
    const { exp, role } = decoded;

    if (Date.now() >= exp * 1000) {
      localStorage.removeItem('token');
      return <Navigate to="/login" replace />;
    }

    if (requiredRole && role !== requiredRole) {
      return <Navigate to="/dashboard" replace />;
    }
  } catch (err) {
    console.error('Invalid token:', err);
    return <Navigate to="/login" replace />;
  }

  return children;
};


export default ProtectedRoute;