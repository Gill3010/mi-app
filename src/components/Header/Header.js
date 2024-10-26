import React from 'react';

const Header = () => {
  return (
    <header className="bg-[var(--color-azul-oscuro)] text-white p-6 shadow-md fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <img src="/path-to-logo.png" alt="Logo" className="h-12 w-auto" />
        </div>
        <nav>
          <ul className="flex space-x-10 text-lg font-semibold">
            <li>
              <a href="#inicio" className="hover:text-[var(--color-teal)] transition-colors duration-300">
                Inicio
              </a>
            </li>
            <li>
              <a href="#nosotros" className="hover:text-[var(--color-teal)] transition-colors duration-300">
                Nosotros
              </a>
            </li>
            <li>
              <a href="#servicios" className="hover:text-[var(--color-teal)] transition-colors duration-300">
                Servicios
              </a>
            </li>
            <li>
              <a href="#contacto" className="hover:text-[var(--color-teal)] transition-colors duration-300">
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
