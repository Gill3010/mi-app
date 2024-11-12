import React, { useEffect, useState } from 'react';
import { getPublications, getPastPublications } from '../../config/firebaseConfig'; // Asegúrate de importar ambas funciones

const Metrics = () => {
  const [metrics, setMetrics] = useState({
    totalPublications: 0,
    totalViews: 0,
    totalLikes: 0,
    totalShares: 0,  // Aquí se mide el total de veces compartidas
    totalCitations: 0,
    totalEvents: 0,
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
        let totalEvents = 0;  // Contador de eventos

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

        // Contamos el número de colecciones (publicaciones y publicaciones anteriores)
        totalEvents = 2; // Sabemos que tenemos 2 colecciones: "publicaciones" y "pastPublications"

        setMetrics({
          totalPublications: publications.length + pastPublications.length, // Contar tanto publicaciones actuales como pasadas
          totalViews,
          totalLikes,
          totalShares,  // Guardar el total de veces compartidas
          totalCitations,
          totalEvents,  // Guardar el total de eventos (número de colecciones)
        });
      } catch (error) {
        console.error("Error al obtener las métricas:", error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#f9fcff] to-[#d1e8ff] shadow-xl rounded-lg p-10 mt-12 max-w-5xl mx-auto text-[#002855]">
      <h2 className="text-4xl font-bold text-center text-[#004080] mb-8">Resumen de Métricas</h2>
      <div className="flex gap-8 text-center overflow-x-auto pb-4">
        {/* Metric cards */}
        {[
          { label: 'Colecciones', value: metrics.totalPublications },
          { label: 'Vistas Totales', value: metrics.totalViews },
          { label: 'Likes Totales', value: metrics.totalLikes },
          { label: 'Veces Compartidas', value: metrics.totalShares },  // Muestra las veces compartidas
          { label: 'Citas Totales (DOI)', value: metrics.totalCitations },
          { label: 'Eventos', value: metrics.totalEvents },
        ].map((metric, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-40 sm:w-48 md:w-56 flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 hover:bg-[#e9f3ff] border border-transparent hover:border-[#d0e5ff]"
          >
            <h3 className="text-5xl font-extrabold text-[#003366]">{metric.value}</h3>
            <p className="mt-3 text-lg font-medium text-[#005599]">{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Metrics;
