import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#002855] to-[#00A1E0] text-white py-10">
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
            <li><span className="font-semibold">Dirección:</span> Río Abajo calle 5ta, Edif. LA QUINTA local C4 Ciudad de Panamá, Panamá</li>
            <li><span className="font-semibold">Correo Electrónico:</span> info@portaldecartelescientificos.org</li>
            <li><span className="font-semibold">Teléfono:</span> +507 6645-7685/+507 208-4689</li>
          </ul>
        </div>

        {/* Enlaces a Redes Sociales */}
        <div>
          <h3 className="text-xl font-bold mb-3">Síguenos</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              className="hover:text-blue-300 transition duration-300"
              aria-label="Facebook"
            >
              <FaFacebook size={30} />
            </a>
            <a
              href="https://x.com"
              className="hover:text-gray-300 transition duration-300"
              aria-label="X"
            >
              <img src="/img/x.png" alt="X Logo" className="w-8 h-8" />
            </a>
            <a
              href="https://instagram.com"
              className="hover:text-pink-300 transition duration-300"
              aria-label="Instagram"
            >
              <FaInstagram size={30} />
            </a>
          </div>
        </div>
      </div>

      {/* Derechos Reservados */}
      <div className="mt-8 border-t border-white pt-6 text-center text-white">
        <p>© 2024 Portal de Carteles Científicos. Todos los derechos reservados.</p>
        <p>ISSN L 3072-970X</p>
      </div>
    </footer>
  );
};

export default Footer;
