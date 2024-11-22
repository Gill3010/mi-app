import React from 'react';

const Salas = () => {
  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto bg-gray-100">
      {/* Título del componente */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 shadow-xl p-6 bg-white rounded-lg">
        Salas
      </h1>

      {/* Descripción del componente */}
      <div className="text-center p-4 bg-white rounded-lg shadow-md mb-8">
        <p className="text-lg md:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
          Aquí encontrarás toda la información sobre las salas.
        </p>
      </div>

      {/* Grid de Salas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Sala 1 */}
        <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-lg transition hover:shadow-2xl duration-300">
          <img
            src="img/Salas.webp"
            alt="Sala 1"
            className="rounded-lg w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-blue-900 hover:text-blue-800 transition">
              Sala 1
            </h2>
            <p className="text-gray-600 mt-2">
              Descripción de la sala. Aquí puedes agregar más detalles sobre esta sala.
            </p>
          </div>
        </div>

        {/* Sala 2 */}
        <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-lg transition hover:shadow-2xl duration-300">
          <img
            src="img/Salas.webp"
            alt="Sala 2"
            className="rounded-lg w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-blue-900 hover:text-blue-800 transition">
              Sala 2
            </h2>
            <p className="text-gray-600 mt-2">
              Descripción de la sala. Aquí puedes agregar más detalles sobre esta sala.
            </p>
          </div>
        </div>

        {/* Sala 3 */}
        <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-lg transition hover:shadow-2xl duration-300">
          <img
            src="img/Salas.webp"
            alt="Sala 3"
            className="rounded-lg w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-blue-900 hover:text-blue-800 transition">
              Sala 3
            </h2>
            <p className="text-gray-600 mt-2">
              Descripción de la sala. Aquí puedes agregar más detalles sobre esta sala.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salas;