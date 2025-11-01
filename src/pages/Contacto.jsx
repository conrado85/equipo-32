import React, { useState } from "react";

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    mensaje: "",
  });
  const [error, setError] = useState("");
  const [enviado, setEnviado] = useState(false);

  const validarEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, email, telefono, mensaje } = formData;

    if (!nombre || !email || !mensaje) {
      setError("Los campos nombre, email y mensaje son obligatorios.");
      return;
    }

    if (!validarEmail(email)) {
      setError("El correo electrónico no es válido.");
      return;
    }

    setError("");
    setEnviado(true);

    // Simulación de envío a backend
    setTimeout(() => {
      console.log("Datos enviados:", formData);
    }, 1000);
  };

  const contactInfo = [
    {
      image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=300&h=200&fit=crop&crop=center",
      title: "Email",
      info: "info@saludone.com",
      description: "Respuesta en menos de 24 horas",
      alt: "Icono de email"
    },
    {
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop&crop=center",
      title: "Teléfono",
      info: "+1 (555) 123-4567",
      description: "Lunes a Viernes, 9:00 AM - 6:00 PM",
      alt: "Icono de teléfono"
    },
    {
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=300&h=200&fit=crop&crop=center",
      title: "Chat en Vivo",
      info: "Próximamente",
      description: "Funcionalidad en desarrollo",
      alt: "Icono de chat"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
              <span className="text-blue-600">Contacto</span>
            </h1>
            <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-8"></div>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              ¿Tienes preguntas? ¿Necesitas ayuda? Estamos aquí para ayudarte. 
              Contáctanos y te responderemos lo antes posible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-full h-32 rounded-xl overflow-hidden mb-4">
                    <img
                      src={info.image}
                      alt={info.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-2">
                    {info.info}
                  </p>
                  <p className="text-sm text-gray-600">
                    {info.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Form */}
              <div className="bg-gray-50 rounded-3xl p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Envíanos un mensaje
                </h2>
                <p className="text-gray-600 mb-8">
                  Completa el formulario y nos pondremos en contacto contigo pronto.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        placeholder="Tu nombre completo"
                        value={formData.nombre}
                        onChange={(e) =>
                          setFormData({ ...formData, nombre: e.target.value })
                        }
                        className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Correo electrónico *
                      </label>
                      <input
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.telefono}
                        onChange={(e) =>
                          setFormData({ ...formData, telefono: e.target.value })
                        }
                        className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Empresa/Organización
                      </label>
                      <input
                        type="text"
                        placeholder="Nombre de tu empresa"
                        value={formData.empresa}
                        onChange={(e) =>
                          setFormData({ ...formData, empresa: e.target.value })
                        }
                        className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      placeholder="Cuéntanos cómo podemos ayudarte..."
                      value={formData.mensaje}
                      onChange={(e) =>
                        setFormData({ ...formData, mensaje: e.target.value })
                      }
                      rows={5}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-300"
                  >
                    {enviado ? "✓ Mensaje enviado" : "Enviar mensaje"}
                  </button>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <p className="text-red-600 font-medium text-sm">{error}</p>
                    </div>
                  )}
                  
                  {enviado && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <p className="text-green-600 font-medium text-sm">
                        ¡Mensaje enviado con éxito! Te contactaremos pronto.
                      </p>
                    </div>
                  )}
                </form>
              </div>

              {/* Additional Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    ¿Por qué elegir SaludOne?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Tecnología médica de vanguardia</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Seguridad y privacidad garantizadas</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Soporte técnico especializado</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Implementación rápida y sencilla</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-3">
                    ¿Necesitas una demo personalizada?
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Agenda una demostración gratuita de 30 minutos para ver cómo SaludOne puede transformar tu práctica médica.
                  </p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-medium transition-colors">
                    Solicitar Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contacto;
