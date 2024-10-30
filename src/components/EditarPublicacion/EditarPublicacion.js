import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updatePublication } from '../../config/firebaseConfig';

const EditarPublicacion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Obtener los datos de la publicación desde el estado de la navegación
  const galeria = location.state?.galeria;

  // Verificar si los datos de la publicación existen, en caso contrario redirigir al usuario
  useEffect(() => {
    if (!galeria) {
      navigate('/GaleriasActuales');
    }
  }, [galeria, navigate]);

  // Estado local para manejar los cambios en el formulario
  const [formData, setFormData] = useState({
    tituloInvestigacion: galeria?.tituloInvestigacion || '',
    nombreAutor: galeria?.nombreAutor || '',
    apellidoAutor: galeria?.apellidoAutor || '',
    institucion: galeria?.institucion || '',
    orcid: galeria?.orcid || '',
    resumen: galeria?.resumen || '',
    vistas: galeria?.vistas || 0,
    likes: galeria?.likes || 0,
    audio: galeria?.audio || '',
    imagen: galeria?.imagen || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updatePublication(galeria.id, formData);
      alert('Publicación actualizada con éxito');
      navigate('/GaleriasActuales');
    } catch (error) {
      console.error("Error al actualizar la publicación:", error);
      alert('No se pudo actualizar la publicación. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Editar Publicación</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="tituloInvestigacion" value={formData.tituloInvestigacion} onChange={handleChange} placeholder="Título de la Investigación" required className="w-full px-4 py-2 border rounded-lg" />
        <input type="text" name="nombreAutor" value={formData.nombreAutor} onChange={handleChange} placeholder="Nombre del Autor" required className="w-full px-4 py-2 border rounded-lg" />
        <input type="text" name="apellidoAutor" value={formData.apellidoAutor} onChange={handleChange} placeholder="Apellido del Autor" required className="w-full px-4 py-2 border rounded-lg" />
        <input type="text" name="institucion" value={formData.institucion} onChange={handleChange} placeholder="Institución" className="w-full px-4 py-2 border rounded-lg" />
        <input type="text" name="orcid" value={formData.orcid} onChange={handleChange} placeholder="ORCID" className="w-full px-4 py-2 border rounded-lg" />
        <input type="text" name="resumen" value={formData.resumen} onChange={handleChange} placeholder="Resumen (URL)" className="w-full px-4 py-2 border rounded-lg" />
        <input type="text" name="imagen" value={formData.imagen} onChange={handleChange} placeholder="URL de Imagen" className="w-full px-4 py-2 border rounded-lg" />
        <input type="text" name="audio" value={formData.audio} onChange={handleChange} placeholder="URL de Audio" className="w-full px-4 py-2 border rounded-lg" />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarPublicacion;
