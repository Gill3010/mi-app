import React from 'react';
import equipo1 from './images/Farnum.jpeg'; 
import equipo2 from './images/Tania.jpeg';
import equipo3 from './images/Monica.jpeg';
import equipo4 from './images/Israel.jpeg';
import equipo5 from './images/Jose.jpeg';
import equipo6 from './images/Sosimo.jpeg';
import equipo7 from './images/Lourdes.jpeg';

const Nosotros = () => {
  return (
    <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-6 md:p-12 text-white">
      <h2 className="text-4xl font-bold mb-8 text-center">Sobre Nosotros</h2>
      <p className="text-xl mb-12 text-center max-w-3xl mx-auto">
        Bienvenidos a nuestra organización. Somos un equipo comprometido con la investigación y la innovación.
      </p>
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        <div className="bg-white text-gray-800 p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-semibold mb-4">Nuestra Misión</h3>
          <p>Brindar soluciones innovadoras y accesibles a través de la investigación.</p>
        </div>
        <div className="bg-white text-gray-800 p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-semibold mb-4">Nuestra Visión</h3>
          <p>Ser líderes en investigación y desarrollo en nuestra área de especialización.</p>
        </div>
      </section>

      <section className="text-center">
        <h3 className="text-3xl font-bold mb-8">Conoce a Nuestro Equipo</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
            <img 
              src={equipo1} 
              alt="Francisco Farnum" 
              className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full mb-4 transform hover:scale-105 transition-transform duration-300" 
            />
            <h4 className="text-xl font-bold mb-2">Dr. Francisco Farnum</h4>
            <p>Investigador Principal</p>
            <p className="text-blue-600 mt-2">ffarnum@redipai.org</p>
            <p className="mt-1">+507 6675-1782</p>
            <a href="https://orcid.org/0000-0002-5879-2296" className="text-blue-600 hover:underline mt-1">ORCID</a>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
            <img 
              src={equipo2} 
              alt="Tania Kennedy" 
              className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full mb-4 transform hover:scale-105 transition-transform duration-300" 
            />
            <h4 className="text-xl font-bold mb-2">Lcda. Tania Kennedy</h4>
            <p>Gerente Administrativa</p>
            <p className="text-blue-600 mt-2">tkennedy@redipai.org</p>
            <p className="mt-1">+507 6497-5176</p>
            <a href="https://orcid.org/0009-0009-8858-0954" className="text-blue-600 hover:underline mt-1">ORCID</a>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
            <img 
              src={equipo3} 
              alt="Monica Contreras" 
              className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full mb-4 transform hover:scale-105 transition-transform duration-300" 
            />
            <h4 className="text-xl font-bold mb-2">Magister Mónica Contreras</h4>
            <p>Gerente Académica</p>
            <p className="text-blue-600 mt-2">monica.contreras@up.ac.pa </p>
            <p className="mt-1">+507 6773-4854</p>
            <a href="https://orcid.org/0000-0003-0972-6951 " className="text-blue-600 hover:underline mt-1">ORCID</a>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
            <img 
              src={equipo4} 
              alt="Israel Samuels" 
              className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full mb-4 transform hover:scale-105 transition-transform duration-300" 
            />
            <h4 className="text-xl font-bold mb-2">Ing. Israel Samuels</h4>
            <p>Desarrollador Full Stack</p>
            <p className="text-blue-600 mt-2">info@innovaproyectos.org</p>
            <p className="mt-1">+507 6549-8362</p>
            <a href="https://orcid.org/0009-0007-1212-718X" className="text-blue-600 hover:underline mt-1">ORCID</a>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
            <img 
              src={equipo5} 
              alt="Jose Murillo" 
              className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full mb-4 transform hover:scale-105 transition-transform duration-300" 
            />
            <h4 className="text-xl font-bold mb-2">Ing. José Murillo</h4>
            <p>Analista de Sistema y Seguridad Informática</p>
            <p className="text-blue-600 mt-2">jose.murillot@up.ac.pa</p>
            <p className="mt-1">+507 6320-6113</p>
            <a href="https://orcid.org/0009-0007-1212-718X" className="text-blue-600 hover:underline mt-1">ORCID</a>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
            <img 
              src={equipo6} 
              alt="Sosima Poma" 
              className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full mb-4 transform hover:scale-105 transition-transform duration-300" 
            />
            <h4 className="text-xl font-bold mb-2">Dr. Sósimo Poma</h4>
            <p>Evaluador Académico</p>
            <p className="text-blue-600 mt-2">spomag@une.edu.pe</p>
            <p className="mt-1">+51 980-981-906</p>
            <a href="https://orcid.org/ 0000-0002-5999-5212" className="text-blue-600 hover:underline mt-1">ORCID</a>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
            <img 
              src={equipo7} 
              alt="Lourdes Céspedes" 
              className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full mb-4 transform hover:scale-105 transition-transform duration-300" 
            />
            <h4 className="text-xl font-bold mb-2">Dra. Lourdes Céspedes</h4>
            <p>Evaluadora Académica</p>
            <p className="text-blue-600 mt-2">lcespedes@unheval.edu.pe</p>
            <p className="mt-1">+51 948-477-669</p>
            <a href="https://orcid.org/ 0000-0002-4358-8575 " className="text-blue-600 hover:underline mt-1">ORCID</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;
