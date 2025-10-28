import img1 from "../../public/about.jpg";
import img2 from "../../public/login.jpg";
import img3 from "../../public/hero.jpg";

function Features() {
  const features = [
    {
      title: "Agenda tus citas facilmente.",
      description:
        "Programa tus consultas medicas en segundos.Elige fecha, hora y especialista desde tu celular.",
      functionality: "Crea tu cuenta.",
      img: img3,
    },
    {
      title: "Videoconsultas seguras y rapidas.",
      description:
        "Conecta con tu médico desde cualquier lugar.100% confidencial y seguro.",
      functionality: "Videoconsultas.",
      img: img1,
    },
    {
      title: "Toda  tu información en un solo lugar.",
      description:
        "Accede a tu historial clínico, recetas y estudios cuando los necesites.",
      functionality: "Historial médico.",
      img: img2,
    },
  ];

  return (
    <section>
      <div className="flex flex-col text-center w-full h-full mb-20 pt-20">
        <h2 className="text-5xl font-bold m-4">Principales Funcionalidades</h2>
        <p className=" m-2 lg:text-xl lg:font-semibold">
          "Cada funcionalidad esta pensada para mejorar la conexion, <br /> la
          eficiencia y la experiencia en salud digital."
        </p>

        <div className="flex flex-row m-10 justify-center gap-9 flex-wrap">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-[#2392F7] shadow-lg rounded-2xl text-white 
                 w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)]
                 max-w-xs transition duration-300 hover:shadow-xl"
            >
              <figure className="h-48">
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
              </figure>

              <div className="card-body p-5 text-left space-y-2 ">
                <h3 className="text-sm font-semibold uppercase opacity-80">
                  {feature.functionality}
                </h3>
                <h2 className="text-2xl font-extrabold leading-tight">
                  {feature.title}
                </h2>
                <p className="text-base opacity-90 pb-4">
                  {feature.description}
                </p>

                <div className="pt-2">
                  {/* Aquí se usa un estilo de botón o badge más estándar de Tailwind */}
                  <button className="bg-white text-[#2392F7] font-bold py-2 px-4 rounded-full text-sm hover:bg-gray-100 transition duration-150">
                    Ver más
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
