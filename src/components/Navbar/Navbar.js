import React, { useState } from 'react';
import styles from './Navbar.module.css';
import logo from './logo.png'; // Asegúrate de tener el logo correcto

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubmenu = (submenu) => {
    if (openSubmenu === submenu) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(submenu);
    }
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo y título */}
      <div className={styles.logoTitle}>
        <img src={logo} alt="Logo" />
        <h1>Portal de Carteles Científicos</h1>
      </div>

      {/* Ícono de hamburguesa visible en móvil */}
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      {/* Menú */}
      <ul className={`${styles.navList} ${isMenuOpen ? styles.navListOpen : ''}`}>
        <li><a href="#home">Inicio</a></li>
        <li>
          <a href="/Nosotros" onClick={() => toggleSubmenu('acercaDeNosotros')}>
            Acerca de Nosotros
          </a>
        </li>
        <li>
          <a href="#about" onClick={() => toggleSubmenu('politicas')}>
            Políticas de Publicación
          </a>
          {/* Submenú de Políticas de Publicación con 9 opciones */}
          <ul className={`${styles.submenu} ${openSubmenu === 'politicas' ? styles.submenuOpen : ''}`}>
            <li><a href="/declaracion-acceso-abierto">Declaración de Acceso Abierto</a></li>
            <li><a href="/DerechosAutoresLectores">Derechos de los Autores y Lectores</a></li>
            <li><a href="/EvaluacionAbierta">Evaluación Abierta</a></li>
            <li><a href="/LicenciasPublicacion">Licencias de Publicación</a></li>
            <li><a href="/Comunicacion">Comunicación</a></li>
            <li><a href="/Antiplagio">Antiplagio</a></li>
            <li><a href="/CriteriosEticosPublicacion">Criterios Eticos de Publicación</a></li>
            <li><a href="/DeclaracionPrivacidad">Declaración de Privacidad</a></li>
            <li><a href="/ReferenciasBibliograficas">Referencias Bibliográficas</a></li>
          </ul>
        </li>
        <li>
          <a href="#about" onClick={() => toggleSubmenu('nosotros')}>
            Servicios
          </a>
          <ul className={`${styles.submenu} ${openSubmenu === 'nosotros' ? styles.submenuOpen : ''}`}>
            <li><a href="#team">Sala</a></li>
            <li><a href="#mission">Cursos</a></li>
            <li><a href="#mission">Diseños</a></li>
            <li><a href="#mission">Redacción y Publicación</a></li>
            <li><a href="#mission">Normas APA</a></li>
            <li><a href="#mission">Criterios</a></li>
          </ul>
        </li>
        <li>
          <a href="#about" onClick={() => toggleSubmenu('nosotros')}>
            Galería
          </a>
          <ul className={`${styles.submenu} ${openSubmenu === 'nosotros' ? styles.submenuOpen : ''}`}>
            <li><a href="#team">Sala</a></li>
            <li><a href="#mission">Cursos</a></li>
          </ul>
        </li>
        <li>
          <a href="#about" onClick={() => toggleSubmenu('nosotros')}>
            Ingresar
          </a>
          <ul className={`${styles.submenu} ${openSubmenu === 'nosotros' ? styles.submenuOpen : ''}`}>
            <li><a href="/Login">Ingresar</a></li>
            <li><a href="/Resgister">Crear Perfil</a></li>
            <li><a href="#mission">Editar Perfil</a></li>
            <li><a href="#mission">Agregar Cartel</a></li>
            <li><a href="#mission">Salir</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
