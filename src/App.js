import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import SobreNosotros from './components/SobreNosotros/SobreNosotros';
import Perfil from './components/Perfil/Perfil';
import Servicios from './components/Servicios/Servicios';
import Contacto from './components/Contacto/Contacto';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <SobreNosotros />
      <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8 py-10">
        <Perfil 
          nombre="Cristal Tavárez"
          descripcion="Desarrolladora especializada en soluciones frontend."
          imagen="img/Cristal.png"
          cvLink="#"
        />
        <Perfil 
          nombre="Israel Samuels"
          descripcion="Desarrollador backend especializado en soluciones robustas."
          imagen="img/Israel.jpeg"
          cvLink="#"
        />
      </div>
      <Servicios />
      <Contacto />
      <Footer />
    </div>
  );
}

export default App;