import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Metrics from './components/Metrics/Metrics';
import Navbar from './components/Navbar/Navbar';
import Slider from './components/Slider/Slider';
import SearchBar from './components/SearchBar/SearchBar';
import Resultados from './components/Resultados/Resultados';
import Footer from './components/Footer/Footer';
import Nosotros from './components/Nosotros/Nosotros';
import DeclaracionAccesoAbierto from './components/DeclaracionAccesoAbierto/DeclaracionAccesoAbierto';
import DerechosAutoresLectores from './components/DerechosAutoresLectores/DerechosAutoresLectores';
import EvaluacionAbierta from './components/EvaluacionAbierta/EvaluacionAbierta';
import LicenciasPublicacion from './components/LicenciasPublicacion/LicenciasPublicacion';
import Comunicacion from './components/Comunicacion/Comunicacion';
import Antiplagio from './components/Antiplagio/Antiplagio';
import CriteriosEticosPublicacion from './components/CriteriosEticosPublicacion/CriteriosEticosPublicacion';
import DeclaracionPrivacidad from './components/DeclaracionPrivacidad/DeclaracionPrivacidad';
import ReferenciasBibliograficas from './components/ReferenciasBibliograficas/ReferenciasBibliograficas';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Salas from './components/Salas/Salas';
import Cursos from './components/Cursos/Cursos';
import Informacion from './components/Informacion/Informacion';
import Diseños from './components/Diseños/Diseños';
import Redaccion from './components/Redaccion/Redaccion';
import NormasAPA from './components/NormasAPA/NormasAPA';
import Eventos from './components/Eventos/Eventos';
import FormularioEnvio from './components/FormularioEnvio/FormularioEnvio';
import GaleriasActuales from './components/GaleriasActuales/GaleriasActuales';
import GaleriasAnteriores from './components/GaleriasAnteriores/GaleriasAnteriores';
import EditarPublicacion from './components/EditarPublicacion/EditarPublicacion';
import Logout from './components/Logout/Logout';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route 
                path="/" 
                element={
                  <div>
                    <Slider />
                    <Metrics />
                    <SearchBar />
                  </div>
                } 
              />
              <Route path="/resultados" element={<Resultados />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/declaracion-acceso-abierto" element={<DeclaracionAccesoAbierto />} />
              <Route path="/DerechosAutoresLectores" element={<DerechosAutoresLectores />} />
              <Route path="/EvaluacionAbierta" element={<EvaluacionAbierta />} />
              <Route path="/LicenciasPublicacion" element={<LicenciasPublicacion />} />
              <Route path="/Comunicacion" element={<Comunicacion />} />
              <Route path="/Antiplagio" element={<Antiplagio />} />
              <Route path="/CriteriosEticosPublicacion" element={<CriteriosEticosPublicacion />} />
              <Route path="/DeclaracionPrivacidad" element={<DeclaracionPrivacidad />} />
              <Route path="/ReferenciasBibliograficas" element={<ReferenciasBibliograficas />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Salas" element={<Salas />} />
              <Route path="/Cursos" element={<Cursos />} />
              <Route path="/Informacion" element={<Informacion />} />
              <Route path="/Diseños" element={<Diseños />} />
              <Route path="/Redaccion" element={<Redaccion />} />
              <Route path="/NormasAPA" element={<NormasAPA />} />
              <Route path="/Eventos" element={<Eventos />} />
              <Route path="/FormularioEnvio" element={<FormularioEnvio />} />
              <Route path="/GaleriasActuales" element={<GaleriasActuales />} />
              <Route path="/GaleriasAnteriores" element={<GaleriasAnteriores />} />
              <Route path="/EditarPublicacion" element={<EditarPublicacion />} />
              <Route path="/Logout" element={<Logout />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
