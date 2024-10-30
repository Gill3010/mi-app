import React, { useEffect, useState } from 'react';
import { getPublications, deletePublication, updatePublication } from '../../config/firebaseConfig';
import { auth } from '../../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const GaleriasActuales = () => {
  const [galerias, setGalerias] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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

  // Función para incrementar vistas de la publicación
  const incrementarVistas = async (id, vistasActuales) => {
    try {
      await updatePublication(id, { vistas: vistasActuales + 1 });
    } catch (error) {
      console.error("Error al incrementar vistas:", error);
    }
  };

  // Incrementar vistas cuando se monta el componente y se cargan las publicaciones
  useEffect(() => {
    galerias.forEach((galeria) => {
      incrementarVistas(galeria.id, galeria.vistas);
    });
  }, [galerias]);

  // Función para incrementar likes de la publicación
  const incrementarLikes = async (id, likesActuales) => {
    try {
      await updatePublication(id, { likes: likesActuales + 1 });
      // Actualizar el estado local para reflejar el cambio
      setGalerias(prevGalerias =>
        prevGalerias.map(galeria => 
          galeria.id === id ? { ...galeria, likes: likesActuales + 1 } : galeria
        )
      );
    } catch (error) {
      console.error("Error al incrementar likes:", error);
    }
  };

  // Función para eliminar una publicación
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

  // Función para redirigir al usuario a la página de edición con los datos de la publicación
  const handleEdit = (galeria) => {
    navigate('/EditarPublicacion', { state: { galeria } });
  };

  if (loading) return <p>Cargando galerías...</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Galerías Actuales</h2>
      {error && <p className="text-red-500">{error}</p>}
      {galerias.length === 0 && !error ? (
        <p>No hay galerías disponibles en este momento.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-1">
          {galerias.map((galeria) => (
            <div key={galeria.id} className="flex flex-col md:flex-row border p-4 rounded shadow bg-white">
              <div className="md:w-1/3 p-2">
                {galeria.imagen ? (
                  <img src={galeria.imagen} alt="Imagen de la publicación" className="rounded w-full h-full object-cover" />
                ) : (
                  <div className="bg-gray-200 rounded w-full h-32 flex items-center justify-center">Sin Imagen</div>
                )}
              </div>
              <div className="md:w-2/3 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{galeria.tituloInvestigacion}</h3>
                  <p className="text-gray-600 mb-1">
                    <strong>Autor:</strong> {galeria.nombreAutor} {galeria.apellidoAutor}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Institución:</strong> {galeria.institucion || 'No disponible'}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Fecha de Publicación:</strong> {new Date(galeria.fechaPublicacion.seconds * 1000).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>ORCID:</strong> <a href={`https://orcid.org/${galeria.orcid}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{galeria.orcid || 'No disponible'}</a>
                  </p>
                  {galeria.resumen && (
                    <p>
                      <strong>Resumen:</strong> <a href={galeria.resumen} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Ver documento</a>
                    </p>
                  )}
                  <p className="text-gray-600 mb-1">
                    <strong>Vistas:</strong> {galeria.vistas} | <strong>Likes:</strong> {galeria.likes}
                  </p>
                  <button onClick={() => incrementarLikes(galeria.id, galeria.likes)} className="text-blue-500 hover:text-blue-700">
                    👍 Me gusta
                  </button>
                  {galeria.audio && (
                    <div className="my-2">
                      <strong>Audio:</strong>
                      <audio controls src={galeria.audio} className="w-full mt-2" />
                    </div>
                  )}
                </div>
                {currentUserId === galeria.userId && (
                  <div className="flex space-x-4 mt-4">
                    <button onClick={() => handleEdit(galeria)} className="text-yellow-500 hover:text-yellow-700">
                      ✏️ Editar
                    </button>
                    <button onClick={() => handleDelete(galeria.id)} className="text-red-500 hover:text-red-700">
                      🗑️ Eliminar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GaleriasActuales;
