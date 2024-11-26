import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Cursos = () => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'cursos'));
        const cursosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(cursosData);
      } catch (error) {
        console.error('Error al obtener los cursos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

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

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => setIsDragging(false);

  const handleCourseClick = (id) => {
    navigate(`/detalles-curso/${id}`);
  };

  if (loading) {
    return <p className="text-center text-xl">Cargando cursos...</p>;
  }

  if (courses.length === 0) {
    return <p className="text-center text-xl">No hay cursos disponibles en este momento.</p>;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#1E3A8A] to-[#4CAF50] p-6 md:p-12">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 shadow-xl p-6 bg-white rounded-lg">
        Cursos
      </h1>
      <div className="text-center p-4 bg-white rounded-lg shadow-md mb-8">
        <p className="text-lg md:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
          Explora nuestros cursos en línea diseñados para tu crecimiento profesional y personal.
        </p>
      </div>

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
            className="min-w-[300px] flex flex-col bg-white border border-[#002855] p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition duration-300 transform hover:scale-105 hover:bg-[#005073]"
            onClick={() => handleCourseClick(course.id)}
          >
            <img
              src={course.imagen}
              alt={course.titulo}
              className="rounded-lg w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-[#003366]">{course.titulo}</h2>
              <p className="text-gray-600 mt-2 text-sm">{course.descripcion}</p>
              <p className="text-gray-800 mt-4 font-bold text-[#005599]">
                Precio: {course.precio ? `$${course.precio.toFixed(2)}` : 'No disponible'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cursos;