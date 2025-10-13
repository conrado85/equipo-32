import imgRegister from '../assets/paciente-femenina-que-asiste-una-consulta-virtual 2.png';
import { useState } from 'react';
import {Link} from 'react-router-dom'

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!userData.name.trim() || userData.name.length > 255)
      newErrors.name = "El nombre es obligatorio y no puede superar 255 caracteres";
    if (!userData.email.includes("@")) newErrors.email = "Email no válido";
    if (userData.password.length < 8)
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    if (userData.password !== userData.password_confirmation)
      newErrors.password_confirmation = "Las contraseñas no coinciden";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setErrors({});

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (response.ok) {
        setSuccess("✅ ¡Usuario registrado con éxito!");
        setUserData({ name: "", email: "", password: "", password_confirmation: "" });
        setErrors({});
      } else if (response.status === 422 && data?.errors) {
        setErrors(data.errors);
      } else {
        setErrors({ general: data?.message || "Error al registrar el usuario" });
      }
    } catch (error) {
      console.error("❌ Error en la petición:", error);
      setErrors({ general: "⚠️ Error de conexión con el servidor" });
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="hidden md:flex w-1/2 h-full bg-gray-100 items-center justify-center">
        <img
          src={imgRegister}
          alt="Registro"
          className="w-full h-full object-cover"
        />
      </div>

      
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white shadow-md rounded-[15px] p-6">
          <h1 className="text-2xl font-semibold text-center mb-4">Crea una cuenta</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-left font-medium mb-1">Nombre</label>
              <input
                className="w-full border border-[#F5F5F5] rounded-[15px] p-2"
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-left font-medium mb-1">Email</label>
              <input
                className="w-full border border-[#F5F5F5] rounded-[15px] p-2"
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Ingresa tu email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-left font-medium mb-1">Contraseña</label>
              <input
                className="w-full border border-[#F5F5F5] rounded-[15px] p-2"
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Ingresa una contraseña"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="password_confirmation" className="block text-left font-medium mb-1">Confirmar contraseña</label>
              <input
                className="w-full border border-[#F5F5F5] rounded-[15px] p-2"
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={userData.password_confirmation}
                onChange={handleChange}
                placeholder="Repite tu contraseña"
              />
              {errors.password_confirmation && (
                <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2392F7] text-white py-2 rounded-[15px] hover:bg-[#1d7de0] transition"
            >
              {loading ? "Enviando..." : "Registrar"}
            </button>

            <p className="text-center text-sm mt-3">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="text-[#2392F7] hover:text-[#1d7de0] font-medium"
              >
                Inicia sesión
              </Link>
            </p>

            {errors.general && <p className="text-red-500 text-center mt-2">{errors.general}</p>}
            {success && <p className="text-green-600 text-center mt-2">{success}</p>}

            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
