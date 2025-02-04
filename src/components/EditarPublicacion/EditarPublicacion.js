import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  updatePublication,
  updatePastPublication,
  uploadFile,
} from "../../config/firebaseConfig"; // Asegúrate de tener una función para subir archivos

const EditarPublicacion = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const galeria = location.state?.galeria;
  const isPastPublication = location.state?.isPastPublication || false; // Verificar si es una publicación anterior

  useEffect(() => {
    if (!galeria) {
      navigate("/GaleriasActuales");
    }
  }, [galeria, navigate]);

  const [formData, setFormData] = useState({
    tituloInvestigacion: galeria?.tituloInvestigacion || "",
    nombreAutor: galeria?.nombreAutor || "",
    apellidoAutor: galeria?.apellidoAutor || "",
    institucion: galeria?.institucion || "",
    orcid: galeria?.orcid || "",
    resumen: galeria?.resumen || "",
    vistas: galeria?.vistas || 0,
    likes: galeria?.likes || 0,
    audio: galeria?.audio || "",
    imagen: galeria?.imagen || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = async (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      const url = await uploadFile(file); // Suponiendo que uploadFile devuelve la URL del archivo subido
      setFormData({
        ...formData,
        [name]: url,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isPastPublication) {
        // Usar la función para actualizar en "pastPublications"
        await updatePastPublication(galeria.id, formData);
      } else {
        // Usar la función para actualizar en "publicaciones"
        await updatePublication(galeria.id, formData);
      }

      alert("Publicación actualizada con éxito");
      navigate(isPastPublication ? "/GaleriasAnteriores" : "/GaleriasActuales");
    } catch (error) {
      console.error("Error al actualizar la publicación:", error);
      alert("No se pudo actualizar la publicación. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#FFC107]">
        Editar Publicación
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-lg"
      >
        <input
          type="text"
          name="tituloInvestigacion"
          value={formData.tituloInvestigacion}
          onChange={handleChange}
          placeholder="Título de la Investigación"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
        />
        <input
          type="text"
          name="nombreAutor"
          value={formData.nombreAutor}
          onChange={handleChange}
          placeholder="Nombre del Autor"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
        />
        <input
          type="text"
          name="apellidoAutor"
          value={formData.apellidoAutor}
          onChange={handleChange}
          placeholder="Apellido del Autor"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
        />
        <input
          type="text"
          name="institucion"
          value={formData.institucion}
          onChange={handleChange}
          placeholder="Institución"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
        />
        <input
          type="text"
          name="orcid"
          value={formData.orcid}
          onChange={handleChange}
          placeholder="ORCID"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
        />

        {/* Campo de archivo para el resumen */}
        <label className="block text-sm font-semibold text-[#2E7D32]">
          Subir Resumen:
        </label>
        <input
          type="file"
          name="resumen"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
        />

        {/* Campo de archivo para la imagen */}
        <label className="block text-sm font-semibold text-[#2E7D32]">
          Subir Imagen:
        </label>
        <input
          type="file"
          name="imagen"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
        />

        {/* Campo de archivo para el audio */}
        <label className="block text-sm font-semibold text-[#2E7D32]">
          Subir Audio:
        </label>
        <input
          type="file"
          name="audio"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#FFC107] text-white py-2 px-4 rounded-lg hover:bg-[#2E7D32] transition duration-300"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarPublicacion;
