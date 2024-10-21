import React, { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';  // Importar NavLink de react-router-dom
import logo from './Logo4.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const toggleSubmenu = useCallback((submenu) => {
    setOpenSubmenu(openSubmenu === submenu ? null : submenu);
  }, [openSubmenu]);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    setOpenSubmenu(null);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-10" />
          <h1 className="text-white text-lg font-bold">Portal de Carteles Científicos</h1>
        </div>

        {/* Ícono de hamburguesa visible en móvil */}
        <div className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          <div className="space-y-1.5 cursor-pointer">
            <span className="block w-8 h-0.5 bg-white"></span>
            <span className="block w-8 h-0.5 bg-white"></span>
            <span className="block w-8 h-0.5 bg-white"></span>
          </div>
        </div>
      </div>

      {/* Menú desplegable en móvil, alineado a la derecha en escritorio */}
      <ul
        className={`${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } md:flex md:space-x-4 md:max-h-full md:opacity-100 md:justify-end md:block overflow-hidden transition-all duration-500 ease-in-out`}
      >
        <li>
          <NavLink to="/" className="block py-2 px-4 text-white hover:bg-purple-600 rounded-md" onClick={closeMenu}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/nosotros" className="block py-2 px-4 text-white hover:bg-purple-600 rounded-md" onClick={closeMenu}>
            Acerca de Nosotros
          </NavLink>
        </li>

        {/* Políticas de Publicación con 9 opciones */}
        <li>
          <a
            href="#politicas"
            className="block py-2 px-4 text-white hover:bg-purple-600 rounded-md"
            onClick={() => toggleSubmenu('politicas')}
          >
            Políticas de Publicación
          </a>
          <ul className={`${openSubmenu === 'politicas' ? 'block' : 'hidden'} bg-gray-700 p-2 space-y-1`}>
            <li><NavLink to="/declaracion-acceso-abierto" className="text-white hover:bg-purple-500 block px-4 py-2">Declaración de Acceso Abierto</NavLink></li>
            <li><NavLink to="/DerechosAutoresLectores" className="text-white hover:bg-purple-500 block px-4 py-2">Derechos de los Autores y Lectores</NavLink></li>
            <li><NavLink to="/EvaluacionAbierta" className="text-white hover:bg-purple-500 block px-4 py-2">Evaluación Abierta</NavLink></li>
            <li><NavLink to="/LicenciasPublicacion" className="text-white hover:bg-purple-500 block px-4 py-2">Licencias de Publicación</NavLink></li>
            <li><NavLink to="/Comunicacion" className="text-white hover:bg-purple-500 block px-4 py-2">Comunicación</NavLink></li>
            <li><NavLink to="/Antiplagio" className="text-white hover:bg-purple-500 block px-4 py-2">Antiplagio</NavLink></li>
            <li><NavLink to="/CriteriosEticosPublicacion" className="text-white hover:bg-purple-500 block px-4 py-2">Criterios Eticos de Publicación</NavLink></li>
            <li><NavLink to="/DeclaracionPrivacidad" className="text-white hover:bg-purple-500 block px-4 py-2">Declaración de Privacidad</NavLink></li>
            <li><NavLink to="/ReferenciasBibliograficas" className="text-white hover:bg-purple-500 block px-4 py-2">Referencias Bibliográficas</NavLink></li>
          </ul>
        </li>

        {/* Servicios con 6 opciones */}
        <li>
          <a
            href="#servicios"
            className="block py-2 px-4 text-white hover:bg-purple-600 rounded-md"
            onClick={() => toggleSubmenu('servicios')}
          >
            Servicios
          </a>
          <ul className={`${openSubmenu === 'servicios' ? 'block' : 'hidden'} bg-gray-700 p-2 space-y-1`}>
            <li><NavLink to="/Salas" className="text-white hover:bg-purple-500 block px-4 py-2">Salas</NavLink></li>
            <li><NavLink to="/Cursos" className="text-white hover:bg-purple-500 block px-4 py-2">Cursos</NavLink></li>
            <li><NavLink to="/Informacion" className="text-white hover:bg-purple-500 block px-4 py-2">Información</NavLink></li>
            <li><NavLink to="/Diseños" className="text-white hover:bg-purple-500 block px-4 py-2">Diseños</NavLink></li>
            <li><NavLink to="/Redaccion" className="text-white hover:bg-purple-500 block px-4 py-2">Redacción</NavLink></li>
            <li><NavLink to="/NormasAPA" className="text-white hover:bg-purple-500 block px-4 py-2">Normas APA</NavLink></li>
            <li><NavLink to="/Eventos" className="text-white hover:bg-purple-500 block px-4 py-2">Eventos</NavLink></li>
          </ul>
        </li>

        {/* Galería con 2 opciones */}
        <li>
          <a
            href="#galeria"
            className="block py-2 px-4 text-white hover:bg-purple-600 rounded-md"
            onClick={() => toggleSubmenu('galeria')}
          >
            Galería
          </a>
          <ul className={`${openSubmenu === 'galeria' ? 'block' : 'hidden'} bg-gray-700 p-2 space-y-1`}>
            <li><NavLink to="/galeria-opcion1" className="text-white hover:bg-purple-500 block px-4 py-2">Galería Opción 1</NavLink></li>
            <li><NavLink to="/GaleriasActuales" className="text-white hover:bg-purple-500 block px-4 py-2">Actuales</NavLink></li>
          </ul>
        </li>

        {/* Ingresar con 5 opciones */}
        <li>
          <a
            href="#ingresar"
            className="block py-2 px-4 text-white hover:bg-purple-600 rounded-md"
            onClick={() => toggleSubmenu('ingresar')}
          >
            Ingresar
          </a>
          <ul className={`${openSubmenu === 'ingresar' ? 'block' : 'hidden'} bg-gray-700 p-2 space-y-1`}>
            <li><NavLink to="/Login" className="text-white hover:bg-purple-500 block px-4 py-2">Ingresar</NavLink></li>
            <li><NavLink to="/registro" className="text-white hover:bg-purple-500 block px-4 py-2">Crear Perfil</NavLink></li>
            <li><NavLink to="/recuperar-cuenta" className="text-white hover:bg-purple-500 block px-4 py-2">Editar Perfil</NavLink></li>
            <li><NavLink to="/recuperar-cuenta" className="text-white hover:bg-purple-500 block px-4 py-2">Cerrar Sesión</NavLink></li>
            <li><NavLink to="/FormularioEnvio" className="text-white hover:bg-purple-500 block px-4 py-2">Formulario</NavLink></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;