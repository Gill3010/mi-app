import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Información del Portal */}
        <div>
          <h3 className="text-xl font-bold mb-3">Portal de Carteles Científicos</h3>
          <p className="text-white">
            El sitio principal para la divulgación de investigaciones científicas. Explora investigaciones y participa en nuestra comunidad.
          </p>
        </div>

        {/* Información de Contacto */}
        <div>
          <h3 className="text-xl font-bold mb-3">Contáctanos</h3>
          <ul className="space-y-2">
            <li><span className="font-semibold">Dirección:</span> Calle Ejemplo 123, Ciudad, País</li>
            <li><span className="font-semibold">Correo Electrónico:</span> contacto@portalcarteles.com</li>
            <li><span className="font-semibold">Teléfono:</span> +123 456 7890</li>
          </ul>
        </div>

        {/* Enlaces a Redes Sociales */}
        <div>
          <h3 className="text-xl font-bold mb-3">Síguenos</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              className="hover:text-blue-300 transition duration-300"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-blue-300 transition duration-300"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              className="hover:text-pink-300 transition duration-300"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Derechos Reservados */}
      <div className="mt-8 border-t border-white pt-6 text-center text-white">
        <p>© 2024 Portal de Carteles Científicos. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
