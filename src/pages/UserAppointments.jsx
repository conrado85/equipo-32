import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Stethoscope, HeartPulse, Brain, Eye, Activity } from "lucide-react";

export default function UserAppointments() {
  const navigate = useNavigate();

  const specialties = [
    {
      name: "Clínica General",
      description: "Consultas médicas generales y chequeos preventivos.",
      icon: <Stethoscope className="w-10 h-10 text-blue-600" />,
    },
    {
      name: "Cardiología",
      description: "Control de presión, estudios de ritmo cardíaco y más.",
      icon: <HeartPulse className="w-10 h-10 text-red-600" />,
    },
    {
      name: "Neurología",
      description: "Evaluación y seguimiento de tu salud neurológica.",
      icon: <Brain className="w-10 h-10 text-purple-600" />,
    },
    {
      name: "Oftalmología",
      description: "Revisiones de la vista y prescripción de lentes.",
      icon: <Eye className="w-10 h-10 text-green-600" />,
    },
    {
      name: "Laboratorio",
      description: "Análisis clínicos y resultados digitales.",
      icon: <Activity className="w-10 h-10 text-yellow-600" />,
    },
  ];

  const handleSelectSpecialty = (name) => {
    // Podés redirigir a una página de agendamiento o pasar el nombre por params
    navigate(`/user/appointments/${encodeURIComponent(name.toLowerCase())}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        Reservá tu turno en <span className="text-blue-600">SaludOne</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        {specialties.map((specialty, index) => (
          <motion.div
            key={index}
            onClick={() => handleSelectSpecialty(specialty.name)}
            className="cursor-pointer bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all border border-gray-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-gray-100 p-4 rounded-full">
                {specialty.icon}
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                {specialty.name}
              </h2>
              <p className="text-sm text-gray-500">{specialty.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
