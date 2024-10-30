import React from 'react';

const Salas = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Salas</h1>
      <p className="text-lg text-gray-600 text-center">
        Aquí encontrarás toda la información sobre las salas.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card example for each "Sala" */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src="img/Salas.webp" alt="Sala" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold">Sala 1</h2>
            <p className="text-gray-600 mt-2">
              Descripción de la sala. Aquí puedes agregar más detalles sobre esta sala.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src="img/Salas.webp" alt="Sala" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold">Sala 1</h2>
            <p className="text-gray-600 mt-2">
              Descripción de la sala. Aquí puedes agregar más detalles sobre esta sala.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src="img/Salas.webp" alt="Sala" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold">Sala 1</h2>
            <p className="text-gray-600 mt-2">
              Descripción de la sala. Aquí puedes agregar más detalles sobre esta sala.
            </p>
          </div>
        </div>
        {/* Repite el mismo bloque para más salas */}
      </div>
    </div>
  );
};

export default Salas;
