import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ children, redirectTo = "/login" }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to={redirectTo} replace />;
  }

  // Si querés, podés impedir que un usuario entre al dashboard, por ejemplo:
  if (window.location.pathname.startsWith("/dashboard") && role === "patient") {
    return <Navigate to="/user" replace />;
  }

  // O impedir que un admin entre a /user
  if (window.location.pathname.startsWith("/user") && role !== "patient") {
    return <Navigate to="/dashboard/welcome" replace />;
  }

  return children ? children : <Outlet />;
}
