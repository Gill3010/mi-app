import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const DetallesCurso = () => {
  const { id } = useParams(); // Obtener el ID del curso desde la URL
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para obtener los detalles del curso desde Firestore
    const fetchCurso = async () => {
      try {
        const docRef = doc(db, 'cursos', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCurso(docSnap.data());
        } else {
          console.error('No se encontró el curso.');
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurso();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!curso) return <p>No se encontró el curso.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-r from-[#1E3A8A] to-[#4CAF50]">
      {/* Imagen destacada como banner */}
      <div className="relative h-64 md:h-96 bg-gray-200">
        <img
          src={curso.imagen}
          alt={curso.titulo}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Título y descripción */}
      <div className="mt-6">
        <h1 className="text-4xl font-bold text-[#003366]">{curso.titulo}</h1>
        <p className="text-[#5A5A5A] mt-4">{curso.descripcion}</p>
      </div>

      {/* Botón de mostrar */}
      <div className="mt-6 text-center">
        <button className="px-6 py-3 bg-[#002855] text-white font-bold rounded-lg hover:bg-[#00A1E0]">
          Comprar ahora - ${curso.precio}
        </button>
      </div>

      {/* Video introductorio */}
      {curso.video && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#003366]">Video introductorio</h2>
          <video
            src={curso.video}
            controls
            className="w-full mt-4 rounded-lg shadow-lg"
          ></video>
        </div>
      )}

      {/* Sección de etiquetas */}
      {curso.etiquetas && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#003366]">Contenido del Curso</h2>
          <div className="flex flex-wrap gap-2 mt-4">
            {curso.etiquetas.map((etiqueta, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#E6F7F1] text-[#006D5B] rounded-full text-sm font-medium"
              >
                {etiqueta}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Planes de pago */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-[#003366] text-center">Planes de Pago</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Plan Básico */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow text-center hover:shadow-2xl transition duration-300 transform hover:scale-105">
            <h3 className="text-xl font-bold text-[#003366]">Plan Básico</h3>
            <p className="text-[#5A5A5A] mt-2">
              Cobro mensual: <span className="line-through">$19.90</span>{' '}
              <span className="text-[#006D5B] font-bold">$12.90</span>/mes
            </p>
            <p className="text-[#5A5A5A] text-sm mt-2">Acceso básico al contenido del curso.</p>
            <button className="px-4 py-2 mt-4 bg-[#002855] text-white rounded hover:bg-[#00A1E0]">
              Suscribirse
            </button>
          </div>

          {/* Plan Anual */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow text-center relative hover:shadow-2xl transition duration-300 transform hover:scale-105">
            <span className="absolute top-0 right-0 bg-[#006D5B] text-white text-xs font-bold px-2 py-1 rounded-bl">
              ¡Ahorra 20%!
            </span>
            <h3 className="text-xl font-bold text-[#003366]">Pase Anual</h3>
            <p className="text-[#5A5A5A] mt-2">
              Cobro anual: <span className="line-through">$238.80</span>{' '}
              <span className="text-[#006D5B] font-bold">$199.00</span>
            </p>
            <p className="text-[#5A5A5A] text-sm mt-2">
              Acceso completo al contenido por un año.
            </p>
            <button className="px-4 py-2 mt-4 bg-[#002855] text-white rounded hover:bg-[#00A1E0]">
              Suscribirse
            </button>
          </div>

          {/* Plan Premium */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow text-center hover:shadow-2xl transition duration-300 transform hover:scale-105">
            <h3 className="text-xl font-bold text-[#003366]">Acceso de por vida</h3>
            <p className="text-[#5A5A5A] mt-2">
              Pago único: <span className="line-through">$837</span>{' '}
              <span className="text-[#006D5B] font-bold">$499.00</span>
            </p>
            <p className="text-[#5A5A5A] text-sm mt-2">
              Acceso ilimitado al contenido y actualizaciones de por vida.
            </p>
            <button className="px-4 py-2 mt-4 bg-[#002855] text-white rounded hover:bg-[#00A1E0]">
              Suscribirse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallesCurso;
