import { useEffect, useState } from "react";
import api from "../api/axios";

function Table() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/medical-records", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Registros recibidos:", response.data);

        // ⚠️ Fijate cómo accedo a los datos reales:
        if (response.data?.data && Array.isArray(response.data.data)) {
          setRecords(response.data.data);
        } else if (response.data?.data?.data) {
          // A veces Laravel devuelve data dentro de data.data (paginación)
          setRecords(response.data.data.data);
          
        } else {
          console.error("Formato de respuesta inesperado:", response.data);
          setRecords([]);
        }
      } catch (error) {
        console.error("Error al obtener registros:", error);
        setError("No se pudieron cargar los registros médicos.");
      }
    };

    fetchRecords();
  }, []);

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  if (!records.length) {
    return <p className="text-center text-gray-500 mt-4">Cargando registros...</p>;
  }

  
   const formatDate = (dateString) => {
       const date = new Date(dateString);
       const year = date.getFullYear();
       const month = String(date.getMonth() + 1).padStart(2, '0');
       const day = String(date.getDate()).padStart(2, '0');
       return `${day}-${month}-${year}`;   
   }



  return (
    <div className="overflow-x-auto">
      <table className="table rounded-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th>Paciente</th>
            <th>Doctor</th>
            <th>Especialidad</th>
            <th>Fecha</th>
            <th>Duracion de consulta</th>
            <th>Diagnóstico</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.patient_id || "No disponible"}</td>
              <td>{record.medical_staff_id || "No disponible"}</td>
              <td>{record.medical_staff.subspecialty || "No disponible"}</td>
              <td>{formatDate(record.created_at) || record.updated_at || "Sin fecha"}</td>
              <td>{record.medical_staff.appointment_duration || "Sin descripción"}</td>
              <td>{record.assessment || "Sin descripción"}</td>
              <td>
                <button className="btn btn-info btn-sm text-white">Ver detalle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
