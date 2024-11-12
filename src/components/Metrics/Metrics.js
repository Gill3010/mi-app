import React, { useEffect, useState } from 'react';
import { getPublications } from '../../config/firebaseConfig';

const Metrics = () => {
  const [metrics, setMetrics] = useState({
    totalPublications: 0,
    totalViews: 0,
    totalLikes: 0,
    totalShares: 0,
    totalCitations: 0,
    totalEvents: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const publications = await getPublications();
        
        let totalViews = 0;
        let totalLikes = 0;
        let totalShares = 0;
        let totalCitations = 0;
        let totalEvents = 0;

        publications.forEach((pub) => {
          totalViews += pub.vistas || 0;
          totalLikes += pub.likes || 0;
          totalShares += pub.compartido || 0;
          totalCitations += pub.citado || 0;
          totalEvents += pub.eventos || 0;
        });

        setMetrics({
          totalPublications: publications.length,
          totalViews,
          totalLikes,
          totalShares,
          totalCitations,
          totalEvents,
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
          { label: 'Veces Compartidas', value: metrics.totalShares },
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
