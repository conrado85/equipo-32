import React, { useState } from "react";
import imagenDoctor from "../assets/hermosa-joven-doctora-mirando-camara-oficina.svg";
import "@fontsource/nunito/600.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [error, setError] = useState("");
  const [enviado, setEnviado] = useState(false);

  const validarEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validarTelefono = (telefono) => {
    const longitudValida = telefono.length >= 7 && telefono.length <= 15;
    const formatoPermitido = /^[\d+-]+$/.test(telefono);
    return longitudValida && formatoPermitido;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, email, telefono, mensaje } = formData;

    if (!nombre || !email || !telefono || !mensaje) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!validarEmail(email)) {
      setError("El correo electrónico no es válido.");
      return;
    }
    if (!validarTelefono(telefono)) {
      setError(
        "El teléfono debe contener solo números y/o el símbolo + o -, tener entre 7 y 15 caracteres."
      );
      return;
    }

    setError("");
    setEnviado(true);

    // Simulación de envío a backend
    setTimeout(() => {
      console.log("Datos enviados:", formData);
    }, 1000);
  };

  return (
    <section
      aria-label="Formulario de Contacto"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Imagen */}
            <div className="order-2 lg:order-1">
              <img
                src={imagenDoctor}
                alt="Profesional de salud"
                className="w-full h-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Formulario */}
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                    Descubre más sobre <br /> 
                    <span className="text-blue-600">nuestras soluciones</span>
                  </h2>
                  <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-6"></div>
                  <p className="text-gray-600 text-lg">
                    ¿Tienes preguntas? Estamos aquí para ayudarte a encontrar la mejor solución para tu clínica.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        placeholder="Tu nombre completo"
                        value={formData.nombre}
                        onChange={(e) =>
                          setFormData({ ...formData, nombre: e.target.value })
                        }
                        className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

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
                      className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mensaje
                    </label>
                    <textarea
                      placeholder="Cuéntanos sobre tu clínica y cómo podemos ayudarte..."
                      value={formData.mensaje}
                      onChange={(e) =>
                        setFormData({ ...formData, mensaje: e.target.value })
                      }
                      rows={4}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
