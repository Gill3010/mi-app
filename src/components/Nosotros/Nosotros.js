import React from 'react';
import equipo1 from './images/Farnum.jpeg'; // Asegúrate de tener las imágenes correctas
import equipo2 from './images/Tania.jpeg';
import equipo3 from './images/Israel.jpeg';

const Nosotros = () => {
  return (
    <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-4 md:p-8 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Sobre Nosotros</h2>
      <p className="text-lg mb-8 text-center max-w-2xl mx-auto">
        Bienvenidos a nuestra organización. Somos un equipo comprometido con la investigación y la innovación.
      </p>
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white text-gray-800 p-4 md:p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Nuestra Misión</h3>
          <p>Brindar soluciones innovadoras y accesibles a través de la investigación.</p>
        </div>
        <div className="bg-white text-gray-800 p-4 md:p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Nuestra Visión</h3>
          <p>Ser líderes en investigación y desarrollo en nuestra área de especialización.</p>
        </div>
      </section>

      <section className="text-center">
        <h3 className="text-2xl font-bold mb-6">Conoce a Nuestro Equipo</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <img 
              src={equipo1} 
              alt="Francisco Farnum" 
              className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full mb-4" 
            />
            <h4 className="text-xl font-bold mb-2">Dr. Francisco Farnum</h4>
            <p>Investigador Principal</p>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <img 
              src={equipo2} 
              alt="Tania Kennedy" 
              className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full mb-4" 
            />
            <h4 className="text-xl font-bold mb-2">Lcda. Tania Kennedy</h4>
            <p>Gerente General</p>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <img 
              src={equipo3} 
              alt="Israel Samuels" 
              className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full mb-4" 
            />
            <h4 className="text-xl font-bold mb-2">Ing. Israel Samuels</h4>
            <p>Desarrollador Full-Stack</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;