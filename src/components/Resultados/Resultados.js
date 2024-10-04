import React from 'react';
import styles from './Resultados.module.css'; // Importar estilos

const Resultados = ({ results }) => {
  // Verifica si results está definido y es un array antes de intentar acceder a su longitud
  return (
    <div className={styles.resultadosContainer}>
      <h2 className={styles.resultadosHeader}>Resultados de la Búsqueda</h2>
      <div>
        {results && Array.isArray(results) && results.length > 0 ? (
          <ul>
            {results.map((item, index) => (
              <li key={index} className={styles.resultItem}>
                <h3>{item.titulo_investigacion}</h3>
                <p>{item.nombres} {item.apellidos}</p>
                <p>{item.institucion}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noResults}>No se encontraron resultados</p>
        )}
      </div>
    </div>
  );
};

export default Resultados;
