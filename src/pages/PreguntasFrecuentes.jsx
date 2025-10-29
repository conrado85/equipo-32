import FAQItem from "../components/FAQItem";

function PreguntasFrecuentes() {
  const faqs = [
    {
      question: "¿Cómo puedo crear mi cuenta en SaludOne?",
      answer: "Crear tu cuenta es muy sencillo. Solo necesitas hacer clic en 'Crear Cuenta', completar el formulario con tus datos básicos y verificar tu correo electrónico. El proceso toma menos de 5 minutos y es completamente gratuito."
    },
    {
      question: "¿Es seguro usar SaludOne para mis consultas médicas?",
      answer: "Absolutamente. SaludOne utiliza cifrado de extremo a extremo para todas las videoconsultas y cumple con los más altos estándares de seguridad médica. Tus datos están protegidos y cumplimos con todas las regulaciones de privacidad médica, incluyendo HIPAA."
    },
    {
      question: "¿Puedo agendar citas presenciales y virtuales?",
      answer: "Sí, SaludOne te permite agendar tanto citas presenciales como videoconsultas. Puedes elegir el tipo de consulta que prefieras según tus necesidades y la disponibilidad del médico. Las videoconsultas están disponibles 24/7."
    },
    {
      question: "¿Cómo funciona el historial médico digital?",
      answer: "Tu historial médico se almacena de forma segura en nuestra plataforma. Incluye consultas anteriores, recetas, resultados de estudios y notas médicas. Solo tú y tus médicos autorizados pueden acceder a esta información, y puedes descargar tus registros en cualquier momento."
    },
    {
      question: "¿Qué especialidades médicas están disponibles?",
      answer: "Contamos con médicos de diversas especialidades incluyendo medicina general, pediatría, ginecología, cardiología, dermatología, psicología, nutrición y muchas más. Puedes filtrar por especialidad al buscar médicos y ver sus perfiles profesionales."
    },
    {
      question: "¿Cuánto cuesta usar SaludOne?",
      answer: "SaludOne ofrece diferentes planes para adaptarse a tus necesidades. Tenemos opciones gratuitas con funcionalidades básicas y planes premium con acceso completo a todas las características. Los precios van desde $0 hasta $29.99/mes según el plan seleccionado."
    },
    {
      question: "¿Puedo cancelar o reprogramar una cita?",
      answer: "Sí, puedes cancelar o reprogramar tus citas hasta 24 horas antes de la consulta programada. Esto se puede hacer directamente desde tu panel de usuario o contactando a nuestro servicio al cliente. No hay penalizaciones por cancelaciones con suficiente anticipación."
    },
    {
      question: "¿Funciona SaludOne en dispositivos móviles?",
      answer: "Sí, SaludOne está optimizado para funcionar perfectamente en smartphones y tablets. Puedes descargar nuestra aplicación móvil desde la App Store o Google Play Store para una experiencia aún mejor, con notificaciones push y acceso offline a tu historial."
    },
    {
      question: "¿Qué pasa si tengo problemas técnicos durante una videoconsulta?",
      answer: "Nuestro equipo de soporte técnico está disponible 24/7 para ayudarte. Si experimentas problemas durante una videoconsulta, puedes contactarnos inmediatamente y te ayudaremos a resolver el problema o reprogramar la cita sin costo adicional."
    },
    {
      question: "¿Los médicos en SaludOne están certificados?",
      answer: "Todos los médicos en nuestra plataforma están completamente certificados y licenciados. Verificamos sus credenciales antes de permitirles unirse a nuestra red. Puedes ver las certificaciones y especialidades de cada médico en su perfil profesional."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Preguntas <span className="text-blue-200">Frecuentes</span>
            </h1>
            <div className="w-20 h-1 bg-blue-200 rounded-full mx-auto mb-8"></div>
            <p className="text-lg lg:text-xl text-blue-100 leading-relaxed">
              Encuentra respuestas a las preguntas más comunes sobre SaludOne. 
              Si no encuentras lo que buscas, no dudes en contactarnos.
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="flex">
                  <FAQItem title={faq.question} content={faq.answer} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-12 shadow-xl">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                ¿No encontraste tu respuesta?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nuestro equipo de soporte está aquí para ayudarte. Contáctanos y te responderemos en menos de 24 horas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contacto" 
                  className="btn bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-3 font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Contactar Soporte
                </a>
                <a 
                  href="/register" 
                  className="btn btn-outline border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl px-8 py-3 font-medium transition-all duration-300 hover:scale-105"
                >
                  Crear Cuenta Gratis
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PreguntasFrecuentes;
