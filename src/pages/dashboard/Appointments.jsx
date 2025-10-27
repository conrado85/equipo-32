import { useState, useEffect } from "react";
import api from "../../api/axios"; // tu instancia axios configurada

const Appointments = () => {
  const [form, setForm] = useState({
    medical_staff_id: null,
    specialty_id: "",
    start_date: "",
    end_date: "",
    type: "presencial",
    reason: "",
    urgent: false,
    priority: 3,
  });

  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // 🔹 Cargar especialidades
  useEffect(() => {
    api
      .get("/specialties")
      .then((res) => {
        setSpecialties(res.data.data || res.data || []);
      })
      .catch((err) => {
        console.error("❌ Error cargando especialidades:", err.response || err);
        setMensaje("❌ Error cargando especialidades");
      });
  }, []);

  // 🔹 Cargar doctores según especialidad, fecha y tipo
  useEffect(() => {
    if (!form.specialty_id || !form.start_date) {
      setDoctors([]);
      return;
    }

    const token = localStorage.getItem("token"); // ajusta según cómo guardes el token

    api
      .get("/patient/appointments/available-doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          specialty_id: form.specialty_id,
          date: form.start_date.split("T")[0], // YYYY-MM-DD
          type: form.type || "presencial",
        },
      })
      .then((res) => {
        if (res.data.success) {
          setDoctors(res.data.data || []);
        } else {
          setMensaje(res.data.message || "❌ No se pudieron obtener los doctores");
        }
      })
      .catch((err) => {
        console.error("❌ Error cargando doctores:", err.response || err);
        if (err.response && err.response.status === 401) {
          setMensaje("⚠️ 401 Unauthorized: revisa el token o su formato");
        } else {
          setMensaje("❌ Error cargando doctores");
        }
      });
  }, [form.specialty_id, form.start_date, form.type]);

  // 🔹 Manejador de cambios
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 🔹 Confirmar envío
  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        specialty_id: Number(form.specialty_id),
        priority: Number(form.priority),
      };
      if (!payload.medical_staff_id) delete payload.medical_staff_id;

      const response = await api.post("/patient/appointments/book", payload);

      setMensaje("✅ Cita agendada correctamente");
      setShowModal(false);

      // Reset form
      setForm({
        medical_staff_id: null,
        specialty_id: "",
        start_date: "",
        end_date: "",
        type: "presencial",
        reason: "",
        urgent: false,
        priority: 3,
      });
    } catch (err) {
      console.error("❌ Error al agendar cita:", err.response || err);
      if (err.response && err.response.status === 401) {
        setMensaje("⚠️ 401 Unauthorized: revisa el token o su formato");
      } else {
        setMensaje("❌ Error al agendar la cita");
      }
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Agendar cita médica
      </h2>

      {/* Especialidad */}
      <label className="block mb-2 font-medium">Especialidad</label>
      <select
        name="specialty_id"
        value={form.specialty_id}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      >
        <option value="">Selecciona una especialidad</option>
        {specialties.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* Tipo de cita */}
      <label className="block mb-2 font-medium">Tipo de cita</label>
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      >
        <option value="presencial">Presencial</option>
        <option value="virtual">Virtual</option>
      </select>

      {/* Médico */}
      <label className="block mb-2 font-medium">Doctor</label>
      <select
        name="medical_staff_id"
        value={form.medical_staff_id || ""}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      >
        <option value="">Selecciona un doctor (opcional)</option>
        {doctors.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      {/* Fechas */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block mb-2 font-medium">Inicio</label>
          <input
            type="datetime-local"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Fin</label>
          <input
            type="datetime-local"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      {/* Motivo */}
      <label className="block mb-2 font-medium mt-3">Motivo</label>
      <textarea
        name="reason"
        value={form.reason}
        onChange={handleChange}
        placeholder="Describe el motivo de la consulta"
        className="w-full border p-2 rounded mb-3"
      />

      {/* Urgente y prioridad */}
      <div className="flex items-center gap-3 mb-3">
        <input
          type="checkbox"
          name="urgent"
          checked={form.urgent}
          onChange={handleChange}
        />
        <span>Es urgente</span>
      </div>

      <label className="block mb-2 font-medium">Prioridad (1-5)</label>
      <input
        type="number"
        name="priority"
        min="1"
        max="5"
        value={form.priority}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-4"
      />

      {/* Botón */}
      <button
        onClick={() => setShowModal(true)}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Agendar cita
      </button>

      {mensaje && <p className="text-center mt-3">{mensaje}</p>}

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-3 text-center">
              Confirmar cita
            </h3>
            <p><strong>Especialidad:</strong> {form.specialty_id}</p>
            <p><strong>Doctor:</strong> {form.medical_staff_id || "Automático"}</p>
            <p><strong>Inicio:</strong> {form.start_date}</p>
            <p><strong>Fin:</strong> {form.end_date}</p>
            <p><strong>Tipo:</strong> {form.type}</p>
            <p><strong>Motivo:</strong> {form.reason}</p>
            <p><strong>Urgente:</strong> {form.urgent ? "Sí" : "No"}</p>
            <p><strong>Prioridad:</strong> {form.priority}</p>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
