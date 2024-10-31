import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updatePublication } from '../../config/firebaseConfig';

const EditarPublicacion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const galeria = location.state?.galeria;

  useEffect(() => {
    if (!galeria) {
      navigate('/GaleriasActuales');
    }
  }, [galeria, navigate]);

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
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-[#002855]">Editar Publicación</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="tituloInvestigacion" value={formData.tituloInvestigacion} onChange={handleChange} placeholder="Título de la Investigación" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]" />
        <input type="text" name="nombreAutor" value={formData.nombreAutor} onChange={handleChange} placeholder="Nombre del Autor" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]" />
        <input type="text" name="apellidoAutor" value={formData.apellidoAutor} onChange={handleChange} placeholder="Apellido del Autor" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]" />
        <input type="text" name="institucion" value={formData.institucion} onChange={handleChange} placeholder="Institución" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]" />
        <input type="text" name="orcid" value={formData.orcid} onChange={handleChange} placeholder="ORCID" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]" />
        <input type="text" name="resumen" value={formData.resumen} onChange={handleChange} placeholder="Resumen (URL)" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]" />
        <input type="text" name="imagen" value={formData.imagen} onChange={handleChange} placeholder="URL de Imagen" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]" />
        <input type="text" name="audio" value={formData.audio} onChange={handleChange} placeholder="URL de Audio" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]" />
        <button type="submit" className="bg-[#002855] text-white py-2 px-4 rounded-lg hover:bg-[#005073] transition duration-300">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarPublicacion;
