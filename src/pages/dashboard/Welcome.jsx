import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Accessibility } from "lucide-react";
import Accordion from "../../components/Accordion";

export default function Welcome() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token no encontrado");

        const { data } = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Tu backend devuelve: { success, message, user }
        if (data.success && data.user) {
          setUser(data.user);
        } else {
          console.error("Estructura inesperada en la respuesta:", data);
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 text-lg animate-pulse">
          Cargando información...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-7 px-6 py-12">
      {/* Contenido principal */}
      <div className="flex flex-col items-center justify-center text-center md:w-1/2 lg:w-2/5 bg-transparent backdrop-blur-md rounded-2xl p-8 ">
        {user ? (
          <>
            <h1 className="text-4xl font-bold text-teal-700 mb-3">
              ¡Bienvenido, {user.name}!{console.log(user)}
            </h1>
            <p className="text-gray-600 text-lg mb-1">
              Perfil {user.role === "admin" ? " de administrador" : ""}
            </p>
            <p className="text-gray-600 text-lg mb-6">
              Accede a tu espacio personal de{" "}
              <span className="font-semibold text-blue-600">SaludOne,</span>{" "}
              gestiona tus citas, tratamientos y consultas de forma segura y
              sencilla.
            </p>

            <div className="flex flex-col items-center">
              <img
                src={
                  user.image ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="Foto de perfil"
                className="w-36 h-36 rounded-full object-cover shadow-lg border-4 border-blue-200"
              />
              <p className="mt-4 font-semibold">{user.name}</p>
              <p className="mt-4 text-gray-500 text-sm">
                (Podrás cambiar tu foto desde tu perfil más adelante)
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={() =>
                  (window.location.href = "/dashboard/appointments")
                }
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-xl transition-all shadow-md"
              >
                Agendar cita
              </button>
            </div>
          </>
        ) : (
          <p className="text-red-500 font-medium">
            No se pudo cargar la información del usuario.
          </p>
        )}
      </div>
      {/* acordion lateral */}
      <Accordion />
    </div>
  );
}
