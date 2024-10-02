import React from 'react';
import styles from './Nosotros.module.css';
import equipo1 from './images/Prueba.jpeg'; // Asegúrate de tener las imágenes correctas
import equipo2 from './images/Prueba.jpeg';

const Nosotros = () => {
  return (
    <div className={styles.nosotrosContainer}>
      <h2>Sobre Nosotros</h2>
      <p>Bienvenidos a nuestra organización. Somos un equipo comprometido con la investigación y la innovación.</p>
      
      <section className={styles.misionVision}>
        <div className={styles.mision}>
          <h3>Nuestra Misión</h3>
          <p>Brindar soluciones innovadoras y accesibles a través de la investigación.</p>
        </div>
        <div className={styles.vision}>
          <h3>Nuestra Visión</h3>
          <p>Ser líderes en investigación y desarrollo en nuestra área de especialización.</p>
        </div>
      </section>

      <section className={styles.equipo}>
        <h3>Conoce a Nuestro Equipo</h3>
        <div className={styles.equipoGrid}>
          <div className={styles.equipoCard}>
            <img src={equipo1} alt="Juan Pérez" className={styles.equipoImage} />
            <h4>Juan Pérez</h4>
            <p>Investigador Principal</p>
          </div>
          <div className={styles.equipoCard}>
            <img src={equipo2} alt="María García" className={styles.equipoImage} />
            <h4>María García</h4>
            <p>Desarrolladora</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;
