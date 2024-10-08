import React from 'react';

const Cursos = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Cursos</h1>
      <p className="text-lg text-gray-600 text-center mb-4">
        Explora nuestros cursos en línea diseñados para tu crecimiento profesional y personal.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Bloque Curso 1 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img 
            src="img/Cursos.webp" 
            alt="Online Course Setting" 
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold">Curso 1</h2>
            <p className="text-gray-600 mt-2">
              Introducción al curso en línea. Aprende desde la comodidad de tu casa con nuestros expertos.
            </p>
          </div>
        </div>
        
        {/* Bloque Curso 2 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img 
            src="img/Cursos.webp" 
            alt="Online Course Setting" 
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold">Curso 2</h2>
            <p className="text-gray-600 mt-2">
              Un curso avanzado para mejorar tus habilidades profesionales.
            </p>
          </div>
        </div>
        
        {/* Bloque Curso 3 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img 
            src="img/Cursos.webp" 
            alt="Online Course Setting" 
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold">Curso 3</h2>
            <p className="text-gray-600 mt-2">
              Curso especializado en tecnología avanzada para expertos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cursos;
