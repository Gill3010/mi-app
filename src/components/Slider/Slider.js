import React, { useState, useEffect } from 'react';
import '../../output.css';  // Ajusta la ruta para llegar a output.css desde el componente Slider

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { id: 1, image: require('./images/Imagen1.webp'), title: 'Slide 1', link: '/Nosotros' },
    { id: 2, image: require('./images/Imagen2.webp'), title: 'Slide 2', link: '/FormularioEnvio' },
    { id: 3, image: require('./images/Imagen3.webp'), title: 'Slide 3', link: '/GaleriasActuales' },
    { id: 4, image: require('./images/Imagen4.webp'), title: 'Slide 4', link: '/Login' }
  ];

  // Cambia automáticamente al siguiente slide cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-64 md:h-80 object-cover rounded-lg" 
            />
            {/* Botón de más información */}
            <div className="absolute bottom-4 left-4">
              <a 
                href={slide.link} 
                className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition-colors"
              >
                Saber más
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Botones de navegación con íconos */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-900 text-white p-4 rounded-full hover:bg-gray-700 shadow-lg"
        aria-label="Previous Slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-900 text-white p-4 rounded-full hover:bg-gray-700 shadow-lg"
        aria-label="Next Slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-transform duration-300 ${
              currentSlide === index ? 'bg-white scale-125' : 'bg-gray-400'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
