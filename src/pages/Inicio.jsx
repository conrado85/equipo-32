import Hero from "../components/Hero/Hero";
import AboutUs from "../components/AboutUs";
import Features from "../components/Features";
import ContactForm from "../components/ContactForm";

function Inicio() {
  return (
    <>
      <section className="hero" id="hero">
        <Hero />
      </section>
      <section className="about-us" id="about-us">
        <AboutUs />
      </section>
      <section className="features" id="features">
        <Features />
      </section>
      <section className="contact-form" id="contact-form">
        <ContactForm />
      </section>
    </>
  );
}

export default Inicio;
