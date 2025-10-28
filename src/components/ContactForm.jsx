import React, { useState } from "react";
import imagenDoctor from "../assets/hermosa-joven-doctora-mirando-camara-oficina.svg"; // Asegúrate de importar correctamente
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
    // Solo dígitos
    const longitudValida = telefono.length >= 7 && telefono.length <= 15; // Rango de caracteres

    const formatoPermitido = /^[\d+-]+$/.test(telefono); // Al menos uno de los dos símbolos

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
        "Debe contener solo números y/o el simbolo + o -, tener entre 7 y 15 caracteres ."
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
      className="flex flex-row items-start justify-center pt-30 pb-10 gap-[250px] bg-[#D9F2FF] "
    >
      {/* Imagen a la izquierda */}
      <div className="hidden md:block w-[300px] h-auto self-center">
        <img
          src={imagenDoctor}
          alt="Profesional de salud"
          className="w-[368px] h-auto object-cover rounded-lg"
        />
      </div>

      {/* Formulario */}
      <div className="w-[464px] flex flex-col gap-[40px] ">
        <div className="block md:hidden w-[150px] h-auto self-center">
          <img
            src={imagenDoctor}
            alt="Profesional de salud"
            className="w-[368px] h-auto object-cover rounded-lg"
          />
        </div>

        <h2 className="font-[nunito]  text-[36px] leading-[48px] text-center text-[#080808] my-[0] ">
          Descubre más sobre <br /> nuestras soluciones!
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[30px] items-center"
        >
          <input
            type="text"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            className="w-full h-[50px] bg-[transparent] border border-[#717171] rounded-[15px] px-[17px] font-[nunito] font-semibold text-[16px] text-[#717171]"
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full h-[50px] bg-[transparent] border border-[#717171] rounded-[15px] px-[17px] font-[nunito] text-[16px] text-[#717171]"
          />

          <input
            type="tel"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={(e) =>
              setFormData({ ...formData, telefono: e.target.value })
            }
            className="w-full h-[50px] bg-[transparent] border border-[#717171] rounded-[15px] px-[17px] font-[nunito] text-[16px] text-[#717171]"
          />

          <textarea
            placeholder="Mensaje"
            value={formData.mensaje}
            onChange={(e) =>
              setFormData({ ...formData, mensaje: e.target.value })
            }
            className="w-full h-[50px] bg-[transparent] border border-[#717171] rounded-[15px] px-[17px] py-[10px] font-[nunito] text-[16px] text-[#717171] resize-none"
          />

          <button
            type="submit"
            className="border-none flex justify-center items-center w-[191px] h-[50px] bg-gradient-to-b from-[#2392F7] to-[#1275E3] rounded-[15px] font-[nunito] text-[18px] text-[white] leading-[24px] py-[0]"
          >
            Enviar mensaje
          </button>

          {error && (
            <p className="text-[red] font-nunito text-sm mt-[0]">{error}</p>
          )}
          {enviado && (
            <p className="text-[green] font-nunito text-sm mt-[0]">
              ¡Mensaje enviado con éxito!
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
