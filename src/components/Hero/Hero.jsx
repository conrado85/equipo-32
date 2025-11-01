import "../Hero/hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="heros flex items-center justify-left">
      <div className="heros-content flex-col lg:ml-44 md:ml-20 xl:w-1/4 lg:w-1/2 md:w-1/2"> 
        <h1 className="mb-6 text-4xl lg:text-6xl font-bold text-left leading-tight">
          Conectamos <span className="text-blue-200">pacientes y médicos</span>{" "}
          en una sola plataforma de salud digital
        </h1>
        
        <p className="mb-8 text-lg lg:text-xl text-white/90 leading-relaxed max-w-lg">
          Simplifica tu experiencia médica con citas virtuales, historiales digitales 
          y teleconsultas seguras desde cualquier lugar.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            className="text-white btn btn-info rounded-xl w-48 hover:scale-105 transition-transform duration-300"
            to="/register"
          >
            Empieza ahora
          </Link>
          <Link
            className="text-white btn btn-outline btn-info rounded-xl w-48 hover:scale-105 transition-transform duration-300"
            to="/#about"
          >
            Conoce más
          </Link>
        </div>
        
        {/* Estadísticas destacadas */}
        <div className="mt-12 grid grid-cols-3 gap-6 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold text-white">1000+</div>
            <div className="text-sm text-white/80">Pacientes</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold text-white">50+</div>
            <div className="text-sm text-white/80">Médicos</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-sm text-white/80">Disponible</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
