import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../../redux/actions/searchActions';

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
      <h2 className="text-2xl font-bold mb-4 text-[#002855]">Resultados de la Búsqueda</h2>
      
      {loading && <p className="text-gray-500">Cargando resultados...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div>
        {results && Array.isArray(results) && results.length > 0 ? (
          <ul className="space-y-4">
            {results.map((item) => (
              <li 
                key={item.id} 
                className="p-4 border border-gray-200 rounded-lg hover:shadow-lg cursor-pointer transition duration-300 ease-in-out hover:border-[#002855] relative" 
                onClick={() => handleClick(item.id)}
              >
                {/* Línea gráfica azul */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#002855] rounded-t-lg"></div>
                
                <img src={item.imagen} alt={item.tituloInvestigacion} className="w-full h-auto mb-2 rounded" />
                <h3 className="text-lg font-semibold text-[#002855]">{item.tituloInvestigacion}</h3>
                <p className="text-gray-700">{item.nombreAutor} {item.apellidoAutor}</p>
                <p className="text-gray-500">{item.institucion}</p>
                <p className="text-gray-500">Fecha de Publicación: {formatDate(item.fechaPublicacion)}</p>
                <p className="text-gray-500">ORCID: <a href={`https://orcid.org/${item.orcid}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{item.orcid}</a></p>
                
                {/* Mostrar el resumen como enlace */}
                {item.resumen ? (
                  <p className="text-gray-500">
                    Resumen: <a href={item.resumen} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Ver documento</a>
                  </p>
                ) : (
                  <p className="text-gray-500">Resumen no disponible</p>
                )}
                
                <p className="text-gray-500">Vistas: {item.vistas}</p>
                <p className="text-gray-500">Likes: {item.likes}</p>
                {item.audio && <audio controls src={item.audio} className="mt-2 w-full" />}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No se encontraron resultados</p>
        )}
      </div>
    </div>
  );
};

export default Resultados;
