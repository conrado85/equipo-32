import { Link } from "react-router-dom";
import img4 from "../../public/saludone.png";
function NavBar() {
  return (
    <div className="navbar bg-base-200 shadow-sm z-11 fixed top-0 left-0">
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
            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-11 mt-3 w-52 p-2 shadow "
          >
            <li>
              <a href="#about-us">Sobre nosotros</a>
            </li>
            <li>
              <Link to="#features">soluciones</Link>
            </li>
            <li>
              <a href="#contact-form">Contacto</a>
            </li>
            <Link
              className=" btn btn-soft btn-info rounded-xl m-2"
              to="/login"
            >
              Inicio Sesion
            </Link>
            <Link
              className="text-white btn btn-info rounded-xl m-2"
              to="/register"
            >
              Crear Cuenta
            </Link>
          </ul>
        </div>

        <Link to="/">
          <img src={img4} className="w-60 h-12" alt="logo" />
        </Link>
      </div>
      <div className="navbar-center  hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="#about-us">Sobre nosotros</a>
          </li>
          <li>
            <a href="#features">Soluciones</a>
          </li>
          <li>
            <a href="#contact-form">Contacto</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link
          className="hidden lg:btn btn-soft btn-info lg:rounded-xl m-2"
          to="/login"
        >
          Inicio Sesion
        </Link>
        <Link
          className="hidden lg:text-white lg:btn btn-info lg:rounded-xl m-2"
          to="/register"
        >
          Crear Cuenta
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
