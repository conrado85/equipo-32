import img1 from "../../../public/login.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import authService from "../../api/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const manejarLogin = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const result = await authService.login(email, password);
      
      if (result.success) {
        setMensaje("✅ Inicio de sesión exitoso");
        window.location.href = "/dashboard/welcome";
      } else {
        setMensaje(`❌ ${result.message}`);
      }
    } catch (error) {
      console.error("Error en el login:", error);
      setMensaje("❌ Credenciales inválidas o error en el servidor.");
    }
  };

  const inputClass =
    "w-full rounded-md bg-white px-4 py-2 my-2 text-base text-gray-900 placeholder:text-gray-400 border border-gray-200 shadow-sm";
  const inputFocus = "focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="min-h-[calc(100vh-64px)] flex">
      <div
        className="hidden md:block md:w-2/3 lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${img1})` }}
      />

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-lg">
          <p className="text-center text-gray-600 mb-4 text-lg font-semibold">
            SaludOne 🩺
          </p>

          <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Iniciar sesión
          </h1>

          <form className="space-y-3" onSubmit={manejarLogin}>
            <label htmlFor="email" className="sr-only">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Correo electrónico"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${inputClass} ${inputFocus}`}
            />

            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputClass} ${inputFocus}`}
            />

            <div className="flex items-center justify-end text-sm">
              <Link to="/forgot" className="text-blue-600 hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              className="w-full text-white btn btn-info rounded-xl m-2"
              type="submit"
            >
              Ingresar
            </button>

            {mensaje && (
              <p className="mt-3 text-center text-sm font-medium text-gray-700">
                {mensaje}
              </p>
            )}

            <p className="text-center text-sm text-gray-600 mt-3">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/register"
                className="font-semibold text-blue-600 hover:underline"
              >
                Regístrate
              </Link>
            </p>

            <button className="w-full btn bg-white text-black rounded-xl border-[#e5e5e5] mt-4">
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="mr-2 inline-block"
              >
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
              </svg>
                Iniciar sesión con Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
