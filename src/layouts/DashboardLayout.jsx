import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import NavBarPrivate from "../components/NavBarPrivate";
import {
  UserRound,
  CalendarCheck,
  FileText,
  Users,
  UserCheck,
  Heart,
  Settings,
  Menu,
  X,
} from "lucide-react";

export default function DashboardLayout() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { path: "/dashboard/welcome", label: "Inicio", icon: UserRound },
    { path: "/dashboard/appointments", label: "Turnos", icon: CalendarCheck },
    { path: "/dashboard/medical-records", label: "Historias médicas", icon: FileText },
    { path: "/dashboard/users", label: "Usuarios", icon: Users },
    { path: "/dashboard/doctors", label: "Doctores", icon: UserCheck },
    { path: "/dashboard/patients", label: "Pacientes", icon: Heart },
    { path: "/dashboard/settings", label: "Configuraciones", icon: Settings },
  ];

  return (
    <>
      <NavBarPrivate />

      <div className="flex min-h-[calc(100vh-64px)] bg-gray-100">
        {/* Sidebar */}
        <aside
          className={`bg-white text-gray-400 flex flex-col p-4 transition-all duration-300
            ${isCollapsed ? "w-16" : "w-60"} hidden md:flex`}
        >
          {/* Botón colapsar */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="self-end mb-4 p-2 text-gray-500 hover:text-blue-500"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>

          <nav className="flex flex-col gap-2">
            {menuItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 mb-2 p-2 rounded-xl transition
                  ${location.pathname === path
                    ? "bg-blue-500 text-white font-semibold"
                    : "hover:bg-blue-100 hover:text-blue-500"}
                  ${isCollapsed ? "justify-center" : ""}`}
              >
                <Icon size={20} />
                {!isCollapsed && <span>{label}</span>}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className={`mt-auto bg-transparent hover:bg-red-600 hover:text-white p-2 rounded-xl transition text-red-600 border border-red-600 font-semibold
              ${isCollapsed ? "text-center text-sm" : ""}`}
          >
            {isCollapsed ? "⎋" : "Cerrar sesión"}
          </button>
        </aside>

        {/* Sidebar solo íconos en móvil */}
        <aside className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around p-2 md:hidden">
          {menuItems.map(({ path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`p-2 rounded-lg transition ${
                location.pathname === path
                  ? "bg-blue-500 text-white"
                  : "text-gray-500 hover:bg-blue-100 hover:text-blue-500"
              }`}
            >
              <Icon size={22} />
            </Link>
          ))}
        </aside>

        {/* Contenido dinámico */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </>
  );
}
