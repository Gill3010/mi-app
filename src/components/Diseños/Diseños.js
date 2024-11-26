import React from 'react';

const Diseños = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#1E3A8A] to-[#4CAF50] p-6 md:p-12">
      {/* Título del componente */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 shadow-xl p-6 bg-white rounded-lg">
        Diseños
      </h1>

      {/* Descripción del componente */}
      <div className="text-center p-4 bg-white rounded-lg shadow-md mb-8">
        <p className="text-lg md:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
          Explora los distintos diseños innovadores y creativos que hemos desarrollado.
        </p>
      </div>

      {/* Grid de Diseños */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Diseño 1 */}
        <div className="bg-white border border-[#002855] p-4 rounded-lg shadow-lg transition hover:bg-[#005073] hover:shadow-2xl hover:scale-105 duration-300">
          <img
            src="/assets/Diseños.webp"
            alt="Diseño Creativo 1"
            className="rounded-lg w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-[#003366] hover:text-[#005073] transition">
              Diseño Creativo 1
            </h2>
            <p className="text-gray-600 mt-2">
              Descripción breve sobre el primer diseño innovador.
            </p>
          </div>
        </div>

        {/* Diseño 2 */}
        <div className="bg-white border border-[#002855] p-4 rounded-lg shadow-lg transition hover:bg-[#005073] hover:shadow-2xl hover:scale-105 duration-300">
          <img
            src="/assets/Diseños.webp"
            alt="Diseño Creativo 2"
            className="rounded-lg w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-[#003366] hover:text-[#005073] transition">
              Diseño Creativo 2
            </h2>
            <p className="text-gray-600 mt-2">
              Descripción breve sobre el segundo diseño innovador.
            </p>
          </div>
        </div>

        {/* Diseño 3 */}
        <div className="bg-white border border-[#002855] p-4 rounded-lg shadow-lg transition hover:bg-[#005073] hover:shadow-2xl hover:scale-105 duration-300">
          <img
            src="/assets/Diseños.webp"
            alt="Diseño Creativo 3"
            className="rounded-lg w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-[#003366] hover:text-[#005073] transition">
              Diseño Creativo 3
            </h2>
            <p className="text-gray-600 mt-2">
              Descripción breve sobre el tercer diseño innovador.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diseños;