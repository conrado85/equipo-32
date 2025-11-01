import { useState } from "react";
import authService from "../api/authService";

export default function Accordion() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Se ejecuta solo cuando el usuario abre "Datos personales"
  const handleOpenDatos = async () => {
    try {
      setLoading(true);
      
      const result = await authService.getCurrentUser();
      
      if (result.success && result.user) {
        setUserData(result.user);
      } else {
        console.error("Error al obtener los datos del usuario:", result.message);
      }
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3 w-full max-w-md">
      {/* --- D A T O S  P E R S O N A L E S --- */}
      <div className="collapse collapse-arrow bg-white border border-gray-200 rounded-lg shadow-sm">
        <input
          type="radio"
          name="my-accordion-2"
          onChange={handleOpenDatos}
        />
        <div className="collapse-title font-semibold text-gray-800">
          Datos personales
        </div>
        <div className="collapse-content text-sm text-gray-700">
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
            <p className="text-gray-500">No se encontraron datos.</p>
          )}
        </div>
      </div>

      {/* --- S E G U R I D A D --- */}
      <div className="collapse collapse-arrow bg-white border border-gray-200 rounded-lg shadow-sm">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold text-gray-800">Seguridad</div>
        <div className="collapse-content text-sm text-gray-700">Próximamente.</div>
      </div>

      {/* --- E Q U I P O  M É D I C O --- */}
      <div className="collapse collapse-arrow bg-white border border-gray-200 rounded-lg shadow-sm">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold text-gray-800">
          Comunicate con tu equipo médico
        </div>
        <div className="collapse-content text-sm text-gray-700">Próximamente.</div>
      </div>

      {/* --- A Y U D A --- */}
      <div className="collapse collapse-arrow bg-white border border-gray-200 rounded-lg shadow-sm">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold text-gray-800">Ayuda</div>
        <div className="collapse-content text-sm text-gray-700">Próximamente.</div>
      </div>
    </div>
  );
}
