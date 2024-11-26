import React from 'react';

const Redaccion = () => {
  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-[#1E3A8A] to-[#4CAF50]">
      <h1 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 shadow-xl p-6 bg-white rounded-lg">
        Redacción
      </h1>
      <p className="text-lg text-gray-600 text-center mb-4">
        Descubre nuestras técnicas y servicios de redacción profesional para mejorar la calidad de tus escritos.
      </p>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden transition hover:shadow-2xl duration-300 hover:scale-105">
          <img 
            src="img/Redaccion.webp" 
            alt="Redacción 1" 
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold text-[#003366] hover:text-[#005073] transition">
              Redacción Técnica
            </h2>
            <p className="text-gray-600 mt-2">
              Aprenda cómo mejorar la precisión y claridad en la redacción de documentos técnicos.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden transition hover:shadow-2xl duration-300 hover:scale-105">
          <img 
            src="img/Redaccion.webp" 
            alt="Redacción 2" 
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold text-[#003366] hover:text-[#005073] transition">
              Redacción Creativa
            </h2>
            <p className="text-gray-600 mt-2">
              Explora técnicas creativas para contar historias y captar la atención de tu audiencia.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden transition hover:shadow-2xl duration-300 hover:scale-105">
          <img 
            src="img/Redaccion.webp" 
            alt="Redacción 3" 
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold text-[#003366] hover:text-[#005073] transition">
              Redacción Académica
            </h2>
            <p className="text-gray-600 mt-2">
              Descubre los mejores enfoques para escribir trabajos académicos bien estructurados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Redaccion;
