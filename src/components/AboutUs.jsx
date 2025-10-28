import imgAboutUs from "../../public/about.jpg";

function AboutUs() {
  return (
    <section className="about">
      <div className="hero bg-white min-h-screen pt-20">
        <div className="hero-content flex-col lg:flex-row-reverse lg:justify-end">
          <img
            src={imgAboutUs}
            alt="About Us"
            className="w-full rounded-3xl md:w-1/2 lg:w-1/4 lg:rounded-3xl shadow-2xl"
          />
          <div className="w-full text-shadow-black lg:w-1/2 lg:mr-20">
            <h1 className="text-xl lg:mb-20 lg:text-5xl font-bold text-center ">
              Sobre SaludOne
            </h1>
            <p className="py-6 max-w-full lg:text-wrap lg:text-2xl lg:font-semibold">
              <span className="text-blue-600"> SaludOne </span>es una plataforma
              web integral que conecta pacientes, médicos y centros de salud en
              un solo lugar. Su objetivo es simplificar la gestión médica y
              mejorar la experiencia de atención tanto presencial como virtual.
              Desde SaludOne, los{" "}
              <span className="text-blue-600">pacientes</span>
              pueden registrarse fácilmente,
              <span className="text-blue-600">
                {" "}
                agendar y modificar citas,
              </span>{" "}
              recibir
              <span className="text-blue-600">
                recordatorios automáticos,
              </span>{" "}
              acceder a su{" "}
              <span className="text-blue-600">historial clínico digital</span>y
              realizar{" "}
              <span className="text-blue-600">
                teleconsultas seguras por videollamada{" "}
              </span>
              sin salir de la web. Los profesionales de la salud cuentan con
              herramientas para administrar su agenda en tiempo real, consultar
              historiales, realizar teleasistencias y llevar un seguimiento
              ordenado de sus pacientes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
