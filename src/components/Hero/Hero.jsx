import "../Hero/hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="heros flex items-center justify-left ">
      <div className="heros-content flex-col lg:ml-44 md:ml-20 xl:w-1/4 lg:w-1/2 md:w-1/2"> 
        <h1 className="mb-5 text-5xl font-bold text-left">
          Conectamos <span className="text-primary">pacientes y medicos </span>{" "}
          en una sola plataforma de salud digital
        </h1>
        <Link
          className="text-white btn btn-info rounded-xl m-2 w-48"
          to="/register"
        >
          Empieza ahora
        </Link>
      </div>
    </div>
  );
}

export default Hero;
