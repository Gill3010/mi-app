const Hero = () => {
  return (
    <section className="relative bg-[var(--color-azul-oscuro)] text-white py-32 lg:py-40">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        {/* Contenedor izquierdo con el texto y los iconos sociales */}
        <div className="text-center lg:text-left max-w-lg mb-8 lg:mb-0">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">¡Hola! 👋</h1>
          <p className="text-lg lg:text-xl mb-6">
            Somos Pedro y Marciela, un equipo de desarrolladores especializados en frontend y backend.
          </p>
          <div className="flex justify-center lg:justify-start space-x-4">
            <a href="#" className="text-[var(--color-teal)] hover:text-white transition-colors duration-300">
              <i className="fab fa-github text-3xl"></i>
            </a>
            <a href="#" className="text-[var(--color-teal)] hover:text-white transition-colors duration-300">
              <i className="fab fa-linkedin text-3xl"></i>
            </a>
            <a href="#" className="text-[var(--color-teal)] hover:text-white transition-colors duration-300">
              <i className="fas fa-file-alt text-3xl"></i>
            </a>
          </div>
        </div>

        {/* Contenedor derecho con las imágenes */}
        <div className="flex justify-center lg:justify-end space-x-8">
          <img
            src="img/Israel.jpeg"
            alt="Israel"
            className="rounded-full w-32 h-32 lg:w-40 lg:h-40 object-cover shadow-lg"
          />
          <img
            src="img/Cristal.png"
            alt="Cristal"
            className="rounded-full w-32 h-32 lg:w-40 lg:h-40 object-cover shadow-lg"
          />
        </div>
      </div>

      {/* SVG para la forma ondulada más pronunciada */}
      <div className="absolute bottom-0 left-0 right-0 h-24">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="var(--color-azul-claro)"
            fillOpacity="1"
            d="M0,224L80,186.7C160,149,320,75,480,106.7C640,139,800,235,960,266.7C1120,299,1280,277,1360,256L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
