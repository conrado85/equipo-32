import imgRegister from '../assets/paciente-femenina-que-asiste-una-consulta-virtual 2.png';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import authService from '../api/authService';

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
      const result = await authService.register(userData);
      
      if (result.success) {
        setSuccess("✅ ¡Usuario registrado con éxito!");
        setUserData({ name: "", email: "", password: "", password_confirmation: "" });
        setErrors({});
      } else {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors({ general: result.message });
        }
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
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Crea una cuenta</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-left font-semibold mb-2 text-gray-700">Nombre</label>
              <input
                className="w-full border-2 border-gray-400 rounded-[15px] p-3 bg-gray-50 focus:border-[#2392F7] focus:bg-white focus:outline-none transition-all shadow-sm placeholder-gray-500"
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
              <label htmlFor="email" className="block text-left font-semibold mb-2 text-gray-700">Email</label>
              <input
                className="w-full border-2 border-gray-400 rounded-[15px] p-3 bg-gray-50 focus:border-[#2392F7] focus:bg-white focus:outline-none transition-all shadow-sm placeholder-gray-500"
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
              <label htmlFor="password" className="block text-left font-semibold mb-2 text-gray-700">Contraseña</label>
              <input
                className="w-full border-2 border-gray-400 rounded-[15px] p-3 bg-gray-50 focus:border-[#2392F7] focus:bg-white focus:outline-none transition-all shadow-sm placeholder-gray-500"
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
              <label htmlFor="password_confirmation" className="block text-left font-semibold mb-2 text-gray-700">Confirmar contraseña</label>
              <input
                className="w-full border-2 border-gray-400 rounded-[15px] p-3 bg-gray-50 focus:border-[#2392F7] focus:bg-white focus:outline-none transition-all shadow-sm placeholder-gray-500"
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

            <p className="text-center text-sm mt-4 text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="text-[#2392F7] hover:text-[#1d7de0] font-semibold"
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
