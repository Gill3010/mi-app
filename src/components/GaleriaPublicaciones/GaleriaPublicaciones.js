import React from "react";

const GaleriaPublicaciones = () => {
  const publicaciones = [
    {
      id: 1,
      titulo: "Investigación sobre inteligencia artificial en la educación",
      autor: "Dr. Juan Pérez",
      resumen:
        "Este estudio analiza el impacto de la inteligencia artificial en los métodos de enseñanza en el aula.",
      enlace: "#",
    },
    {
      id: 2,
      titulo: "Avances en la biotecnología para el tratamiento de enfermedades",
      autor: "Dra. María Gómez",
      resumen:
        "Revisión sobre las últimas innovaciones en biotecnología aplicadas a la medicina.",
      enlace: "#",
    },
    {
      id: 3,
      titulo: "Nuevas metodologías en la investigación científica",
      autor: "Dr. Luis Rodríguez",
      resumen:
        "Exploración de las nuevas metodologías que están transformando la investigación científica en diferentes campos.",
      enlace: "#",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-semibold text-center text-green-800 mb-8">
          ¡Bienvenido a nuestra Galería de Publicaciones Académicas y
          Científicas!
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Explore las últimas investigaciones, avances y metodologías que están
          transformando el mundo académico y científico.
        </p>

        {/* Sección de Marketing y Lanzamiento */}
        <div className="bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#FFC107] text-white text-center py-12 mb-12 rounded-lg shadow-lg">
          <h3 className="text-3xl font-bold mb-4">
            ¡Lanza tu propia galería de publicaciones científicas hoy!
          </h3>
          <p className="text-lg mb-6">
            Nos complace anunciar el lanzamiento de nuestra innovadora
            plataforma para la creación de galerías de publicaciones
            científicas. Únete a este nuevo servicio para compartir tus
            investigaciones con una audiencia global, establecer conexiones con
            otros académicos y científicos, y dar visibilidad a tu trabajo en un
            entorno profesional y colaborativo.
          </p>

          <a
            href="https://portaldecartelescientificos.org/FormularioEnvio"
            className="bg-white text-green-700 text-xl py-3 px-6 rounded-full hover:bg-green-800 hover:text-white transition duration-300"
          >
            ¡Crea tu propia galería ahora!
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {publicaciones.map((publicacion) => (
            <div
              key={publicacion.id}
              className="bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#FFC107] shadow-lg rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <h3 className="text-xl font-bold text-white">
                {publicacion.titulo}
              </h3>
              <p className="text-sm text-white">Autor: {publicacion.autor}</p>
              <p className="text-white mt-4">{publicacion.resumen}</p>
              <a
                href={publicacion.enlace}
                className="text-indigo-200 mt-4 block hover:underline"
              >
                Leer más
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GaleriaPublicaciones;
