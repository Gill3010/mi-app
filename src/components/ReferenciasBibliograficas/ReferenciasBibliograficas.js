import React from 'react';
import styles from './ReferenciasBibliograficas.module.css';

const ReferenciasBibliograficas = () => {
  return (
    <div className={styles.referenciasContainer}>
      <div className={styles.canvas}>
        <h2>Referencias Bibliográficas</h2>
        <p>
          En el Portal de Carteles Científicos, fomentamos el uso correcto de las referencias bibliográficas para garantizar la veracidad y el rigor académico de los trabajos publicados. Creemos que una adecuada citación de fuentes es esencial para la transparencia y la integridad científica.
        </p>
        <p>
          Los autores que publican en nuestra plataforma deben asegurarse de citar todas las fuentes relevantes y seguir las normas de citación establecidas por nuestra política editorial. El uso de referencias bibliográficas adecuadas permite a otros investigadores verificar y ampliar el trabajo publicado.
        </p>
        <p>
          Invitamos a todos los autores a revisar detenidamente sus referencias antes de enviar sus trabajos, con el fin de garantizar que cumplen con los estándares académicos y de ética en la investigación.
        </p>
        <p>
          Proporcionamos guías y herramientas para facilitar la correcta citación de las fuentes bibliográficas, fomentando así el uso responsable y ético del conocimiento previo.
        </p>
      </div>
    </div>
  );
};

export default ReferenciasBibliograficas;
