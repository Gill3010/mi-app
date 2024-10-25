const SobreNosotros = () => {
  return (
    <section id="nosotros" className="relative bg-[#2a4aa8] text-white py-16 lg:py-32 wave-bottom">
      <div className="container mx-auto px-8 lg:px-0 flex flex-col lg:flex-row items-center justify-between">
        {/* Texto sobre nosotros */}
        <div className="lg:w-1/2 text-left mb-12 lg:mb-0">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6 leading-tight">
            Sobre <span className="text-[var(--color-teal)]">nosotros</span>
          </h2>
          <p className="text-base lg:text-xl leading-relaxed mb-6 lg:mb-10">
            Somos un equipo de dos desarrolladores apasionados por la innovación en el desarrollo web. Nos especializamos en crear soluciones personalizadas que se adaptan a las necesidades de nuestros clientes, utilizando tecnologías modernas y prácticas de vanguardia. Nuestro compromiso es ofrecer resultados de alta calidad y una experiencia excepcional, transformando ideas en realidades digitales.
          </p>
          <button className="bg-[var(--color-teal)] text-white px-8 py-3 rounded-md hover:bg-teal-600 transition-colors duration-300">
            ¡Conócenos!
          </button>
        </div>

        {/* Imagen sobre nosotros */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <img src="img/SobreNosotros.webp" alt="Sobre nosotros" className="w-72 h-auto object-contain mt-10 lg:mt-0" />
        </div>
      </div>

      {/* Forma ondulada con una clase extra */}
      <div className="absolute bottom-0 left-0 right-0 h-24 wave-bottom">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#2a4aa8"
            fillOpacity="1"
            d="M0,192L80,186.7C160,181,320,171,480,176C640,181,800,203,960,213.3C1120,224,1280,224,1360,224L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default SobreNosotros;
