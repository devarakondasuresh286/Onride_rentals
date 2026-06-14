import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ allowedRoles }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <section className="page container">
        <p>Checking access...</p>
      </section>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(user?.role)) {
    const fallbackPath = user?.role === "admin"
      ? "/admin"
      : user?.role === "renter"
        ? "/renter"
        : "/dashboard";

    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;