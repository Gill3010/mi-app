import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Slider from './components/Slider/Slider';
import SearchBar from './components/SearchBar/SearchBar';
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
// Nueva página
import './App.css'; // Si necesitas estilos globales

const App = () => {
  const handleSearch = (term) => {
    console.log('Buscando:', term);
    // Aquí iría la lógica de búsqueda, como hacer una solicitud a la API
  };

  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Slider />
                <SearchBar onSearch={handleSearch} />
              </>
            } 
          />
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
        </Routes>
        <Footer />
      </>
    </Router>
  );
};

export default App;
