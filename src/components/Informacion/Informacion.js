import React from 'react';

const Informacion = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Información</h1>
      <p className="text-lg text-gray-600 text-center mb-4">
        Aquí encontrarás toda la información importante relacionada con nuestros servicios.
      </p>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img 
            src="img/Informacion.webp" 
            alt="Información 1" 
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold">Título de Información 1</h2>
            <p className="text-gray-600 mt-2">
              Descripción breve sobre la primera información importante.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img 
            src="img/Informacion.webp" 
            alt="Información 2" 
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold">Título de Información 2</h2>
            <p className="text-gray-600 mt-2">
              Descripción breve sobre la segunda información importante.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img 
            src="img/Informacion.webp" 
            alt="Información 3" 
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold">Título de Información 3</h2>
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
