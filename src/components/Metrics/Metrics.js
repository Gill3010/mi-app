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
    <div className="bg-gradient-to-r from-[#f5faff] to-[#e0f7ff] shadow-lg rounded-lg p-6 mt-8 max-w-5xl mx-auto text-[#002855]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-center">
        {/* Publicaciones */}
        <div className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 hover:bg-[#e9f5ff]">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#002855]">{metrics.totalPublications}</h3>
          <p className="text-base font-medium text-[#004080]">Publicaciones</p>
        </div>
        {/* Vistas Totales */}
        <div className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 hover:bg-[#e9f5ff]">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#002855]">{metrics.totalViews}</h3>
          <p className="text-base font-medium text-[#004080]">Vistas Totales</p>
        </div>
        {/* Likes Totales */}
        <div className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 hover:bg-[#e9f5ff]">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#002855]">{metrics.totalLikes}</h3>
          <p className="text-base font-medium text-[#004080]">Likes Totales</p>
        </div>
        {/* Veces Compartidas */}
        <div className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 hover:bg-[#e9f5ff]">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#002855]">{metrics.totalShares}</h3>
          <p className="text-base font-medium text-[#004080]">Veces Compartidas</p>
        </div>
        {/* Citas Totales */}
        <div className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 hover:bg-[#e9f5ff]">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#002855]">{metrics.totalCitations}</h3>
          <p className="text-base font-medium text-[#004080]">Citas Totales (DOI)</p>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
