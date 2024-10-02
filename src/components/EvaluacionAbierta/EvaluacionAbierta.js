import React from 'react';
import styles from './EvaluacionAbierta.module.css';

const EvaluacionAbierta = () => {
  return (
    <div className={styles.evaluacionContainer}>
      <div className={styles.canvas}>
        <h2>Evaluación Abierta</h2>
        <p>
          En el Portal de Carteles Científicos, promovemos una política de evaluación abierta, lo que permite que los procesos de revisión de los carteles sean transparentes y colaborativos. Creemos que la evaluación abierta contribuye al crecimiento del conocimiento científico, al involucrar tanto a los revisores como a la comunidad investigadora en general.
        </p>
        <p>
          Nuestro proceso de evaluación abierta permite que los revisores proporcionen comentarios públicos sobre los trabajos de investigación, fomentando un ambiente de debate constructivo y mejorando la calidad de los resultados publicados.
        </p>
        <p>
          La transparencia en el proceso de evaluación también ayuda a garantizar la integridad científica y proporciona a los autores retroalimentación valiosa que puede mejorar sus investigaciones.
        </p>
        <p>
          Invitamos a toda la comunidad científica a participar activamente en la evaluación abierta, con el objetivo de fortalecer la colaboración y avanzar en el desarrollo del conocimiento en todas las áreas de la ciencia.
        </p>
      </div>
    </div>
  );
};

export default EvaluacionAbierta;
