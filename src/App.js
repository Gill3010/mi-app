import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Metrics from "./components/Metrics/Metrics";
import Navbar from "./components/Navbar/Navbar";
import Slider from "./components/Slider/Slider";
import SearchBar from "./components/SearchBar/SearchBar";
import Resultados from "./components/Resultados/Resultados";
import Footer from "./components/Footer/Footer";
import Nosotros from "./components/Nosotros/Nosotros";
import DeclaracionAccesoAbierto from "./components/DeclaracionAccesoAbierto/DeclaracionAccesoAbierto";
import DerechosAutoresLectores from "./components/DerechosAutoresLectores/DerechosAutoresLectores";
import EvaluacionAbierta from "./components/EvaluacionAbierta/EvaluacionAbierta";
import LicenciasPublicacion from "./components/LicenciasPublicacion/LicenciasPublicacion";
import Comunicacion from "./components/Comunicacion/Comunicacion";
import Antiplagio from "./components/Antiplagio/Antiplagio";
import CriteriosEticosPublicacion from "./components/CriteriosEticosPublicacion/CriteriosEticosPublicacion";
import DeclaracionPrivacidad from "./components/DeclaracionPrivacidad/DeclaracionPrivacidad";
import ReferenciasBibliograficas from "./components/ReferenciasBibliograficas/ReferenciasBibliograficas";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Cursos from "./components/Cursos/Cursos";
import UsoAtlasTi from "./components/UsoAtlasTi/UsoAtlasTi";
import AnalisisDatosCualitativos from "./components/AnalisisDatosCualitativos/AnalisisDatosCualitativos";
import FormularioEnvio from "./components/FormularioEnvio/FormularioEnvio";
import GaleriasActuales from "./components/GaleriasActuales/GaleriasActuales";
import GaleriasAnteriores from "./components/GaleriasAnteriores/GaleriasAnteriores";
import EditarPublicacion from "./components/EditarPublicacion/EditarPublicacion";
import BusquedaSistematizada from "./components/BusquedaSistematizada/BusquedaSistematizada";
import Logout from "./components/Logout/Logout";
import FormularioCrearCurso from "./components/FormularioCrearCurso/FormularioCrearCurso";
import GestionFondos from "./components/GestionFondos/GestionFondos";
import CulturaReciclaje from "./components/CulturaReciclaje/CulturaReciclaje";
import DetallesCurso from "./components/DetallesCurso/DetallesCurso";
import CrearPerfilEstudiante from "./components/CrearPerfilEstudiante/CrearPerfilEstudiante";
import MostrarPerfilEstudiante from "./components/MostrarPerfilEstudiante/MostrarPerfilEstudiante";
import CrearPerfilDocente from "./components/CrearPerfilDocente/CrearPerfilDocente";
import MostrarPerfilDocente from "./components/MostrarPerfilDocente/MostrarPerfilDocente";
import Dashboard from "./components/Dashboard/Dashboard"; // Importación del nuevo componente
import FormularioCrearMateria from "./components/FormularioCrearMateria/FormularioCrearMateria"; // Nuevo componente
import FormularioPrueba from "./components/FormularioPrueba/FormularioPrueba"; // Importa el componente FormularioPrueba
import VerPrueba from "./components/VerPrueba/VerPrueba"; // Importa el nuevo componente VerPrueba

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              {/* Ruta del inicio */}
              <Route
                path="/"
                element={
                  <div>
                    <Slider />
                    <SearchBar />
                    <Metrics />
                  </div>
                }
              />
              {/* Resto de las rutas */}
              <Route path="/resultados" element={<Resultados />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route
                path="/declaracion-acceso-abierto"
                element={<DeclaracionAccesoAbierto />}
              />
              <Route
                path="/DerechosAutoresLectores"
                element={<DerechosAutoresLectores />}
              />
              <Route
                path="/EvaluacionAbierta"
                element={<EvaluacionAbierta />}
              />
              <Route
                path="/LicenciasPublicacion"
                element={<LicenciasPublicacion />}
              />
              <Route path="/Comunicacion" element={<Comunicacion />} />
              <Route path="/Antiplagio" element={<Antiplagio />} />
              <Route
                path="/CriteriosEticosPublicacion"
                element={<CriteriosEticosPublicacion />}
              />
              <Route
                path="/DeclaracionPrivacidad"
                element={<DeclaracionPrivacidad />}
              />
              <Route
                path="/ReferenciasBibliograficas"
                element={<ReferenciasBibliograficas />}
              />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route
                path="/Cursos"
                element={
                  <div>
                    <Cursos />
                    <UsoAtlasTi />
                    <AnalisisDatosCualitativos />
                    <BusquedaSistematizada />
                    <GestionFondos />
                    <CulturaReciclaje />
                  </div>
                }
              />
              <Route path="/FormularioEnvio" element={<FormularioEnvio />} />
              <Route path="/GaleriasActuales" element={<GaleriasActuales />} />
              {/* Ajuste para agregar SearchBar antes de GaleriasAnteriores */}
              <Route
                path="/GaleriasAnteriores"
                element={
                  <div>
                    <SearchBar />
                    <GaleriasAnteriores />
                  </div>
                }
              />
              <Route
                path="/EditarPublicacion"
                element={<EditarPublicacion />}
              />
              <Route path="/Logout" element={<Logout />} />
              <Route path="/crear-curso" element={<FormularioCrearCurso />} />
              <Route
                path="/crear-perfil-estudiante"
                element={<CrearPerfilEstudiante />}
              />
              <Route
                path="/perfil-estudiante"
                element={<MostrarPerfilEstudiante />}
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/crear-perfil-docente"
                element={<CrearPerfilDocente />}
              />
              <Route
                path="/perfil-docente"
                element={<MostrarPerfilDocente />}
              />
              <Route path="/detalles-curso/:id" element={<DetallesCurso />} />
              <Route
                path="/crear-materia"
                element={<FormularioCrearMateria />}
              />
              <Route path="/formulario-prueba" element={<FormularioPrueba />} />
              <Route path="/ver-prueba/:id" element={<VerPrueba />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
