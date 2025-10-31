import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 px-4 lg:px-8">
      <div className="navbar-start flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <img src="icons/logo.svg" alt="SaludOne logo" className="h-8 w-auto" />
          <span className="hidden sm:inline text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            SaludOne
          </span>
        </Link>
      </div>

      {/* 🔹 CENTRO: menú de escritorio */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-6">
          <li>
            <Link
              to="/#about"
              className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg px-4 py-2 transition-colors font-medium text-base"
            >
              Sobre Nosotros
            </Link>
          </li>
          <li>
            <Link
              to="/preguntas-frecuentes"
              className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg px-4 py-2 transition-colors font-medium text-base"
            >
              Preguntas Frecuentes
            </Link>
          </li>
          <li>
            <Link
              to="/soluciones"
              className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg px-4 py-2 transition-colors font-medium text-base"
            >
              Soluciones
            </Link>
          </li>
          <li>
            <Link
              to="/contacto"
              className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg px-4 py-2 transition-colors font-medium text-base"
            >
              Contacto
            </Link>
          </li>
        </ul>
      </div>

      {/* 🔹 DERECHA: botones y menú móvil */}
      <div className="navbar-end space-x-3">
        {/* Botones visibles solo en escritorio */}
        <Link
          className="hidden lg:flex btn btn-outline border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl hover:scale-105 transition-all duration-300 font-medium px-6"
          to="/login"
        >
          Iniciar Sesión
        </Link>
        <Link
          className="hidden lg:flex btn bg-blue-600 hover:bg-blue-700 text-white rounded-xl hover:scale-105 transition-all duration-300 font-medium px-6"
          to="/register"
        >
          Crear Cuenta
        </Link>

        {/* Menú hamburguesa visible solo en móviles */}
        <div className="dropdown dropdown-end lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box z-50 mt-3 w-52 p-2 shadow-xl border border-gray-100"
          >
            <li>
              <Link to="/#about">Sobre Nosotros</Link>
            </li>
            <li>
              <Link to="/preguntas-frecuentes">Preguntas Frecuentes</Link>
            </li>
            <li>
              <Link to="/soluciones">Soluciones</Link>
            </li>
            <li>
              <Link to="/contacto">Contacto</Link>
            </li>
            <li className="pt-2">
              <Link className="btn btn-outline btn-info rounded-xl w-full" to="/login">
                Iniciar Sesión
              </Link>
            </li>
            <li>
              <Link className="btn btn-info rounded-xl w-full text-white" to="/register">
                Crear Cuenta
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
