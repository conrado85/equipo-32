import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar bg-base-200 shadow-sm z-11">
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
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-11 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/precios">Precios</Link>
            </li>
            <li>
              <Link to="/preguntas-frecuentes">Preguntas Frecuentes</Link>
            </li>
            <li>
              <Link to="/soluciones">soluciones</Link>
            </li>
            <li>
              <Link to="/contacto">Contacto</Link>
            </li>
            <li>
              <Link className="btn btn-soft btn-info rounded-xl m-2" to="/login">Inicio Sesion</Link>
            </li>
            <li>
              <Link className="btn btn-info rounded-xl m-2" to="/register">Crear Cuenta</Link>
            </li>
          </ul>
        </div>
        <Link className="text-xl font-bold" to="/">SaludOne</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/precios">Precios</Link>
          </li>
          <li>
            <Link to="/preguntas-frecuentes">Preguntas Frecuentes</Link>
          </li>
          <li>
            <Link to="/soluciones">soluciones</Link>
          </li>
          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link className="hidden lg:btn btn-soft btn-info lg:rounded-xl m-2" to="/login">Inicio Sesion</Link>
        <Link className="hidden lg:text-white lg:btn btn-info lg:rounded-xl m-2" to="/register">Crear Cuenta</Link>
      </div>
    </div>
  );
}

export default NavBar;
