function Features() {
  const features = [
    {
      title: "Agenda tus citas fácilmente",
      description:
        "Programa tus consultas médicas en segundos. Elige fecha, hora y especialista desde tu celular.",
      functionality: "Crea tu cuenta",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop&crop=center",
      alt: "Persona registrándose en plataforma web"
    },
    {
      title: "Videoconsultas seguras y rápidas",
      description:
        "Conecta con tu médico desde cualquier lugar. 100% confidencial y seguro.",
      functionality: "Videoconsultas",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop&crop=center",
      alt: "Doctor en videoconsulta"
    },
    {
      title: "Toda tu información en un solo lugar",
      description:
        "Accede a tu historial clínico, recetas y estudios cuando los necesites.",
      functionality: "Historial médico",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop&crop=center",
      alt: "Historial médico digital en computadora"
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Principales <span className="text-blue-600">Funcionalidades</span>
          </h2>
          <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-8"></div>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Cada funcionalidad está pensada para mejorar la conexión, la eficiencia 
            y la experiencia en salud digital.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              key={index}
            >
              <div className="text-center mb-6">
                <div className="w-full h-48 rounded-2xl overflow-hidden mb-4">
                  <img
                    src={feature.image}
                    alt={feature.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  {feature.functionality}
                </h3>
              </div>
              
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h2>
              
              <p className="text-gray-600 leading-relaxed mb-6 text-center">
                {feature.description}
              </p>
              
              <div className="text-center">
                <div className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                  Ver más
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
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
