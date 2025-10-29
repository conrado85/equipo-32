

const Footer = () => {
  return (
    <footer className="footer bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <h3 className="font-bold text-2xl text-blue-400">SaludOne</h3>
            <p className="text-gray-300 leading-relaxed">
              Conectamos pacientes y médicos en una plataforma de salud digital 
              innovadora, segura y eficiente.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <img src="/icons/facebook.png" alt="Facebook" className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <img src="/icons/instagram.png" alt="Instagram" className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <img src="/icons/gorjeo.png" alt="X" className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h6 className="footer-title text-white font-semibold mb-4">Navegación</h6>
            <div className="space-y-2">
              <a href="/" className="block text-gray-300 hover:text-blue-400 transition-colors">Inicio</a>
              <a href="/#about" className="block text-gray-300 hover:text-blue-400 transition-colors">Sobre Nosotros</a>
              <a href="/preguntas-frecuentes" className="block text-gray-300 hover:text-blue-400 transition-colors">Preguntas Frecuentes</a>
              <a href="/contacto" className="block text-gray-300 hover:text-blue-400 transition-colors">Contacto</a>
            </div>
          </div>

          {/* Soluciones */}
          <div>
            <h6 className="footer-title text-white font-semibold mb-4">Soluciones</h6>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Videoconsultas</a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Historial médico</a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Registro rápido</a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Gestión de citas</a>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h6 className="footer-title text-white font-semibold mb-4">Contacto</h6>
            <div className="space-y-2">
              <p className="text-gray-300">saludone@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Línea divisoria y copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} SaludOne. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
