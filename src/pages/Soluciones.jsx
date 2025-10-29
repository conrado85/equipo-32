function Soluciones() {
  const solutions = [
    {
      title: "Para Pacientes",
      description: "Accede a atención médica de calidad desde cualquier lugar",
      features: [
        "Agenda citas presenciales y virtuales",
        "Accede a tu historial médico completo",
        "Recibe recetas digitales",
        "Conecta con especialistas certificados",
        "Notificaciones de recordatorios",
        "Chat directo con tu médico"
      ],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop&crop=center",
      alt: "Paciente usando aplicación médica"
    },
    {
      title: "Para Médicos",
      description: "Optimiza tu práctica médica con herramientas digitales",
      features: [
        "Gestión completa de pacientes",
        "Historial médico integrado",
        "Videoconsultas HD seguras",
        "Prescripción digital",
        "Calendario inteligente",
        "Reportes y estadísticas"
      ],
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop&crop=center",
      alt: "Doctor en consulta médica"
    },
    {
      title: "Para Clínicas",
      description: "Moderniza tu centro médico con tecnología avanzada",
      features: [
        "Gestión de múltiples médicos",
        "Sistema de citas automatizado",
        "Facturación integrada",
        "Reportes administrativos",
        "Integración con sistemas existentes",
        "Soporte técnico 24/7"
      ],
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop&crop=center",
      alt: "Clínica médica moderna"
    }
  ];

  const benefits = [
    {
      title: "Ahorro de Tiempo",
      description: "Reduce el tiempo de gestión administrativa hasta en un 70%",
      icon: "⏰"
    },
    {
      title: "Mayor Accesibilidad",
      description: "Acceso a atención médica desde cualquier lugar, 24/7",
      icon: "🌍"
    },
    {
      title: "Mejor Seguimiento",
      description: "Historial completo y seguimiento continuo del paciente",
      icon: "📊"
    },
    {
      title: "Costos Reducidos",
      description: "Reduce costos operativos y mejora la eficiencia",
      icon: "💰"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
              Nuestras <span className="text-blue-600">Soluciones</span>
            </h1>
            <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-8"></div>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              Descubre cómo SaludOne puede transformar la experiencia médica 
              para pacientes, médicos y clínicas.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  <div className="text-center mb-6">
                    <div className="w-full h-48 rounded-2xl overflow-hidden mb-4">
                      <img
                        src={solution.image}
                        alt={solution.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {solution.description}
                    </p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                Beneficios de <span className="text-blue-600">SaludOne</span>
              </h2>
              <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Nuestra plataforma está diseñada para mejorar la eficiencia, 
                accesibilidad y calidad de la atención médica.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              ¿Listo para transformar tu experiencia médica?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Únete a miles de usuarios que ya están disfrutando de una atención médica más eficiente y accesible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/register" 
                className="btn bg-white text-blue-600 hover:bg-gray-100 rounded-xl px-8 py-3 font-medium transition-colors"
              >
                Comenzar Ahora
              </a>
              <a 
                href="/contacto" 
                className="btn btn-outline border-white text-white hover:bg-white hover:text-blue-600 rounded-xl px-8 py-3 font-medium transition-colors"
              >
                Solicitar Demo
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Soluciones;
