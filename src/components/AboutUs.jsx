import imgAboutUs from "../../public/about.jpg";

function AboutUs() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-100">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenido de texto */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  Sobre <span className="text-blue-600">SaludOne</span>
                </h2>
                <div className="w-20 h-1 bg-blue-600 rounded-full"></div>
              </div>
              
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                SaludOne es una plataforma web innovadora que permite a clínicas, médicos y 
                pacientes coordinar citas presenciales o virtuales de manera eficiente.
              </p>
              
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                Realiza teleconsultas seguras y accede a historiales médicos digitalizados. 
                Diseñada para optimizar la experiencia en salud, reducir ausencias y conectar 
                profesionales con tecnología de vanguardia.
              </p>

              {/* Características destacadas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Citas virtuales y presenciales</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Historial médico digital</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Teleconsultas seguras</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Tecnología de vanguardia</span>
                </div>
              </div>
            </div>

            {/* Imagen */}
            <div className="order-1 lg:order-2">
              <img
                src={imgAboutUs}
                alt="Teleconsulta médica con SaludOne"
                className="w-full h-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
