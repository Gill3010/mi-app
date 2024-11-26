import React from 'react';

const Eventos = () => {
  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-[#1E3A8A] to-[#4CAF50]">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 shadow-xl">
        Eventos
      </h1>
      <p className="text-lg text-white text-center mb-4">
        Mantente al día con nuestros próximos eventos y actividades importantes.
      </p>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Evento 1 */}
        <div className="bg-white border border-[#002855] shadow-md rounded-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition duration-300">
          <img 
            src="img/Eventos.webp" 
            alt="Evento 1" 
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold text-[#003366] hover:text-[#005073]">
              Conferencia Internacional
            </h2>
            <p className="text-[#5A5A5A] mt-2">
              Participa en nuestra conferencia internacional sobre las últimas investigaciones.
            </p>
            <p className="text-[#005599] mt-2">Fecha: 20 de Octubre</p>
          </div>
        </div>

        {/* Evento 2 */}
        <div className="bg-white border border-[#002855] shadow-md rounded-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition duration-300">
          <img 
            src="img/Eventos.webp" 
            alt="Evento 2" 
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold text-[#003366] hover:text-[#005073]">
              Taller de Innovación
            </h2>
            <p className="text-[#5A5A5A] mt-2">
              Únete a nuestro taller sobre innovación y creatividad en la ciencia.
            </p>
            <p className="text-[#005599] mt-2">Fecha: 5 de Noviembre</p>
          </div>
        </div>

        {/* Evento 3 */}
        <div className="bg-white border border-[#002855] shadow-md rounded-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition duration-300">
          <img 
            src="img/Eventos.webp" 
            alt="Evento 3" 
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold text-[#003366] hover:text-[#005073]">
              Seminario de Tecnología
            </h2>
            <p className="text-[#5A5A5A] mt-2">
              Explora las últimas tendencias tecnológicas en nuestro seminario.
            </p>
            <p className="text-[#005599] mt-2">Fecha: 15 de Diciembre</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventos;
