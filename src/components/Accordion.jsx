import { useState } from "react";
import api from "../api/axios";

export default function Accordion() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Se ejecuta solo cuando el usuario abre "Datos personales"
  const handleOpenDatos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) throw new Error("Token no encontrado");

      const { data } = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success && data.user) {
        setUserData(data.user);
      } else {
        console.error("Respuesta inesperada del backend:", data);
      }
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* --- D A T O S  P E R S O N A L E S --- */}
      <div className="collapse collapse-arrow bg-transparent border border-base-300">
        <input
          type="radio"
          name="my-accordion-2"
          onChange={handleOpenDatos}
        />
        <div className="collapse-title font-semibold">
          Datos personales
        </div>
        <div className="collapse-content text-sm">
          {loading ? (
            <p className="text-gray-500 animate-pulse">Cargando datos...</p>
          ) : userData ? (
            <div className="space-y-2">
              <p><span className="font-semibold">Nombre:</span> {userData.name}</p>
              <p><span className="font-semibold">Email:</span> {userData.email}</p>
              {userData.phone && (
                <p><span className="font-semibold">Teléfono:</span> {userData.phone}</p>
              )}
              {userData.address && (
                <p><span className="font-semibold">Dirección:</span> {userData.address}</p>
              )}
            </div>
          ) : (
            <p className="text-gray-400">No se encontraron datos.</p>
          )}
        </div>
      </div>

      {/* --- S E G U R I D A D --- */}
      <div className="collapse collapse-arrow bg-transparent border border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold">Seguridad</div>
        <div className="collapse-content text-sm">Próximamente.</div>
      </div>

      {/* --- E Q U I P O  M É D I C O --- */}
      <div className="collapse collapse-arrow bg-transparent border border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold">
          Comunicate con tu equipo médico
        </div>
        <div className="collapse-content text-sm">Próximamente.</div>
      </div>

      {/* --- A Y U D A --- */}
      <div className="collapse collapse-arrow bg-transparent border border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold">Ayuda</div>
        <div className="collapse-content text-sm">Próximamente.</div>
      </div>
    </div>
  );
}
