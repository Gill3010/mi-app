import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../../redux/actions/searchActions';
import { FiEye, FiHeart, FiShare, FiUser } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

const Resultados = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { results, loading, error } = useSelector((state) => state.search);
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      dispatch(search(query));
    }
  }, [query, dispatch]);

  const handleClick = (id) => {
    navigate(`/detalles/${id}`);
  };

  const formatDate = (timestamp) => {
    if (timestamp) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleDateString();
    }
    return "Fecha no disponible";
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-extrabold mb-6 text-[#002855] text-center">Resultados de la Búsqueda</h2>
      
      {loading && <p className="text-gray-500">Cargando resultados...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div>
        {results && Array.isArray(results) && results.length > 0 ? (
          <ul className="space-y-6">
            {results.map((item) => (
              <li 
                key={item.id} 
                className="p-6 border border-gray-200 rounded-lg hover:shadow-xl cursor-pointer transition duration-300 ease-in-out hover:border-[#002855] relative bg-white"
                onClick={() => handleClick(item.id)}
              >
                {/* Línea gráfica azul */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#002855] rounded-t-lg"></div>
                
                {item.imagen && (
                  <img src={item.imagen} alt={item.tituloInvestigacion} className="w-full h-auto mb-3 rounded-lg shadow-sm" />
                )}
                
                {/* Título de la investigación con tooltip */}
                <h3 className="text-xl font-semibold text-[#002855] relative group cursor-pointer mb-1">
                  <strong>Título de la investigación</strong>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-3 py-1 text-xs text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.tituloInvestigacion}
                  </span>
                </h3>
                <p className="text-gray-500 mb-2"><strong>DOI:</strong> {item.doi || "No disponible"}</p>

                <p className="text-gray-700 font-medium mb-1">{item.nombreAutor} {item.apellidoAutor}</p>
                <p className="text-gray-500 flex items-center mb-1">
                  <strong>ORCID:</strong>{" "}
                  <a href={`https://orcid.org/${item.orcid}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline flex items-center ml-1">
                    <FiUser className="w-4 h-4 mr-1" /> Ver perfil
                  </a>
                </p>
                
                {/* Afiliación con tooltip */}
                <p className="text-gray-500 relative group cursor-pointer mb-1">
                  <strong>Afiliación</strong>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-3 py-1 text-xs text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.institucion || "Afiliación no disponible"}
                  </span>
                </p>
                
                <p className="text-gray-500 mb-3"><strong>Fecha de Publicación:</strong> {formatDate(item.fechaPublicacion)}</p>

                {/* Mostrar el resumen como enlace */}
                {item.resumen ? (
                  <p className="text-gray-500 mb-3">
                    <strong>Resumen:</strong> <a href={item.resumen} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Ver documento</a>
                  </p>
                ) : (
                  <p className="text-gray-500 mb-3"><strong>Resumen no disponible</strong></p>
                )}
                
                {/* Panel de acciones */}
                <div className="flex space-x-4 mt-4 text-blue-600 bg-gray-50 rounded-lg border border-gray-300 p-3 shadow-md">
                  <div className="tooltip flex items-center space-x-1">
                    <FiEye className="text-lg hover:text-blue-500 transition-colors cursor-pointer" />
                    <span className="text-sm">{item.vistas || 0}</span>
                    <span className="tooltiptext">Vistas</span>
                  </div>
                  <div className="tooltip flex items-center space-x-1 cursor-pointer">
                    <FiHeart className="text-lg hover:text-red-400 transition-colors" />
                    <span className="text-sm">{item.likes || 0}</span>
                    <span className="tooltiptext">Likes</span>
                  </div>
                  <div className="tooltip flex items-center space-x-1 cursor-pointer">
                    <FiShare className="text-lg hover:text-blue-500 transition-colors" />
                    <span className="text-sm">{item.compartido || 0}</span>
                    <span className="tooltiptext w-24">Compartir</span>
                  </div>
                  <div className="tooltip flex items-center space-x-1">
                    <FaQuoteLeft className="text-lg hover:text-blue-500 transition-colors" />
                    <span className="text-sm">{item.citas || 0}</span>
                    <span className="tooltiptext">Citas</span>
                  </div>
                </div>

                {item.audio && <audio controls src={item.audio} className="mt-4 w-full" />}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No se encontraron resultados</p>
        )}
      </div>
    </div>
  );
};

export default Resultados;
