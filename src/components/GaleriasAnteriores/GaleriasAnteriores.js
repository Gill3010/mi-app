import React, { useEffect, useState } from "react";
import {
  getPastPublications,
  deletePastPublication,
  updatePastPublication,
} from "../../config/firebaseConfig";
import { auth } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { FiEye, FiHeart, FiUser } from "react-icons/fi";
import { FaQuoteLeft, FaShareAlt } from "react-icons/fa";
import "./GaleriasAnteriores.css";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

const GaleriasAnteriores = () => {
  const [galerias, setGalerias] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPastPublications = async () => {
      try {
        const publications = await getPastPublications();

        publications.sort((a, b) => {
          const nameA = `${a.nombreAutor} ${a.apellidoAutor}`.toLowerCase();
          const nameB = `${b.nombreAutor} ${b.apellidoAutor}`.toLowerCase();
          return nameA.localeCompare(nameB);
        });

        setGalerias(publications);
      } catch (error) {
        console.error("Error al obtener las galerías anteriores:", error);
        setError("No se pudo obtener las galerías anteriores");
      } finally {
        setLoading(false);
      }
    };

    fetchPastPublications();
  }, []);

  const currentUserId = auth.currentUser ? auth.currentUser.uid : null;

  const incrementarVistas = async (id) => {
    const docRef = doc(db, "pastPublications", id);
    try {
      await updateDoc(docRef, { vistas: increment(1) });
    } catch (error) {
      console.error("Error al incrementar vistas:", error);
    }
  };

  useEffect(() => {
    galerias.forEach((galeria) => {
      incrementarVistas(galeria.id);
    });
  }, [galerias]);

  const incrementarLikes = async (id) => {
    const docRef = doc(db, "pastPublications", id);
    try {
      await updateDoc(docRef, { likes: increment(1) });
      setGalerias((prevGalerias) =>
        prevGalerias.map((galeria) =>
          galeria.id === id ? { ...galeria, likes: galeria.likes + 1 } : galeria
        )
      );
    } catch (error) {
      console.error("Error al incrementar likes:", error);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar esta publicación?")
    ) {
      try {
        await deletePastPublication(id);
        setGalerias(galerias.filter((galeria) => galeria.id !== id));
      } catch (error) {
        console.error("Error al eliminar la publicación:", error);
        setError("Error al eliminar la publicación. Intenta de nuevo.");
      }
    }
  };

  const handleEdit = (galeria) => {
    navigate("/EditarPublicacion", {
      state: { galeria, isPastPublication: true },
    });
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleShare = (galeria) => {
    if (navigator.share) {
      navigator
        .share({
          title: galeria.tituloInvestigacion,
          text: `Consulta esta publicación: ${galeria.tituloInvestigacion} - DOI: ${galeria.doi}`,
          url: window.location.href,
        })
        .then(() => {
          incrementShareCount(galeria.id, galeria.compartido);
        })
        .catch((error) => console.error("Error al compartir:", error));
    } else {
      alert("La función de compartir no está disponible en este navegador.");
    }
  };

  const incrementShareCount = async (id, currentShareCount) => {
    const newShareCount = currentShareCount + 1;
    const docRef = doc(db, "pastPublications", id);
    try {
      await updateDoc(docRef, { compartido: newShareCount });
      console.log(
        `Contador de veces compartidas actualizado: ${newShareCount}`
      );
    } catch (error) {
      console.error(
        "Error al actualizar el contador de veces compartidas:",
        error
      );
    }
  };

  if (loading)
    return (
      <p className="text-center text-[#002855]">
        Cargando galerías anteriores...
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1E3A8A] to-[#4CAF50] p-6 md:p-12">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 shadow-lg">
        Vol 1-1 II Encuentro de Investigaciones Cualitativas
      </h2>

      <p className="text-center text-xl font-semibold text-transparent bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text mt-4 shadow-md p-2 rounded-md">
        Del 16 al 20 de septiembre del 2024
      </p>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {galerias.length === 0 && !error ? (
        <p className="text-center text-blue-900">
          No hay galerías anteriores disponibles en este momento.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1">
          {galerias.map((galeria) => (
            <div
              key={galeria.id}
              className="relative flex flex-col md:flex-row bg-white border border-[#002855] p-4 sm:p-6 rounded-lg shadow-lg transition hover:shadow-2xl duration-300"
            >
              <div className="md:w-1/3 mb-4 sm:mb-6 md:mb-0 p-2">
                {galeria.imagen ? (
                  <div className="w-full aspect-square md:aspect-auto">
                    <img
                      src={galeria.imagen}
                      alt="Imagen de la publicación"
                      className="rounded-lg w-full h-full object-contain md:object-cover cursor-pointer transition-transform duration-300 transform hover:scale-105"
                      onClick={() => openModal(galeria.imagen)}
                    />
                  </div>
                ) : (
                  <div className="bg-gray-200 rounded-lg w-full h-48 md:h-full flex items-center justify-center text-blue-900">
                    Sin Imagen
                  </div>
                )}
              </div>
              <div className="md:w-2/3 p-4 flex flex-col justify-between">
                <div className="text-blue-900 space-y-2 sm:space-y-3">
                  <h3 className="text-xl sm:text-2xl font-semibold hover:text-blue-800 transition cursor-pointer relative group">
                    Título de la investigación
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 w-max px-2 py-1 text-xs text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {galeria.tituloInvestigacion}
                    </span>
                  </h3>
                  <p>
                    <strong>DOI:</strong> {galeria.doi}
                  </p>
                  <p>
                    <strong>Autor:</strong> {galeria.nombreAutor}{" "}
                    {galeria.apellidoAutor}
                  </p>

                  {galeria.orcid && (
                    <p className="text-xs sm:text-sm md:text-base">
                      <strong>ORCID:</strong>{" "}
                      <a
                        href={`https://orcid.org/${galeria.orcid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 inline-flex items-center"
                      >
                        <FiUser className="w-4 h-4 mr-1" /> Ver perfil
                      </a>
                    </p>
                  )}

                  <p className="relative group cursor-pointer">
                    <strong>Afiliación</strong>
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 w-max px-2 py-1 text-xs text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {galeria.institucion || "No disponible"}
                    </span>
                  </p>
                  <p>
                    <strong>Fecha de Publicación:</strong>
                    {galeria.fechaPublicacion &&
                    galeria.fechaPublicacion.seconds
                      ? new Date(
                          galeria.fechaPublicacion.seconds * 1000
                        ).toLocaleDateString()
                      : "Fecha no disponible"}
                  </p>
                  {galeria.resumen && (
                    <p>
                      <strong>Resumen:</strong>{" "}
                      <a
                        href={galeria.resumen}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-800 underline"
                      >
                        Ver documento
                      </a>
                    </p>
                  )}
                  {galeria.audio && (
                    <audio controls className="mt-4 w-full">
                      <source src={galeria.audio} type="audio/mp3" />
                      Tu navegador no soporta el elemento de audio.
                    </audio>
                  )}
                </div>
                <div className="flex space-x-4 sm:space-x-6 mt-4 text-[#002855] bg-[#006D5B] rounded-lg border border-[#002855] p-3 shadow-sm">
                  <div className="tooltip flex items-center space-x-1">
                    <FiEye className="text-lg sm:text-xl hover:text-[#006D5B] transition-colors cursor-pointer" />
                    <span>{galeria.vistas || 0}</span>
                    <span className="tooltiptext">Vistas</span>
                  </div>
                  <div
                    className="tooltip flex items-center space-x-1 cursor-pointer"
                    onClick={() => incrementarLikes(galeria.id)}
                  >
                    <FiHeart className="text-lg sm:text-xl hover:text-red-400 transition-colors" />
                    <span>{galeria.likes || 0}</span>
                    <span className="tooltiptext">Likes</span>
                  </div>
                  <div
                    className="tooltip flex items-center space-x-1 cursor-pointer"
                    onClick={() => handleShare(galeria)}
                  >
                    <FaShareAlt className="text-lg sm:text-xl hover:text-[#006D5B] transition-colors" />
                    <span className="text-xs sm:text-base">
                      {galeria.compartido || 0}
                    </span>
                    <span className="tooltiptext w-20">Compartir</span>
                  </div>
                  <div className="tooltip flex items-center space-x-1">
                    <FaQuoteLeft className="text-lg sm:text-xl hover:text-[#006D5B] transition-colors" />
                    <span className="text-xs sm:text-base">
                      {galeria.citas || 0}
                    </span>
                    <span className="tooltiptext">Citas</span>
                  </div>
                </div>
                {currentUserId === galeria.userId && (
                  <div className="flex space-x-2 sm:space-x-4 mt-4 text-blue-900">
                    <button
                      onClick={() => handleEdit(galeria)}
                      className="text-yellow-500 hover:text-yellow-600 font-semibold"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDelete(galeria.id)}
                      className="text-red-500 hover:text-red-600 font-semibold"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4 overflow-hidden"
          onClick={closeModal}
        >
          <img
            src={selectedImage}
            alt="Imagen ampliada"
            className="max-w-full max-h-full rounded-lg shadow-lg object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default GaleriasAnteriores;
