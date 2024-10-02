import React, { useState, useEffect } from 'react';
import styles from './Slider.module.css';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '/img/Imagen1.webp',
    '/img/Imagen1.webp',
    '/img/Imagen1.webp',
    '/img/Imagen1.webp'
  ];

  // Cambiar la imagen automáticamente cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3 segundos

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonta
  }, [images.length]);

  // Cambiar imagen manualmente
  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        {/* Botón para ir a la imagen anterior */}
        <button onClick={prevSlide} className={styles.prevButton}>
          &#10094;
        </button>

        {/* Contenedor de todas las imágenes */}
        <div
          className={styles.sliderWrapper}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className={styles.sliderItem}>
              <img
                src={image}
                alt={`Descripción de la imagen ${index + 1}`}
                className={styles.sliderImage}
              />
            </div>
          ))}
        </div>

        {/* Botón para ir a la siguiente imagen */}
        <button onClick={nextSlide} className={styles.nextButton}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Slider;
