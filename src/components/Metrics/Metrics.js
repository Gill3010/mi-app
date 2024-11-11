import React, { useEffect, useState } from 'react';
import { getPublications } from '../../config/firebaseConfig';

const Metrics = () => {
  const [metrics, setMetrics] = useState({
    totalPublications: 0,
    totalViews: 0,
    totalLikes: 0,
    totalShares: 0,
    totalCitations: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const publications = await getPublications();
        
        let totalViews = 0;
        let totalLikes = 0;
        let totalShares = 0;
        let totalCitations = 0;

        publications.forEach((pub) => {
          totalViews += pub.vistas || 0;
          totalLikes += pub.likes || 0;
          totalShares += pub.compartido || 0;
          totalCitations += pub.citado || 0;
        });

        setMetrics({
          totalPublications: publications.length,
          totalViews,
          totalLikes,
          totalShares,
          totalCitations,
        });
      } catch (error) {
        console.error("Error al obtener las métricas:", error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#f0f9ff] to-[#cfe4ff] shadow-lg rounded-lg p-8 mt-10 max-w-5xl mx-auto text-[#002855] overflow-x-auto">
      <div className="flex gap-6 text-center">
        {/* Publicaciones */}
        <div className="min-w-[150px] p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 hover:bg-[#eaf4ff]">
          <h3 className="text-4xl font-extrabold text-[#004080]">{metrics.totalPublications}</h3>
          <p className="mt-2 text-lg font-semibold text-[#0060a0]">Publicaciones</p>
        </div>
        {/* Vistas Totales */}
        <div className="min-w-[150px] p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 hover:bg-[#eaf4ff]">
          <h3 className="text-4xl font-extrabold text-[#004080]">{metrics.totalViews}</h3>
          <p className="mt-2 text-lg font-semibold text-[#0060a0]">Vistas Totales</p>
        </div>
        {/* Likes Totales */}
        <div className="min-w-[150px] p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 hover:bg-[#eaf4ff]">
          <h3 className="text-4xl font-extrabold text-[#004080]">{metrics.totalLikes}</h3>
          <p className="mt-2 text-lg font-semibold text-[#0060a0]">Likes Totales</p>
        </div>
        {/* Veces Compartidas */}
        <div className="min-w-[150px] p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 hover:bg-[#eaf4ff]">
          <h3 className="text-4xl font-extrabold text-[#004080]">{metrics.totalShares}</h3>
          <p className="mt-2 text-lg font-semibold text-[#0060a0]">Veces Compartidas</p>
        </div>
        {/* Citas Totales */}
        <div className="min-w-[150px] p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 hover:bg-[#eaf4ff]">
          <h3 className="text-4xl font-extrabold text-[#004080]">{metrics.totalCitations}</h3>
          <p className="mt-2 text-lg font-semibold text-[#0060a0]">Citas Totales (DOI)</p>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
