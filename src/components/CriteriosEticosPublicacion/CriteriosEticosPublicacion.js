import React from 'react';
import styles from './CriteriosEticosPublicacion.module.css';

const CriteriosEticosPublicacion = () => {
  return (
    <div className={styles.criteriosContainer}>
      <div className={styles.canvas}>
        <h2>Criterios Éticos de Publicación</h2>
        <p>
          En el Portal de Carteles Científicos, estamos comprometidos con la promoción de los más altos estándares éticos en la publicación científica. Todos los trabajos que se publican en nuestra plataforma deben cumplir con las normas internacionales de ética en investigación.
        </p>
        <p>
          Los autores deben garantizar la originalidad de sus investigaciones, así como la transparencia en la presentación de datos y resultados. Además, se espera que las fuentes y referencias estén adecuadamente acreditadas para evitar el plagio.
        </p>
        <p>
          El comité de revisión se asegura de que todos los trabajos enviados cumplan con estos principios, y cualquier violación de las normas éticas resultará en la descalificación del trabajo.
        </p>
        <p>
          Invitamos a todos los investigadores a adherirse a los principios éticos de publicación para garantizar la integridad científica y contribuir al avance responsable del conocimiento.
        </p>
      </div>
    </div>
  );
};

export default CriteriosEticosPublicacion;
