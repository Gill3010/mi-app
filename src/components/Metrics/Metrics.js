import React, { useEffect, useState } from 'react';
import { getPublications, getPastPublications } from '../../config/firebaseConfig'; // Asegúrate de importar ambas funciones
import { FaEye, FaHeart, FaShareAlt, FaQuoteLeft, FaFileAlt, FaImages } from 'react-icons/fa'; // Usamos FontAwesome

const Metrics = () => {
  const [metrics, setMetrics] = useState({
    totalPublications: 0,
    totalViews: 0,
    totalLikes: 0,
    totalShares: 0,  // Aquí se mide el total de veces compartidas
    totalCitations: 0,
    totalGalleries: 0,  // Reemplazamos eventos por galerías
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const publications = await getPublications(); // Obtener publicaciones actuales
        const pastPublications = await getPastPublications(); // Obtener publicaciones anteriores

        let totalViews = 0;
        let totalLikes = 0;
        let totalShares = 0;  // Contador de veces compartidas
        let totalCitations = 0;
        let totalGalleries = 0;  // Contador de galerías

        // Calcular las métricas para las publicaciones actuales
        publications.forEach((pub) => {
          totalViews += pub.vistas || 0;
          totalLikes += pub.likes || 0;
          totalShares += pub.compartido || 0;  // Sumar el campo "compartido"
          totalCitations += pub.citado || 0;
        });

        // Calcular las métricas para las publicaciones anteriores
        pastPublications.forEach((pub) => {
          totalViews += pub.vistas || 0;
          totalLikes += pub.likes || 0;
          totalShares += pub.compartido || 0;  // Sumar el campo "compartido"
          totalCitations += pub.citado || 0;
        });

        // Contamos el número de galerías (publicaciones actuales y anteriores)
        totalGalleries = 2; // Sabemos que tenemos 2 colecciones: "publicaciones" y "pastPublications"

        setMetrics({
          totalPublications: publications.length + pastPublications.length, // Contar tanto publicaciones actuales como pasadas
          totalViews,
          totalLikes,
          totalShares,  // Guardar el total de veces compartidas
          totalCitations,
          totalGalleries,  // Guardar el total de galerías (número de colecciones)
        });
      } catch (error) {
        console.error("Error al obtener las métricas:", error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#002855] to-[#00A1E0] shadow-xl rounded-lg p-6 mt-8 max-w-5xl mx-auto text-[#ffffff]">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">Resumen de Métricas</h2>
      <div className="flex gap-6 sm:gap-8 text-center overflow-x-auto pb-6">
        {/* Metric cards */}
        {[
          { label: 'Publicaciones', value: metrics.totalPublications, icon: <FaFileAlt /> },
          { label: 'Vistas Totales', value: metrics.totalViews, icon: <FaEye /> },
          { label: 'Likes Totales', value: metrics.totalLikes, icon: <FaHeart /> },
          { label: 'Veces Compartidas', value: metrics.totalShares, icon: <FaShareAlt /> },
          { label: 'Citas Totales (DOI)', value: metrics.totalCitations, icon: <FaQuoteLeft /> },
          { label: 'Galerías', value: metrics.totalGalleries, icon: <FaImages /> },
        ].map((metric, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-32 sm:w-40 md:w-48 flex flex-col items-center p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 hover:bg-[#006D5B] hover:border-[#005A4C] border border-transparent"
          >
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#003366]">
              {metric.icon}
              {metric.value}
            </h3>
            <p className="mt-2 sm:mt-3 text-sm sm:text-lg font-medium text-[#005599]">{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Metrics;
