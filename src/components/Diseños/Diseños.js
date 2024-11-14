import React from 'react';

const Diseños = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Diseños</h1>
      <p className="text-lg text-gray-600 text-center mb-4">
        Explora los distintos diseños innovadores y creativos que hemos desarrollado.
      </p>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Diseño 1 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img 
            src="/assets/Diseños.webp" 
            alt="Diseño 1" 
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold">Diseño Creativo 1</h2>
            <p className="text-gray-600 mt-2">
              Descripción breve sobre el primer diseño innovador.
            </p>
          </div>
        </div>

        {/* Diseño 2 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img 
            src="/assets/Diseños.webp" 
            alt="Diseño 2" 
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold">Diseño Creativo 2</h2>
            <p className="text-gray-600 mt-2">
              Descripción breve sobre el segundo diseño innovador.
            </p>
          </div>
        </div>

        {/* Diseño 3 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img 
            src="/assets/Diseños.webp" 
            alt="Diseño 3" 
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold">Diseño Creativo 3</h2>
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
