

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
  <aside>
    <p>
     Logo
    </p>
  </aside>
  <nav>
    <h6 className="footer-title">Navegación</h6>
    <a className="link link-hover">Inicio</a>
    <a className="link link-hover">Blog</a>
    <a className="link link-hover">Empleo</a>
    <a className="link link-hover">Contacto</a>
  </nav>
  <nav>
    <h6 className="footer-title">Solución</h6>
    <a className="link link-hover">Videoconsutas</a>
    <a className="link link-hover">Hisotirial médico</a>
    <a className="link link-hover">Registro rápido</a>
  </nav>
  <nav>
  <h6 className="footer-title">Redes</h6>

  <a className="flex items-center gap-2 link link-hover">
    <img src="/icons/instagram.png" alt="Instagram" className="w-5 h-5" />
    Instagram
  </a>

  <a className="flex items-center gap-2 link link-hover">
    <img src="/icons/facebook.png" alt="Facebook" className="w-5 h-5" />
    Facebook
  </a>

  <a className="flex items-center gap-2 link link-hover">
    <img src="/icons/gorjeo.png" alt="X" className="w-5 h-5" />
    X
  </a>
</nav>

</footer>
  )
}

export default Footer
