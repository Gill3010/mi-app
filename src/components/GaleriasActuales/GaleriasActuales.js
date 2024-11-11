import React, { useEffect, useState } from 'react';
import { getPublications, deletePublication, updatePublication } from '../../config/firebaseConfig';
import { auth } from '../../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { FiShare2, FiEye, FiHeart, FiShare } from 'react-icons/fi';
import doiLogo from './DOI_logo.svg.png'; // Icono de DOI
import orcidLogo from './orcid_logo2.png'; // Icono de ORCID

const GaleriasActuales = () => {
  const [galerias, setGalerias] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const publications = await getPublications();
        setGalerias(publications);
      } catch (error) {
        console.error("Error al obtener las publicaciones:", error);
        setError('No se pudo obtener las galerías');
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  const currentUserId = auth.currentUser ? auth.currentUser.uid : null;

  const incrementarVistas = async (id, vistasActuales) => {
    try {
      await updatePublication(id, { vistas: vistasActuales + 1 });
    } catch (error) {
      console.error("Error al incrementar vistas:", error);
    }
  };

  useEffect(() => {
    galerias.forEach((galeria) => {
      incrementarVistas(galeria.id, galeria.vistas);
    });
  }, [galerias]);

  const incrementarLikes = async (id, likesActuales) => {
    try {
      await updatePublication(id, { likes: likesActuales + 1 });
      setGalerias(prevGalerias =>
        prevGalerias.map(galeria => 
          galeria.id === id ? { ...galeria, likes: likesActuales + 1 } : galeria
        )
      );
    } catch (error) {
      console.error("Error al incrementar likes:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta publicación?")) {
      try {
        await deletePublication(id);
        setGalerias(galerias.filter(galeria => galeria.id !== id));
      } catch (error) {
        console.error("Error al eliminar la publicación:", error);
        setError('Error al eliminar la publicación. Intenta de nuevo.');
      }
    }
  };

  const handleEdit = (galeria) => {
    navigate('/EditarPublicacion', { state: { galeria } });
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleShare = (galeria) => {
    if (navigator.share) {
      navigator.share({
        title: galeria.tituloInvestigacion,
        text: `Consulta esta publicación: ${galeria.tituloInvestigacion} - DOI: ${galeria.doi}`,
        url: window.location.href
      }).catch((error) => console.error('Error al compartir:', error));
    } else {
      alert("La función de compartir no está disponible en este navegador.");
    }
  };

  if (loading) return <p className="text-center text-[#002855]">Cargando galerías...</p>;

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto bg-gradient-to-b from-[#f5faff] to-[#e0f7ff] min-h-screen overflow-x-hidden">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-[#002855]">Galerías Actuales</h2>
      {error && <p className="text-red-500">{error}</p>}
      {galerias.length === 0 && !error ? (
        <p className="text-center text-[#002855]">No hay galerías disponibles en este momento.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-1">
          {galerias.map((galeria) => (
            <div key={galeria.id} className="relative flex flex-col md:flex-row border border-[#4A90E2] bg-gradient-to-r from-white to-blue-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 border-2">
              <div className="md:w-1/3 p-2">
                {galeria.imagen ? (
                  <img 
                    src={galeria.imagen} 
                    alt="Imagen de la publicación" 
                    className="rounded-lg w-full h-48 md:h-full object-cover cursor-pointer shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105"
                    onClick={() => openModal(galeria.imagen)}
                  />
                ) : (
                  <div className="bg-gray-200 rounded w-full h-48 md:h-32 flex items-center justify-center text-[#002855]">Sin Imagen</div>
                )}
              </div>
              <div className="md:w-2/3 p-4 md:p-6 flex flex-col justify-between">
                <div className="text-[#002855] space-y-2">
                  <h3 className="text-2xl font-bold hover:underline hover:text-blue-700 cursor-pointer">
                    <span className="relative group">
                      Título de la investigación
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 w-max px-2 py-1 text-xs text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {galeria.tituloInvestigacion}
                      </span>
                    </span>
                  </h3>
                  <p className="text-sm md:text-base text-blue-800">
                    <strong>DOI:</strong> {galeria.doi}
                  </p>
                  <p className="text-sm md:text-base text-gray-600">
                    <strong>Autor:</strong> {galeria.nombreAutor} {galeria.apellidoAutor}
                  </p>
                  <p className="text-sm md:text-base">
                    <strong className="relative group cursor-pointer">
                      Institución
                      {galeria.institucion && (
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 w-max px-2 py-1 text-xs text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {galeria.institucion}
                        </span>
                      )}
                    </strong>
                  </p>
                  <p className="text-sm md:text-base"><strong>Fecha de Publicación:</strong> {new Date(galeria.fechaPublicacion.seconds * 1000).toLocaleDateString()}</p>
                  <p className="text-sm md:text-base">
                    <strong>ORCID:</strong>{' '}
                    <a href={`https://orcid.org/${galeria.orcid}`} target="_blank" rel="noopener noreferrer" className="text-[#4A90E2] inline-flex items-center">
                      <img src={orcidLogo} alt="ORCID Icon" className="inline-block w-5 h-5 mr-1" />
                    </a>
                  </p>
                  {galeria.resumen && (
                    <p className="text-sm md:text-base">
                      <strong>Resumen:</strong> <a href={galeria.resumen} target="_blank" rel="noopener noreferrer" className="text-blue-800 underline">Ver documento</a>
                    </p>
                  )}
                  {galeria.audio && (
                    <audio controls className="mt-2">
                      <source src={galeria.audio} type="audio/mp3" />
                      Tu navegador no soporta el elemento de audio.
                    </audio>
                  )}
                </div>

                <div className="absolute bottom-4 right-4 bg-[#004080] bg-opacity-90 text-white rounded-lg p-2 md:p-4 flex justify-around md:space-x-4 items-center shadow-lg transition duration-300">
                  <div className="flex items-center space-x-1">
                    <FiEye className="text-lg" />
                    <span className="text-sm">{galeria.vistas || 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiHeart onClick={() => incrementarLikes(galeria.id, galeria.likes)} className="cursor-pointer text-lg hover:text-red-400" />
                    <span className="text-sm">{galeria.likes || 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiShare onClick={() => handleShare(galeria)} className="cursor-pointer text-lg hover:text-[#4A90E2]" />
                    <span className="text-sm">{galeria.compartido || 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <img src={doiLogo} alt="DOI Icon" className="w-5 h-5" />
                    <span className="text-sm">{galeria.citas || 0}</span>
                  </div>
                </div>

                {currentUserId === galeria.userId && (
                  <div className="flex space-x-4 mt-2 md:mt-4 text-[#002855]">
                    <button onClick={() => handleEdit(galeria)} className="text-yellow-500 hover:text-yellow-600 font-semibold">
                      ✏️ Editar
                    </button>
                    <button onClick={() => handleDelete(galeria.id)} className="text-red-500 hover:text-red-600 font-semibold">
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4 overflow-hidden" onClick={closeModal}>
          <img src={selectedImage} alt="Imagen ampliada" className="max-w-full max-h-full rounded-lg shadow-lg object-contain" />
        </div>
      )}
    </div>
  );
};

export default GaleriasActuales;
