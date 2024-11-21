import React, { useRef, useState } from 'react';

const Cursos = () => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Velocidad del desplazamiento
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleImageClick = (videoUrl) => {
    setCurrentVideo(videoUrl);
  };

  const courses = [
    {
      id: 1,
      title: 'Curso 1',
      description: 'Introducción al curso en línea.',
      video: 'videos/curso1.mp4',
      file: 'files/curso1.pdf',
      audio: 'audio/curso1.mp3',
      image: 'img/Cursos.webp',
    },
    {
      id: 2,
      title: 'Curso 2',
      description: 'Curso avanzado para mejorar habilidades.',
      video: 'videos/curso2.mp4',
      file: 'files/curso2.pdf',
      audio: 'audio/curso2.mp3',
      image: 'img/Cursos.webp',
    },
    {
      id: 3,
      title: 'Curso 3',
      description: 'Curso especializado en tecnología avanzada.',
      video: 'videos/curso3.mp4',
      file: 'files/curso3.pdf',
      audio: 'audio/curso3.mp3',
      image: 'img/Cursos.webp',
    },
    {
      id: 4,
      title: 'Curso 4',
      description: 'Domina herramientas de gestión.',
      video: 'videos/curso4.mp4',
      file: 'files/curso4.pdf',
      audio: 'audio/curso4.mp3',
      image: 'img/Cursos.webp',
    },
    {
      id: 5,
      title: 'Curso 5',
      description: 'Aprende conceptos de diseño.',
      video: 'videos/curso5.mp4',
      file: 'files/curso5.pdf',
      audio: 'audio/curso5.mp3',
      image: 'img/Cursos.webp',
    },
    {
      id: 6,
      title: 'Curso 6',
      description: 'Explora técnicas avanzadas de desarrollo.',
      video: 'videos/curso6.mp4',
      file: 'files/curso6.pdf',
      audio: 'audio/curso6.mp3',
      image: 'img/Cursos.webp',
    },
    {
      id: 7,
      title: 'Curso 7',
      description: 'Descubre métodos de análisis de datos.',
      video: 'videos/curso7.mp4',
      file: 'files/curso7.pdf',
      audio: 'audio/curso7.mp3',
      image: 'img/Cursos.webp',
    },
    {
      id: 8,
      title: 'Curso 8',
      description: 'Mejora tus habilidades de liderazgo.',
      video: 'videos/curso8.mp4',
      file: 'files/curso8.pdf',
      audio: 'audio/curso8.mp3',
      image: 'img/Cursos.webp',
    },
  ];

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto bg-gray-100 min-h-screen">
      {/* Caja del título con sombra más intensa */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 shadow-xl p-6 bg-white rounded-lg">
        Cursos
      </h1>

      {/* Caja de la descripción con una sombra menos intensa */}
      <div className="text-center p-4 bg-white rounded-lg shadow-md mb-8">
        <p className="text-lg md:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
          Explora nuestros cursos en línea diseñados para tu crecimiento profesional y personal.
        </p>
      </div>

      {/* Contenedor del carrusel */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto space-x-6 scroll-smooth scrollbar-hide"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {courses.map((course) => (
          <div
            key={course.id}
            className="min-w-[300px] flex flex-col bg-white border border-gray-300 p-4 rounded-lg shadow-lg"
          >
            <img
              src={course.image}
              alt={course.title}
              className="rounded-lg w-full h-64 object-cover cursor-pointer"
              onClick={() => handleImageClick(course.video)}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-blue-900">{course.title}</h2>
              <p className="text-gray-600 mt-2 text-sm">{course.description}</p>
              <div className="mt-4 space-y-2">
                <a
                  href={course.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline text-sm"
                >
                  Descargar archivo
                </a>
                <audio controls className="w-full">
                  <source src={course.audio} type="audio/mp3" />
                  Tu navegador no soporta el elemento de audio.
                </audio>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para el video */}
      {currentVideo && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4"
          onClick={() => setCurrentVideo(null)}
        >
          <video
            src={currentVideo}
            controls
            autoPlay
            className="max-w-full max-h-full rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Botón para mostrar todos los cursos */}
      <div className="text-center mt-8">
        <button className="px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition duration-300">
          Mostrar todos los cursos
        </button>
      </div>
    </div>
  );
};

export default Cursos;
