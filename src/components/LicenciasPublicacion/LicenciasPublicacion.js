import React from 'react';
import styles from './LicenciasPublicacion.module.css';

const LicenciasPublicacion = () => {
  return (
    <div className={styles.licenciasContainer}>
      <div className={styles.canvas}>
        <h2>Licencias de Publicación</h2>
        <p>
          En el Portal de Carteles Científicos, nos comprometemos a ofrecer diversas opciones de licencias de publicación para garantizar que los autores mantengan control sobre sus trabajos y que los lectores puedan beneficiarse del conocimiento compartido.
        </p>
        <p>
          Los autores que publican en nuestro portal pueden elegir entre una variedad de licencias que van desde licencias de acceso abierto, como Creative Commons, hasta licencias más restrictivas que limitan la redistribución o el uso comercial de sus trabajos.
        </p>
        <p>
          Creemos firmemente en el equilibrio entre la protección de los derechos de autor y la accesibilidad del conocimiento científico. Ofrecemos orientación a los autores sobre las opciones de licencias disponibles, asegurando que tomen decisiones informadas sobre cómo desean compartir su investigación.
        </p>
        <p>
          Invitamos a los investigadores a explorar nuestras políticas de licencias y a seleccionar la opción que mejor se adapte a sus necesidades y objetivos académicos.
        </p>
      </div>
    </div>
  );
};

export default LicenciasPublicacion;
