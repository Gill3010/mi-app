import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para la navegación
import { useDispatch, useSelector } from 'react-redux'; // Para usar Redux
import { search } from '../../redux/actions/searchActions'; // Importar la acción de búsqueda desde Redux
import styles from './SearchBar.module.css'; // Importar los estilos

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
    navigate('/resultados'); // Redirigir a la página de resultados
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        className={styles.searchInput}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}  // Actualizar el término de búsqueda
        placeholder="Buscar investigación, nombres o apellidos"
        id="search-input" // Añadir un ID aquí
      />
      <button className={styles.searchButton} onClick={handleSearch}>Buscar</button>

      {/* Mostrar estado de carga */}
      {loading && <p>Buscando...</p>}

      {/* Mostrar errores */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Mostrar resultados (si no se está buscando y no hay errores) */}
      {results && !loading && results.length > 0 && (
        <div className={styles.resultContainer}>
          <ul>
            {results.map((item, index) => (
              <li key={index} className={styles.resultItem}>
                <h3>{item.titulo_investigacion}</h3>
                <p>{item.nombres} {item.apellidos}</p>
                <p>{item.institucion}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
