import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../../redux/actions/searchActions';
import { FiEye, FiHeart, FiUser } from 'react-icons/fi';
import { FaQuoteLeft, FaShareAlt } from 'react-icons/fa';
import { increment, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

const Resultados = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);

  const { results, loading, error } = useSelector((state) => state.search);
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      dispatch(search(query));
    }
  }, [query, dispatch]);

  const handleDetailsClick = (id) => {
    navigate(`/detalles/${id}`);
  };

  const formatDate = (timestamp) => {
    if (timestamp) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleDateString();
    }
    return "Fecha no disponible";
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleIncrementViews = async (id) => {
    const docRef = doc(db, "publicaciones", id);
    await updateDoc(docRef, {
      vistas: increment(1),
    });
    dispatch(search(query));
  };

  const handleIncrementLikes = async (id) => {
    const docRef = doc(db, "publicaciones", id);
    await updateDoc(docRef, {
      likes: increment(1),
    });
    dispatch(search(query));
  };

  const handleShare = async (id, title) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Consulta esta publicación: ${title}`,
          url: window.location.href,
        });
        incrementShareCount(id);
      } catch (error) {
        console.error("Error al compartir:", error);
      }
    } else {
      alert("La función de compartir no está disponible en este navegador.");
    }
  };

  const incrementShareCount = async (id) => {
    const docRef = doc(db, "publicaciones", id);
    try {
      await updateDoc(docRef, {
        compartido: increment(1),
      });
      dispatch(search(query));
    } catch (error) {
      console.error('Error al actualizar el contador de veces compartidas:', error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#1E3A8A] to-[#4CAF50] text-white p-8">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 shadow-lg">
        Resultados de la Búsqueda
      </h2>

      {loading && <p className="text-[#002855] text-center">Cargando resultados...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div>
        {results && Array.isArray(results) && results.length > 0 ? (
          <ul className="space-y-6">
            {results.map((item) => (
              <li
                key={item.id}
                className="p-6 border border-gray-200 rounded-lg hover:shadow-xl transition duration-300 ease-in-out hover:border-[#002855] relative bg-white text-[#002855]"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-[#002855] rounded-t-lg"></div>

                {item.imagen && (
                  <img
                    src={item.imagen}
                    alt={item.tituloInvestigacion}
                    className="w-full h-auto mb-3 rounded-lg shadow-sm cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(item.imagen);
                    }}
                  />
                )}

                <h3 className="text-xl font-semibold relative group cursor-pointer mb-1">
                  <strong>Título de la investigación</strong>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-3 py-1 text-xs text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.tituloInvestigacion}
                  </span>
                </h3>
                <p className="mb-2"><strong>DOI:</strong> {item.doi || "No disponible"}</p>

                <p className="font-medium mb-1">
                  <strong>Autor:</strong> {item.nombreAutor} {item.apellidoAutor}
                </p>
                <p className="flex items-center mb-1">
                  <strong>ORCID:</strong>{" "}
                  <a
                    href={`https://orcid.org/${item.orcid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline flex items-center ml-1"
                  >
                    <FiUser className="w-4 h-4 mr-1" /> Ver perfil
                  </a>
                </p>

                <p className="relative group cursor-pointer mb-1">
                  <strong>Afiliación</strong>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-3 py-1 text-xs text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.institucion || "Afiliación no disponible"}
                  </span>
                </p>

                <p className="mb-3">
                  <strong>Fecha de Publicación:</strong> {formatDate(item.fechaPublicacion)}
                </p>

                {item.resumen ? (
                  <p className="mb-3">
                    <strong>Resumen:</strong>{" "}
                    <a href={item.resumen} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      Ver documento
                    </a>
                  </p>
                ) : (
                  <p className="mb-3"><strong>Resumen no disponible</strong></p>
                )}

                {item.audio && <audio controls src={item.audio} className="mt-4 w-full" />}

                <button
                  onClick={() => handleDetailsClick(item.id)}
                  className="mt-4 px-4 py-2 bg-[#002855] text-white rounded-md hover:bg-[#005073] focus:outline-none"
                >
                  Ver detalles
                </button>

                <div className="flex space-x-4 mt-4 text-[#002855] bg-[#006D5B] rounded-lg border border-gray-300 p-3 shadow-md">
                  <div className="tooltip flex items-center space-x-1 cursor-pointer" onClick={() => handleIncrementViews(item.id)}>
                    <FiEye className="text-lg hover:text-[#006D5B] transition-colors" />
                    <span className="text-sm">{item.vistas || 0}</span>
                  </div>
                  <div className="tooltip flex items-center space-x-1 cursor-pointer" onClick={() => handleIncrementLikes(item.id)}>
                    <FiHeart className="text-lg hover:text-red-400 transition-colors" />
                    <span className="text-sm">{item.likes || 0}</span>
                  </div>
                  <div className="tooltip flex items-center space-x-1 cursor-pointer" onClick={() => handleShare(item.id, item.tituloInvestigacion)}>
                    <FaShareAlt className="text-lg hover:text-[#006D5B] transition-colors" />
                    <span className="text-sm">{item.compartido || 0}</span>
                  </div>
                  <div className="tooltip flex items-center space-x-1">
                    <FaQuoteLeft className="text-lg hover:text-[#006D5B] transition-colors" />
                    <span className="text-sm">{item.citas || 0}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#002855] text-center">No se encontraron resultados</p>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4 overflow-hidden"
          onClick={closeModal}
        >
          <img src={selectedImage} alt="Imagen ampliada" className="max-w-full max-h-full rounded-lg shadow-lg object-contain" />
        </div>
      )}
    </div>
  );
};

export default Resultados;