import React, { useState, useCallback, useEffect } from "react"; // Asegúrate de importar useEffect
import { NavLink } from "react-router-dom";
import logo from "./Logo4.png";
import { auth, db } from "../../config/firebaseConfig"; // Asegúrate de tener acceso a auth y db
import { doc, getDoc } from "firebase/firestore";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [openNestedSubmenu, setOpenNestedSubmenu] = useState(null);
  const [userRole, setUserRole] = useState(null); // Estado para almacenar el rol del usuario

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const toggleSubmenu = useCallback(
    (submenu) => {
      setOpenSubmenu(openSubmenu === submenu ? null : submenu);
      setOpenNestedSubmenu(null); // Cierra los submenús anidados al cambiar de submenú principal
    },
    [openSubmenu]
  );

  const toggleNestedSubmenu = useCallback(
    (nestedSubmenu) => {
      setOpenNestedSubmenu(
        openNestedSubmenu === nestedSubmenu ? null : nestedSubmenu
      );
    },
    [openNestedSubmenu]
  );

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    setOpenSubmenu(null);
    setOpenNestedSubmenu(null);
  }, []);

  // Obtener el rol del usuario desde Firestore cuando el componente se monta
  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        // Obtener el rol del usuario desde Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserRole(userData.role); // Guarda el rol en el estado
        }
      }
    };

    fetchUserRole();
  }, []);

  return (
    <nav className="relative bg-gradient-to-r from-[#1E3A8A] to-[#4CAF50] p-4">
      <div className="absolute top-2 right-4 text-white text-sm font-bold">
        ISSN L 3072-970X
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-10" />
          <h1 className="text-white text-lg font-bold">
            Portal de Carteles Científicos
          </h1>
        </div>

        <div
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5 cursor-pointer">
            <span className="block w-8 h-0.5 bg-white"></span>
            <span className="block w-8 h-0.5 bg-white"></span>
            <span className="block w-8 h-0.5 bg-white"></span>
          </div>
        </div>
      </div>

      <ul
        className={`${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } md:flex md:space-x-4 md:max-h-full md:opacity-100 md:justify-end md:block overflow-hidden transition-all duration-500 ease-in-out`}
      >
        <li>
          <NavLink
            to="/"
            className="block py-2 px-4 text-white hover:bg-[#006D5B] rounded-md"
            onClick={closeMenu}
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/nosotros"
            className="block py-2 px-4 text-white hover:bg-[#006D5B] rounded-md"
            onClick={closeMenu}
          >
            Acerca de Nosotros
          </NavLink>
        </li>

        {/* Submenú de Políticas de Publicación */}
        <li>
          <a
            href="#politicas"
            className="block py-2 px-4 text-white hover:bg-[#006D5B] rounded-md"
            onClick={() => toggleSubmenu("politicas")}
          >
            Políticas de Publicación
          </a>
          <ul
            className={`${
              openSubmenu === "politicas" ? "block" : "hidden"
            } bg-gray-800 p-2 space-y-1`}
          >
            <li>
              <NavLink
                to="/declaracion-acceso-abierto"
                className="text-white hover:bg-[#005073] block px-4 py-2"
              >
                Declaración de Acceso Abierto
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/DerechosAutoresLectores"
                className="text-white hover:bg-[#005073] block px-4 py-2"
              >
                Derechos de los Autores y Lectores
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/EvaluacionAbierta"
                className="text-white hover:bg-[#005073] block px-4 py-2"
              >
                Evaluación Abierta
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/LicenciasPublicacion"
                className="text-white hover:bg-[#005073] block px-4 py-2"
              >
                Licencias de Publicación
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Comunicacion"
                className="text-white hover:bg-[#005073] block px-4 py-2"
              >
                Comunicación
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Antiplagio"
                className="text-white hover:bg-[#005073] block px-4 py-2"
              >
                Antiplagio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/CriteriosEticosPublicacion"
                className="text-white hover:bg-[#005073] block px-4 py-2"
              >
                Criterios Éticos de Publicación
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/DeclaracionPrivacidad"
                className="text-white hover:bg-[#005073] block px-4 py-2"
              >
                Declaración de Privacidad
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ReferenciasBibliograficas"
                className="text-white hover:bg-[#005073] block px-4 py-2"
              >
                Referencias Bibliográficas
              </NavLink>
            </li>
            {/* Menu Politicas de Publicación */}
          </ul>
        </li>

        {/* Submenú de Servicios */}
        <li>
          <a
            href="#servicios"
            className="block py-2 px-4 text-white hover:bg-[#006D5B] rounded-md"
            onClick={() => toggleSubmenu("servicios")}
          >
            Servicios
          </a>
          <ul
            className={`${
              openSubmenu === "servicios" ? "block" : "hidden"
            } bg-gray-800 p-2 space-y-1`}
          >
            <li>
              <a
                href="#cursostecnicos"
                className="text-white hover:bg-[#005073] block px-4 py-2"
                onClick={() => toggleNestedSubmenu("cursostecnicos")}
              >
                Cursos Técnicos
              </a>
              <ul
                className={`${
                  openNestedSubmenu === "cursostecnicos" ? "block" : "hidden"
                } bg-gray-700 p-2 space-y-1 ml-4`}
              >
                <li>
                  <NavLink
                    to="/Cursos"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Cursos ?
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cursos/curso1"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 1
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cursos/curso2"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 2
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cursos/curso3"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 3
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cursos/curso4"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 4
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cursos/curso5"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 5
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <a
                href="#talleres"
                className="text-white hover:bg-[#005073] block px-4 py-2"
                onClick={() => toggleNestedSubmenu("talleres")}
              >
                Talleres
              </a>
              <ul
                className={`${
                  openNestedSubmenu === "talleres" ? "block" : "hidden"
                } bg-gray-700 p-2 space-y-1 ml-4`}
              >
                <li>
                  <NavLink
                    to="/talleres/general"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 1
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/contacto"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 2
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/ubicacion"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 3
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/preguntas"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 4
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/documentos"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 5
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/soporte"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 6
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <a
                href="#seminarios"
                className="text-white hover:bg-[#005073] block px-4 py-2"
                onClick={() => toggleNestedSubmenu("seminarios")}
              >
                Seminarios
              </a>
              <ul
                className={`${
                  openNestedSubmenu === "seminarios" ? "block" : "hidden"
                } bg-gray-700 p-2 space-y-1 ml-4`}
              >
                <li>
                  <NavLink
                    to="/informacion/general"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 1
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/contacto"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 2
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/ubicacion"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 3
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/preguntas"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 4
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/documentos"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 5
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/soporte"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 6
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <a
                href="#diplomados"
                className="text-white hover:bg-[#005073] block px-4 py-2"
                onClick={() => toggleNestedSubmenu("diplomados")}
              >
                Diplomados
              </a>
              <ul
                className={`${
                  openNestedSubmenu === "diplomados" ? "block" : "hidden"
                } bg-gray-700 p-2 space-y-1 ml-4`}
              >
                <li>
                  <NavLink
                    to="/informacion/general"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 1
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/contacto"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 2
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/ubicacion"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 3
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/preguntas"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 4
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/documentos"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 5
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/soporte"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 6
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <a
                href="#programas"
                className="text-white hover:bg-[#005073] block px-4 py-2"
                onClick={() => toggleNestedSubmenu("programas")}
              >
                Programas
              </a>
              <ul
                className={`${
                  openNestedSubmenu === "programas" ? "block" : "hidden"
                } bg-gray-700 p-2 space-y-1 ml-4`}
              >
                <li>
                  <NavLink
                    to="/informacion/general"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 1
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/contacto"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 2
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/ubicacion"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 3
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/preguntas"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 4
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/documentos"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 5
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/soporte"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 6
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <a
                href="#postgrados"
                className="text-white hover:bg-[#005073] block px-4 py-2"
                onClick={() => toggleNestedSubmenu("postgrados")}
              >
                Postgrados
              </a>
              <ul
                className={`${
                  openNestedSubmenu === "postgrados" ? "block" : "hidden"
                } bg-gray-700 p-2 space-y-1 ml-4`}
              >
                <li>
                  <NavLink
                    to="/informacion/general"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 1
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/contacto"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 2
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/ubicacion"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 3
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/preguntas"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 4
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/documentos"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 5
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/informacion/soporte"
                    className="text-white hover:bg-[#003D4C] block px-4 py-2"
                  >
                    Sub-Categoría 6
                  </NavLink>
                </li>
              </ul>
            </li>

            <li>
              <NavLink
                to="/FormularioEnvio"
                className="text-white hover:bg-[#005073] block px-4 py-2"
              >
                Crear Galería
              </NavLink>
            </li>
          </ul>
        </li>

        {/* Submenú de Galería */}
        <li>
          <a
            href="#galeria"
            className="block py-2 px-4 text-white hover:bg-[#006D5B] rounded-md"
            onClick={() => toggleSubmenu("galeria")}
          >
            Galerías
          </a>
          <ul
            className={`${
              openSubmenu === "galeria" ? "block" : "hidden"
            } bg-gray-800 p-2 space-y-1`}
          >
            <li>
              <NavLink
                to="/GaleriasActuales"
                className="text-white hover:bg-[#005073] block px-4 py-2"
              >
                Actuales
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/GaleriasAnteriores"
                className="text-white hover:bg-[#005073] block px-4 py-2"
              >
                II Encuentro de Investigaciones Cualitativas
              </NavLink>
            </li>
            {/* Contenido existente */}
          </ul>
        </li>

        {/* Submenú de Ingresar */}
        <li>
          <a
            href="#ingresar"
            className="block py-2 px-4 text-white hover:bg-[#006D5B] rounded-md"
            onClick={() => toggleSubmenu("ingresar")}
          >
            Ingresar
          </a>
          <ul
            className={`${
              openSubmenu === "ingresar" ? "block" : "hidden"
            } bg-gray-800 p-2 space-y-1`}
          >
            <li>
              <NavLink
                to="/Login"
                className="text-white hover:bg-[#005073] block px-4 py-2"
              >
                Ingresar
              </NavLink>
            </li>
            <li>
              <NavLink
                to={
                  userRole === "Docente"
                    ? "/perfil-docente"
                    : "/perfil-estudiante"
                }
                className="text-white hover:bg-[#005073] block px-4 py-2"
              >
                Ver mi Perfil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Logout"
                className="text-white hover:bg-[#005073] block px-4 py-2"
              >
                Cerrar Sesión
              </NavLink>
            </li>
            {/* Contenido existente */}
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
