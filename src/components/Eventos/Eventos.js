import React from 'react';

const Eventos = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#1E3A8A] to-[#4CAF50] p-6 md:p-12">
      {/* Título del componente */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 shadow-xl p-6 bg-white rounded-lg">
        Eventos
      </h1>

      {/* Descripción del componente */}
      <div className="text-center p-4 bg-white rounded-lg shadow-md mb-8">
        <p className="text-lg md:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
          Mantente al día con nuestros próximos eventos y actividades importantes.
        </p>
      </div>

      {/* Grid de Eventos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Evento 1 */}
        <div className="bg-white border border-[#002855] shadow-md rounded-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition duration-300 hover:bg-[#005073]">
          <img
            src="img/Eventos.webp"
            alt="Evento 1"
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-[#003366] hover:text-[#005073]">
              Conferencia Internacional
            </h2>
            <p className="text-gray-600 mt-2">
              Participa en nuestra conferencia internacional sobre las últimas investigaciones.
            </p>
            <p className="text-[#005599] font-semibold mt-2">Fecha: 20 de Octubre</p>
          </div>
        </div>

        {/* Evento 2 */}
        <div className="bg-white border border-[#002855] shadow-md rounded-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition duration-300 hover:bg-[#005073]">
          <img
            src="img/Eventos.webp"
            alt="Evento 2"
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-[#003366] hover:text-[#005073]">
              Taller de Innovación
            </h2>
            <p className="text-gray-600 mt-2">
              Únete a nuestro taller sobre innovación y creatividad en la ciencia.
            </p>
            <p className="text-[#005599] font-semibold mt-2">Fecha: 5 de Noviembre</p>
          </div>
        </div>

        {/* Evento 3 */}
        <div className="bg-white border border-[#002855] shadow-md rounded-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition duration-300 hover:bg-[#005073]">
          <img
            src="img/Eventos.webp"
            alt="Evento 3"
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-[#003366] hover:text-[#005073]">
              Seminario de Tecnología
            </h2>
            <p className="text-gray-600 mt-2">
              Explora las últimas tendencias tecnológicas en nuestro seminario.
            </p>
            <p className="text-[#005599] font-semibold mt-2">Fecha: 15 de Diciembre</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventos;