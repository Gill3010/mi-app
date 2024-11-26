import React from 'react';

const Informacion = () => {
  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto bg-gradient-to-r from-[#1E3A8A] to-[#4CAF50]">
      {/* Título del componente */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 shadow-xl p-6 bg-white rounded-lg">
        Información
      </h1>

      {/* Descripción del componente */}
      <div className="text-center p-4 bg-white rounded-lg shadow-md mb-8">
        <p className="text-lg md:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
          Aquí encontrarás toda la información importante relacionada con nuestros servicios.
        </p>
      </div>

      {/* Grid de Información */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Información 1 */}
        <div className="bg-white border border-[#002855] p-4 rounded-lg shadow-lg transition hover:shadow-2xl duration-300 hover:bg-[#005073]">
          <img
            src="img/Informacion.webp"
            alt="Información 1"
            className="rounded-lg w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-[#003366] hover:text-[#005073] transition">
              Título de Información 1
            </h2>
            <p className="text-gray-600 mt-2">
              Descripción breve sobre la primera información importante.
            </p>
          </div>
        </div>

        {/* Información 2 */}
        <div className="bg-white border border-[#002855] p-4 rounded-lg shadow-lg transition hover:shadow-2xl duration-300 hover:bg-[#005073]">
          <img
            src="img/Informacion.webp"
            alt="Información 2"
            className="rounded-lg w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-[#003366] hover:text-[#005073] transition">
              Título de Información 2
            </h2>
            <p className="text-gray-600 mt-2">
              Descripción breve sobre la segunda información importante.
            </p>
          </div>
        </div>

        {/* Información 3 */}
        <div className="bg-white border border-[#002855] p-4 rounded-lg shadow-lg transition hover:shadow-2xl duration-300 hover:bg-[#005073]">
          <img
            src="img/Informacion.webp"
            alt="Información 3"
            className="rounded-lg w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-[#003366] hover:text-[#005073] transition">
              Título de Información 3
            </h2>
            <p className="text-gray-600 mt-2">
              Descripción breve sobre la tercera información importante.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Informacion;
