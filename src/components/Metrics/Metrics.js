import React, { useEffect, useState } from 'react';
import { getPublications, getPastPublications } from '../../config/firebaseConfig';
import { FaEye, FaHeart, FaShareAlt, FaQuoteLeft, FaFileAlt, FaImages } from 'react-icons/fa';

const Metrics = () => {
  const [metrics, setMetrics] = useState({
    totalPublications: 0,
    totalViews: 0,
    totalLikes: 0,
    totalShares: 0,
    totalCitations: 0,
    totalGalleries: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const publications = await getPublications();
        const pastPublications = await getPastPublications();

        let totalViews = 0;
        let totalLikes = 0;
        let totalShares = 0;
        let totalCitations = 0;
        let totalGalleries = 2;

        publications.forEach((pub) => {
          totalViews += pub.vistas || 0;
          totalLikes += pub.likes || 0;
          totalShares += pub.compartido || 0;
          totalCitations += pub.citado || 0;
        });

        pastPublications.forEach((pub) => {
          totalViews += pub.vistas || 0;
          totalLikes += pub.likes || 0;
          totalShares += pub.compartido || 0;
          totalCitations += pub.citado || 0;
        });

        setMetrics({
          totalPublications: publications.length + pastPublications.length,
          totalViews,
          totalLikes,
          totalShares,
          totalCitations,
          totalGalleries,
        });
      } catch (error) {
        console.error("Error al obtener las métricas:", error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#002855] to-[#00A1E0] shadow-xl rounded-lg p-6 mt-8 max-w-5xl mx-auto text-[#ffffff]">
      <div className="flex gap-6 sm:gap-8 text-center overflow-x-auto pb-6">
        {[
          { label: 'Galerías', value: metrics.totalGalleries, icon: <FaImages /> },
          { label: 'Publicaciones', value: metrics.totalPublications, icon: <FaFileAlt /> },
          { label: 'Vistas', value: metrics.totalViews, icon: <FaEye /> },
          { label: 'Likes', value: metrics.totalLikes, icon: <FaHeart /> },
          { label: 'Compartidas', value: metrics.totalShares, icon: <FaShareAlt /> },
          { label: 'Citas (DOI)', value: metrics.totalCitations, icon: <FaQuoteLeft /> },
        ].map((metric, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-32 sm:w-40 md:w-48 flex flex-col items-center p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 hover:bg-[#006D5B] hover:border-[#005A4C] border border-transparent"
          >
            <div className="text-4xl sm:text-5xl text-[#005599] mb-2">
              {metric.icon}
            </div>
            <h3 className="text-3xl font-extrabold text-[#003366]">{metric.value}</h3>
            <p className="mt-1 text-sm sm:text-lg font-medium text-[#005599]">{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Metrics;