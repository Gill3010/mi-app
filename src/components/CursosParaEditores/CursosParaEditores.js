import React, { useRef, useState } from 'react';

const CursosParaEditores = () => {
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
    const walk = (x - startX) * 2;
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
      title: 'Edición Básica',
      description: 'Introducción a los conceptos fundamentales de la edición.',
      video: 'videos/editor1.mp4',
      file: 'files/editor1.pdf',
      audio: 'audio/editor1.mp3',
      image: 'img/Editores.jpg',
    },
    {
      id: 2,
      title: 'Edición Avanzada',
      description: 'Curso avanzado para editores experimentados.',
      video: 'videos/editor2.mp4',
      file: 'files/editor2.pdf',
      audio: 'audio/editor2.mp3',
      image: 'img/Editores.jpg',
    },
    {
      id: 3,
      title: 'Gestión Editorial',
      description: 'Aprende a gestionar proyectos editoriales de principio a fin.',
      video: 'videos/editor3.mp4',
      file: 'files/editor3.pdf',
      audio: 'audio/editor3.mp3',
      image: 'img/Editores.jpg',
    },
    {
      id: 4,
      title: 'Gestión Editorial Avanzada',
      description: 'Domina las técnicas avanzadas de gestión editorial.',
      video: 'videos/editor4.mp4',
      file: 'files/editor4.pdf',
      audio: 'audio/editor4.mp3',
      image: 'img/Editores.jpg',
    },
    {
      id: 5,
      title: 'Edición de Publicaciones Académicas',
      description: 'Especialización en edición de publicaciones académicas.',
      video: 'videos/editor5.mp4',
      file: 'files/editor5.pdf',
      audio: 'audio/editor5.mp3',
      image: 'img/Editores.jpg',
    },
  ];

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto bg-gray-100">
      {/* Título del componente */}
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 shadow-xl p-6 bg-white rounded-lg">
        Cursos para Editores
      </h2>

      {/* Descripción del componente */}
      <div className="text-center p-4 bg-white rounded-lg shadow-md mb-8">
        <p className="text-lg md:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
          Conoce nuestros cursos diseñados especialmente para editores, enfocados en habilidades clave de edición y publicación.
        </p>
      </div>

      {/* Carrusel */}
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
              <h3 className="text-xl font-semibold text-blue-900">{course.title}</h3>
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

export default CursosParaEditores;
