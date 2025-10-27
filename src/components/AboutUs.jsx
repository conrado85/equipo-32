import imgAboutUs from "../../public/about.jpg";

function AboutUs() {
  return (
    <section id="about" name="about" className="about">
      <div className="hero bg-[#D8F2FF] min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse lg:justify-end">
          <img
            src={imgAboutUs}
            alt="About Us"
            className="w-full rounded-3xl md:w-1/2 lg:w-3/8 lg:rounded-[60px] shadow-2xl"
          />
          <div className="w-full text-shadow-black lg:w-1/2 lg:mr-20"> 
            <h1 className="text-xl lg:mb-20 lg:text-5xl font-bold text-center ">
              Sobre SaludOne
            </h1>
            <p className="py-6 max-w-full lg:text-center lg:text-2xl lg:font-semibold">
              SaludOne es una platafoma web que permite a clinicas, medicos y
              paciente coordinar citas presenciales o virtuales.
              realizarteleconsultas seguras y acceder a historiales medicos
              digitalizados. Diseñada para optimizar la experiencia en salud,
              reducir ausencias y conectar profesionales con tecnologia de
              vanguardia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
