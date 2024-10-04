import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';  // Importar el Provider de Redux
import store from './redux/store';  // Importar el store de Redux

import Navbar from './components/Navbar/Navbar';
import Slider from './components/Slider/Slider';
import SearchBar from './components/SearchBar/SearchBar';
import Resultados from './components/Resultados/Resultados'; // Importa el componente de Resultados
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
import './App.css'; // Si necesitas estilos globales

const App = () => {
  return (
    <Provider store={store}>  {/* Proveer el store a toda la app */}
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <Slider />
                  <SearchBar />  {/* Eliminar setSearchResults, ya no es necesario */}
                </>
              } 
            />
            <Route path="/resultados" element={<Resultados />} />  {/* Resultados ya no recibe props */}
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
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Register" element={<Register/>}/>
          </Routes>
          <Footer />
        </>
      </Router>
    </Provider>
  );
};

export default App;
