import React from 'react';

const Antiplagio = () => {
  return (
    <div className="bg-gradient-to-r from-[#1E3A8A] to-[#4CAF50] p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto hover:shadow-2xl transition duration-300 transform hover:scale-105 hover:bg-[#f0f5f5]">
        <h2 className="text-2xl font-bold text-[#003366] mb-4">Política Antiplagio</h2>
        <p className="text-gray-600 mb-4">
          En el Portal de Carteles Científicos, nos tomamos muy en serio el plagio. Nuestra política antiplagio garantiza que todos los trabajos de investigación enviados y publicados en nuestra plataforma sean originales y respeten los derechos de autor.
        </p>
        <p className="text-gray-600 mb-4">
          Todos los trabajos que se envían a revisión son sometidos a herramientas avanzadas de detección de plagio para asegurar que no se ha copiado contenido de otras fuentes sin la debida acreditación.
        </p>
        <p className="text-gray-600 mb-4">
          Los autores que publican en nuestro portal deben garantizar que sus investigaciones son originales y que todas las fuentes externas han sido adecuadamente citadas. Cualquier violación de esta política resultará en la eliminación del trabajo de nuestra plataforma y posibles sanciones.
        </p>
        <p className="text-gray-600">
          Invitamos a todos los autores a adherirse a las normas éticas de publicación y a asegurar que sus trabajos cumplan con los estándares de integridad académica.
        </p>
      </div>
    </div>
  );
};

export default Antiplagio;
