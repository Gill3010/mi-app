import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para la navegación
import { useDispatch, useSelector } from 'react-redux'; // Para usar Redux
import { search } from '../../redux/actions/searchActions'; // Importar la acción de búsqueda desde Redux

const SearchBar = () => {
  const [query, setQuery] = useState('');  // Término de búsqueda
  const navigate = useNavigate(); // Hook para la navegación
  const dispatch = useDispatch(); // Hook para despachar acciones de Redux

  // Obtener el estado de la búsqueda desde Redux
  const { results, loading, error } = useSelector((state) => state.search);

  // Ejecutar la búsqueda automáticamente cuando cambia el término de búsqueda
  useEffect(() => {
    if (query) {
      dispatch(search(query));  // Despacha la acción de búsqueda a Redux
    }
  }, [query, dispatch]);  // El efecto se ejecuta cuando cambia 'query'

  // Función para manejar la redirección después de buscar
  const handleSearch = () => {
    navigate('/GaleriasActuales'); // Redirigir a la página de resultados
  };

  return (
    <div className="flex flex-col items-center mt-8 w-full max-w-lg mx-auto">
      <input
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}  // Actualizar el término de búsqueda
        placeholder="Buscar investigación, nombres o apellidos"
        id="search-input"
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
        onClick={handleSearch}
      >
        Buscar
      </button>

      {/* Mostrar estado de carga */}
      {loading && <p className="mt-4 text-gray-600">Buscando...</p>}

      {/* Mostrar errores */}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Mostrar resultados (si no se está buscando y no hay errores) */}
      {results && !loading && results.length > 0 && (
        <div className="mt-6 w-full bg-white shadow-lg rounded-lg p-4">
          <ul>
            {results.map((item, index) => (
              <li key={index} className="border-b border-gray-200 py-2">
                <h3 className="text-lg font-semibold">{item.titulo_investigacion}</h3>
                <p>{item.nombres} {item.apellidos}</p>
                <p className="text-sm text-gray-500">{item.institucion}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
