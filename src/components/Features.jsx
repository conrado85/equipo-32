import imgFeature from "../../public/about.jpg";

function Features() {
  const features = [
    {
      title: "Agenda tus citas facilmente.",
      description:
        "Programa tus consultas medicas en segundos.Elige fecha, hora y especialista desde tu celular.",
      functionality: "Crea tu cuenta.",
      img: imgFeature,
    },
    {
      title: "Videoconsultas seguras y rapidas.",
      description:
        "Conecta con tu médico desde cualquier lugar.100% confidencial y seguro.",
      functionality: "Videoconsultas.",
      img: imgFeature,
    },
    {
      title: "Toda  tu información en un solo lugar.",
      description:
        "Accede a tu historial clínico, recetas y estudios cuando los necesites.",
      functionality: "Historial médico.",
      img: imgFeature,
    },
  ];

  return (
    <section>
      <div className="flex flex-col text-center w-full h-full mb-20">
        <h2 className="text-3xl font-bold m-4">Principales Funcionalidades</h2>
        <p className=" m-2 lg:text-xl lg:font-semibold">
          "Cada funcionalidad esta pensada para mejorar la conexion, <br /> la
          eficiencia y la experiencia en salud digital."
        </p>
        <div className="flex flex-row m-20 justify-center gap-10 flex-wrap">
          {features.map((feature, index) => (
            <div
              className="card bg-[#2392F7] w-80 shadow-sm rounded-[60px] text-white"
              key={index}
            >
              <figure>
                <img
                  key={index}
                  src={feature.img}
                  alt={feature.title}
                  className="h-[90%] w-[90%] rounded-[60px]"
                />
              </figure>
              <div className="card-body  text-start">
                <h3>{feature.functionality}</h3>
                <h2 className="card-title">{feature.title}</h2>
                <p>{feature.description}</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Ver mas</div>
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
