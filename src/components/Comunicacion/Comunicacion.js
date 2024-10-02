import React from 'react';
import styles from './Comunicacion.module.css';

const Comunicacion = () => {
  return (
    <div className={styles.comunicacionContainer}>
      <div className={styles.canvas}>
        <h2>Comunicación</h2>
        <p>
          En el Portal de Carteles Científicos, fomentamos la comunicación científica abierta y efectiva. Creemos que la difusión del conocimiento no solo debe darse entre investigadores, sino que también debe llegar al público en general, con el fin de generar un impacto más amplio.
        </p>
        <p>
          Nuestra plataforma proporciona un espacio donde los investigadores pueden compartir sus hallazgos de manera accesible, utilizando un formato de cartel que facilita la comprensión visual de los resultados.
        </p>
        <p>
          Además, nos esforzamos por facilitar la comunicación entre investigadores de distintas disciplinas, promoviendo la colaboración interdisciplinaria para enfrentar los desafíos globales.
        </p>
        <p>
          Invitamos a todos los investigadores a utilizar nuestras herramientas de comunicación para compartir sus trabajos y contribuir al crecimiento del conocimiento científico a nivel global.
        </p>
      </div>
    </div>
  );
};

export default Comunicacion;
