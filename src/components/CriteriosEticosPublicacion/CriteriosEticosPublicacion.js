import React from "react";

const CriteriosEticosPublicacion = () => {
  return (
    <div className="bg-white p-8">
      <div className="bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#FFC107] p-6 rounded-lg shadow-lg max-w-4xl mx-auto hover:shadow-2xl transition duration-300 transform hover:scale-105">
        <h2 className="text-2xl font-bold text-white mb-4">
          Criterios Éticos de Publicación
        </h2>
        <p className="text-white mb-4">
          En el Portal de Carteles Científicos, estamos comprometidos con la
          promoción de los más altos estándares éticos en la publicación
          científica. Todos los trabajos que se publican en nuestra plataforma
          deben cumplir con las normas internacionales de ética en
          investigación.
        </p>
        <p className="text-white mb-4">
          Los autores deben garantizar la originalidad de sus investigaciones,
          así como la transparencia en la presentación de datos y resultados.
          Además, se espera que las fuentes y referencias estén adecuadamente
          acreditadas para evitar el plagio.
        </p>
        <p className="text-white mb-4">
          El comité de revisión se asegura de que todos los trabajos enviados
          cumplan con estos principios, y cualquier violación de las normas
          éticas resultará en la descalificación del trabajo.
        </p>
        <p className="text-white">
          Invitamos a todos los investigadores a adherirse a los principios
          éticos de publicación para garantizar la integridad científica y
          contribuir al avance responsable del conocimiento.
        </p>
      </div>
    </div>
  );
};

export default CriteriosEticosPublicacion;
