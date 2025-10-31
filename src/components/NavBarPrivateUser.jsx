import { Link } from "react-router-dom";

function NavbarPrivateUser() {
  return (
    <div className="navbar bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 px-4 lg:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box z-50 mt-3 w-52 p-2 shadow-xl border border-gray-100"
          >
            <li>
              <Link
                to="user/profile"
                className="hover:bg-blue-50 hover:text-blue-600"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/contacto"
                className="hover:bg-blue-50 hover:text-blue-600"
              >
                Atencion medica
              </Link>
            </li>
            <li>
              <Link
                to="/preguntas-frecuentes"
                className="hover:bg-blue-50 hover:text-blue-600"
              >
                Tramites
              </Link>
            </li>
            <li>
              <Link
                to="/user/appointments"
                className="hover:bg-blue-50 hover:text-blue-600"
              >
                Solicitar Turno
              </Link>
            </li>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="mt-auto bg-transparent hover:bg-red-600 hover:text-white p-2 rounded-xl transition text-red-600 border border-red-600 font-semibold"
            >
              cerrar sesion
            </button>
          </ul>
        </div>
        <Link
          className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          to="/"
        >
          SaludOne
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-6">
          <li>
              <Link
                to="/user/profile"
                className="hover:bg-blue-50 hover:text-blue-600"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:bg-blue-50 hover:text-blue-600"
              >
                Atencion medica
              </Link>
            </li>
            <li>
              <Link
                to="/#"
                className="hover:bg-blue-50 hover:text-blue-600"
              >
                Tramites
              </Link>
            </li>
            <li>
              <Link
                to="/user/appointments"
                className="hover:bg-blue-50 hover:text-blue-600"
              >
                Solicitar Turno
              </Link>
            </li>
        </ul>
      </div>

      <div className="navbar-end space-x-3">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="mt-auto bg-transparent hover:bg-red-600 hover:text-white p-2 rounded-xl transition text-red-600 border border-red-600 font-semibold"
        >
          cerrar sesion
        </button>
      </div>
    </div>
  );
}

export default NavbarPrivateUser;
