import React from 'react';

const NormasAPA = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#1E3A8A] to-[#4CAF50] p-6 md:p-12">
      {/* Título del componente */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 shadow-xl p-6 bg-white rounded-lg">
        Normas APA
      </h1>

      {/* Descripción del componente */}
      <div className="text-center p-4 bg-white rounded-lg shadow-md mb-8">
        <p className="text-lg md:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
          Aprende a utilizar las Normas APA para citar y referenciar correctamente en tus trabajos académicos.
        </p>
      </div>

      {/* Grid de Secciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Sección 1 */}
        <div className="bg-white border border-[#002855] shadow-md rounded-lg overflow-hidden transition hover:shadow-2xl duration-300 hover:scale-105 hover:bg-[#005073]">
          <img
            src="img/NormasAPA.webp"
            alt="Citación APA"
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-[#003366] hover:text-[#005073] transition">
              Citación en Texto
            </h2>
            <p className="text-gray-600 mt-2">
              Aprende cómo realizar citas dentro del texto de acuerdo con las Normas APA.
            </p>
          </div>
        </div>

        {/* Sección 2 */}
        <div className="bg-white border border-[#002855] shadow-md rounded-lg overflow-hidden transition hover:shadow-2xl duration-300 hover:scale-105 hover:bg-[#005073]">
          <img
            src="img/NormasAPA.webp"
            alt="Referencias APA"
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-[#003366] hover:text-[#005073] transition">
              Lista de Referencias
            </h2>
            <p className="text-gray-600 mt-2">
              Descubre cómo estructurar la lista de referencias según las Normas APA.
            </p>
          </div>
        </div>

        {/* Sección 3 */}
        <div className="bg-white border border-[#002855] shadow-md rounded-lg overflow-hidden transition hover:shadow-2xl duration-300 hover:scale-105 hover:bg-[#005073]">
          <img
            src="img/NormasAPA.webp"
            alt="Formato APA"
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-[#003366] hover:text-[#005073] transition">
              Formato General
            </h2>
            <p className="text-gray-600 mt-2">
              Conoce el formato general de los trabajos escritos bajo las Normas APA.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NormasAPA;