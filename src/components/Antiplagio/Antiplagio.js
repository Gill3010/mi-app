import React from 'react';
import styles from './Antiplagio.module.css';

const Antiplagio = () => {
  return (
    <div className={styles.antiplagioContainer}>
      <div className={styles.canvas}>
        <h2>Política Antiplagio</h2>
        <p>
          En el Portal de Carteles Científicos, nos tomamos muy en serio el plagio. Nuestra política antiplagio garantiza que todos los trabajos de investigación enviados y publicados en nuestra plataforma sean originales y respeten los derechos de autor.
        </p>
        <p>
          Todos los trabajos que se envían a revisión son sometidos a herramientas avanzadas de detección de plagio para asegurar que no se ha copiado contenido de otras fuentes sin la debida acreditación.
        </p>
        <p>
          Los autores que publican en nuestro portal deben garantizar que sus investigaciones son originales y que todas las fuentes externas han sido adecuadamente citadas. Cualquier violación de esta política resultará en la eliminación del trabajo de nuestra plataforma y posibles sanciones.
        </p>
        <p>
          Invitamos a todos los autores a adherirse a las normas éticas de publicación y a asegurar que sus trabajos cumplan con los estándares de integridad académica.
        </p>
      </div>
    </div>
  );
};

export default Antiplagio;
