import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const DetallesCurso = () => {
  const { id } = useParams(); // Obtener el ID del curso desde la URL
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook para navegación

  useEffect(() => {
    // Función para obtener los detalles del curso desde Firestore
    const fetchCurso = async () => {
      try {
        const docRef = doc(db, "cursos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCurso(docSnap.data());
        } else {
          console.error("No se encontró el curso.");
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurso();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!curso) return <p>No se encontró el curso.</p>;

  // Función para manejar el clic en el botón de compra
  const handleBuyNow = () => {
    // Redirige al dashboard con los datos del curso
    navigate("/dashboard", {
      state: {
        cursoNombre: curso.titulo,
        cursoDescripcion: curso.descripcion,
      },
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#1E3A8A] to-[#4CAF50] p-6 md:p-12">
      {/* Imagen destacada como banner */}
      <div className="relative h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
        <img
          src={curso.imagen}
          alt={curso.titulo}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Título y descripción */}
      <div className="mt-6 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 shadow-md p-2 bg-white rounded-lg inline-block">
          {curso.titulo}
        </h1>
        <p className="text-lg md:text-xl text-white mt-4">
          {curso.descripcion}
        </p>
      </div>

      {/* Botón de comprar */}
      <div className="mt-6 text-center">
        <button
          onClick={handleBuyNow} // Asigna la función de redirección al botón
          className="px-6 py-3 bg-[#002855] text-white font-bold rounded-lg hover:bg-[#00A1E0] transition duration-300"
        >
          Comprar ahora - ${curso.precio}
        </button>
      </div>

      {/* Video introductorio */}
      {curso.video && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center text-[#003366] mb-4">
            Video introductorio
          </h2>
          <video
            src={curso.video}
            controls
            className="w-full rounded-lg shadow-lg"
          ></video>
        </div>
      )}

      {/* Sección de etiquetas */}
      {curso.etiquetas && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center text-[#003366]">
            Contenido del Curso
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {curso.etiquetas.map((etiqueta, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#E6F7F1] text-[#006D5B] rounded-full text-sm font-medium shadow-md"
              >
                {etiqueta}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Planes de pago */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center text-[#003366] mb-6">
          Planes de Pago
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Plan Básico */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg text-center hover:shadow-2xl hover:scale-105 transition duration-300">
            <h3 className="text-xl font-bold text-[#003366]">Plan Básico</h3>
            <p className="text-[#5A5A5A] mt-2">
              Cobro mensual: <span className="line-through">$19.90</span>{" "}
              <span className="text-[#006D5B] font-bold">$12.90</span>/mes
            </p>
            <p className="text-[#5A5A5A] text-sm mt-2">
              Acceso básico al contenido del curso.
            </p>
            <button className="px-4 py-2 mt-4 bg-[#002855] text-white rounded hover:bg-[#00A1E0] transition duration-300">
              Suscribirse
            </button>
          </div>

          {/* Plan Anual */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg text-center relative hover:shadow-2xl hover:scale-105 transition duration-300">
            <span className="absolute top-0 right-0 bg-[#006D5B] text-white text-xs font-bold px-2 py-1 rounded-bl">
              ¡Ahorra 20%!
            </span>
            <h3 className="text-xl font-bold text-[#003366]">Pase Anual</h3>
            <p className="text-[#5A5A5A] mt-2">
              Cobro anual: <span className="line-through">$238.80</span>{" "}
              <span className="text-[#006D5B] font-bold">$199.00</span>
            </p>
            <p className="text-[#5A5A5A] text-sm mt-2">
              Acceso completo al contenido por un año.
            </p>
            <button className="px-4 py-2 mt-4 bg-[#002855] text-white rounded hover:bg-[#00A1E0] transition duration-300">
              Suscribirse
            </button>
          </div>

          {/* Plan Premium */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg text-center hover:shadow-2xl hover:scale-105 transition duration-300">
            <h3 className="text-xl font-bold text-[#003366]">
              Acceso de por vida
            </h3>
            <p className="text-[#5A5A5A] mt-2">
              Pago único: <span className="line-through">$837</span>{" "}
              <span className="text-[#006D5B] font-bold">$499.00</span>
            </p>
            <p className="text-[#5A5A5A] text-sm mt-2">
              Acceso ilimitado al contenido y actualizaciones de por vida.
            </p>
            <button className="px-4 py-2 mt-4 bg-[#002855] text-white rounded hover:bg-[#00A1E0] transition duration-300">
              Suscribirse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallesCurso;
