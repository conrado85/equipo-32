import { Link, Outlet, useLocation } from "react-router-dom";
import NavBarPrivate from "../components/NavBarPrivate";

// Iconos (puedes usar cualquier biblioteca de iconos que prefieras)
import {
  UserRound,
  CalendarCheck,
  FileText,
  Video,
  Pill,
  Notebook,
  Settings,
} from "lucide-react";

export default function DashboardLayout() {
  const location = useLocation();

  const menuItems = [
    {
      path: "/dashboard/welcome",
      label: "Inicio",
      icon: UserRound,
    },
    {
      path: "/dashboard/appointments",
      label: "Turnos",
      icon: CalendarCheck,
    },
    {
      path: "/dashboard/medical-records",
      label: "Historias médicas",
      icon: FileText,
    },
    {
      path: "/dashboard/video-consultation",
      label: "Video consulta",
      icon: Video,
    },
    { path: "/dashboard/treatments", label: "Tratamientos", icon: Pill },
    { path: "/dashboard/my-notes", label: "Mis notas", icon: Notebook },
    { path: "/dashboard/settings", label: "Configuraciones", icon: Settings },
  ];

  return (
    <>
      <NavBarPrivate />
      <div className="flex min-h-[calc(100vh-64px)] bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-200 text-gray-400 flex flex-col p-4">
          <nav className="flex flex-col gap-2">
            {menuItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 pb-9 rounded transition ${
                  location.pathname === path
                    ? "bg-gray-400 text-white font-semibold"
                    : "hover:bg-gray-300 text-gray-600"
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="mt-auto bg-red-500 hover:bg-red-600 p-2 rounded transition text-amber-50 font-semibold"
          >
            Cerrar sesión
          </button>
        </aside>

        {/* Contenido dinámico */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </>
  );
}
