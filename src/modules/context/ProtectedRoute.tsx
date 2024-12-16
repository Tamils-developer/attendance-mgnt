// ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useContextState } from ".";

const ProtectedRoute = ({ children, allowedRoles }: any) => {
  const { user } = useContextState();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
