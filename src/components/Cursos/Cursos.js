import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirección dinámica
import { db } from '../../config/firebaseConfig'; // Asegúrate de que este archivo esté correctamente configurado
import { collection, getDocs } from 'firebase/firestore';

const Cursos = () => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook para redirección

  // Función para obtener los cursos desde Firestore
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log('Fetching courses from Firestore...');
        const querySnapshot = await getDocs(collection(db, 'cursos')); // Asegúrate de usar la colección correcta
        const cursosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log('Cursos obtenidos de Firestore:', cursosData); // Verifica los datos obtenidos
        setCourses(cursosData);
      } catch (error) {
        console.error('Error al obtener los cursos:', error); // Error al consultar Firestore
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
    const walk = (x - startX) * 2; // Velocidad del desplazamiento
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

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

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleCourseClick = (id) => {
    // Redirigir al componente de detalles del curso con el ID
    navigate(`/detalles-curso/${id}`);
  };

  if (loading) {
    console.log('Cargando cursos...'); // Indicador de carga
    return <p className="text-center text-xl">Cargando cursos...</p>;
  }

  if (courses.length === 0) {
    console.log('No hay cursos disponibles.'); // Cuando no hay cursos
    return <p className="text-center text-xl">No hay cursos disponibles en este momento.</p>;
  }

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 shadow-xl p-6 bg-white rounded-lg">
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
            className="min-w-[300px] flex flex-col bg-white border border-gray-300 p-4 rounded-lg shadow-lg cursor-pointer"
            onClick={() => handleCourseClick(course.id)} // Redirigir al hacer clic
          >
            <img
              src={course.imagen}
              alt={course.titulo}
              className="rounded-lg w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-blue-900">{course.titulo}</h2>
              <p className="text-gray-600 mt-2 text-sm">{course.descripcion}</p>
              <p className="text-gray-800 mt-4 font-bold">
                Precio: ${course.precio.toFixed(2)} USD
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cursos;
