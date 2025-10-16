import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ children, redirectTo = "/login" }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // si no hay token, redirige al login
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet /> // si hay token, muestra la ruta protegida
}
