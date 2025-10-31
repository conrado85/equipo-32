import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, CalendarDays, Settings, LogOut } from "lucide-react";

export default function UserProfile() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Mi Perfil",
      description: "Editá tus datos personales y contraseña.",
      icon: <User className="w-8 h-8 text-blue-600" />,
      path: "/user/profile",
    },
    {
      title: "Mis Turnos",
      description: "Consultá tus citas médicas y estados.",
      icon: <CalendarDays className="w-8 h-8 text-green-600" />,
      path: "/user/appointments",
    },
    {
      title: "Configuración",
      description: "Preferencias, notificaciones y privacidad.",
      icon: <Settings className="w-8 h-8 text-purple-600" />,
      path: "/user/settings",
    },
    {
      title: "Cerrar Sesión",
      description: "Salir de tu cuenta de forma segura.",
      icon: <LogOut className="w-8 h-8 text-red-600" />,
      path: "/logout",
    },
  ];

  const handleCardClick = (path) => {
    if (path === "/logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">
        Bienvenido a SaludOne 👋
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            onClick={() => handleCardClick(card.path)}
            className="cursor-pointer bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all border border-gray-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-gray-100 p-4 rounded-full">{card.icon}</div>
              <h2 className="text-lg font-semibold text-gray-800">{card.title}</h2>
              <p className="text-sm text-gray-500">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
