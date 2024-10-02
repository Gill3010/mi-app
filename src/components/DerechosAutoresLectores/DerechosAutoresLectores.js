import React from 'react';
import styles from './DerechosAutoresLectores.module.css';

const DerechosAutoresLectores = () => {
  return (
    <div className={styles.derechosContainer}>
      <div className={styles.canvas}>
        <h2>Derechos de Autores y Lectores</h2>
        <p>
          En el Portal de Carteles Científicos, respetamos los derechos de los autores y los lectores. Garantizamos que los trabajos de investigación publicados en nuestro portal estén protegidos por los derechos de autor, asegurando que los autores mantengan el control sobre su propiedad intelectual.
        </p>
        <p>
          Nos comprometemos a que todos los carteles científicos estén debidamente acreditados y que los autores reciban el reconocimiento apropiado por su trabajo. La protección de los derechos de autor es fundamental para fomentar la confianza y la colaboración entre investigadores.
        </p>
        <p>
          Asimismo, ofrecemos a los lectores acceso libre y gratuito a los trabajos publicados en nuestro portal, asegurando que puedan beneficiarse del conocimiento científico sin restricciones.
        </p>
        <p>
          Invitamos a los autores a publicar sus investigaciones en nuestra plataforma, con la certeza de que sus derechos serán respetados, y a los lectores a disfrutar de un acceso ilimitado al contenido científico.
        </p>
      </div>
    </div>
  );
};

export default DerechosAutoresLectores;
