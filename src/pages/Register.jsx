
import { useState } from 'react';

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
    if (userData.password.length < 6) newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    if (userData.password !== userData.password_confirmation) newErrors.password_confirmation = "Las contraseñas no coinciden";
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
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          password_confirmation: userData.password_confirmation,
        }),
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
    <div className="text-center">
      <h1>Regístrese</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name[0] || errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Ingresa tu email"
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email[0] || errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Ingresa una contraseña"
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password[0] || errors.password}</p>}
        </div>

        <div>
          <label htmlFor="password_confirmation">Confirmar contraseña</label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={userData.password_confirmation}
            onChange={handleChange}
            placeholder="Repite tu contraseña"
          />
          {errors.password_confirmation && <p style={{ color: 'red' }}>{errors.password_confirmation[0] || errors.password_confirmation}</p>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Registrar"}
        </button>

        {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </div>
  );
}

export default Register;
