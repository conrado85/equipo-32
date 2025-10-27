import { useState } from "react";
import axios from "axios";

export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    birth_date: "",
    gender: "male",
    phone: "",
    address: "",
    blood_type: "",
    allergies: "",
    current_medications: "",
    insurance_number: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/profile/complete/patient",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Perfil actualizado correctamente");
      console.log("Perfil actualizado:", response.data);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      if (error.response) {
        setMessage(
          `❌ Error: ${
            error.response.data.message || "Revisa los campos e intenta nuevamente"
          }`
        );
      } else {
        setMessage("❌ Error de conexión con el servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Mi Perfil</h2>

      {message && <div className="mb-4 text-center text-sm">{message}</div>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre completo" className="p-2 border rounded" />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Correo electrónico" className="p-2 border rounded" />

        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Contraseña" className="p-2 border rounded" />
        <input name="password_confirmation" type="password" value={form.password_confirmation} onChange={handleChange} placeholder="Confirmar contraseña" className="p-2 border rounded" />

        <input name="birth_date" type="date" value={form.birth_date} onChange={handleChange} className="p-2 border rounded" />

        <select name="gender" value={form.gender} onChange={handleChange} className="p-2 border rounded">
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
          <option value="other">Otro</option>
        </select>

        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Teléfono" className="p-2 border rounded" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Dirección" className="p-2 border rounded" />
        <input name="blood_type" value={form.blood_type} onChange={handleChange} placeholder="Tipo de sangre" className="p-2 border rounded" />
        <input name="insurance_number" value={form.insurance_number} onChange={handleChange} placeholder="Número de seguro" className="p-2 border rounded" />

        <input name="emergency_contact_name" value={form.emergency_contact_name} onChange={handleChange} placeholder="Contacto de emergencia" className="p-2 border rounded" />
        <input name="emergency_contact_phone" value={form.emergency_contact_phone} onChange={handleChange} placeholder="Teléfono de emergencia" className="p-2 border rounded" />

        <textarea name="allergies" value={form.allergies} onChange={handleChange} placeholder="Alergias" className="p-2 border rounded md:col-span-2" />
        <textarea name="current_medications" value={form.current_medications} onChange={handleChange} placeholder="Medicamentos actuales" className="p-2 border rounded md:col-span-2" />

        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-xl transition"
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </div>
  );
}
