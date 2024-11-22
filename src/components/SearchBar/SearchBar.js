import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../../redux/actions/searchActions';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { results, loading, error } = useSelector((state) => state.search);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        dispatch(search(query)); // Esto llama a la acción search con el query
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query, dispatch]);

  const handleSearch = () => {
    navigate(`/Resultados?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex flex-col items-center mt-8 w-full max-w-lg mx-auto">
      <input
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002855] mb-4"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar investigación, nombres o apellidos"
        id="search-input"
      />
      <button
        className="bg-[#002855] hover:bg-[#005073] text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
        onClick={handleSearch}
      >
        Buscar
      </button>

      {loading && <p className="mt-4 text-gray-600">Buscando...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {results && !loading && results.length > 0 && (
        <div className="mt-6 w-full bg-white shadow-lg rounded-lg p-4">
          <ul>
            {results.map((item) => (
              <li key={item.id} className="border-b border-gray-200 py-2">
                <h3 className="text-lg font-semibold text-[#002855]">{item.tituloInvestigacion}</h3>
                <p>{item.nombreAutor} {item.apellidoAutor}</p>
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