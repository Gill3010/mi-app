import React, { useState } from 'react';
import { db } from '../../config/firebaseConfig'; // Configuración de Firebase
import { collection, addDoc } from 'firebase/firestore';

const FormularioCrearCurso = () => {
  const [courseData, setCourseData] = useState({
    titulo: '',
    descripcion: '',
    imagen: '',
    precio: '',
    categoria: '',
    video: '', // Campo para URL del video
    etiquetas: '', // Campo para etiquetas (como texto separado por comas)
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  // Validación básica de datos
  const validateData = () => {
    const { titulo, descripcion, imagen, precio, categoria, video } = courseData;
    if (!titulo.trim() || !descripcion.trim() || !imagen.trim() || !precio.trim() || !categoria.trim() || !video.trim()) {
      setErrorMessage('Todos los campos son obligatorios.');
      return false;
    }
    if (precio <= 0) {
      setErrorMessage('El precio debe ser un valor positivo.');
      return false;
    }
    if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(imagen)) {
      setErrorMessage('La URL de la imagen no es válida.');
      return false;
    }
    if (!/^https?:\/\/.+$/i.test(video)) {
      setErrorMessage('La URL del video no es válida.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpiar mensajes previos
    setSuccessMessage('');

    if (!validateData()) return; // Validar datos antes de continuar

    setLoading(true);

    try {
      // Guardar los datos en Firestore
      await addDoc(collection(db, 'cursos'), {
        ...courseData,
        etiquetas: courseData.etiquetas.split(',').map((etiqueta) => etiqueta.trim()), // Convertir etiquetas a array
        precio: parseFloat(courseData.precio), // Convertir precio a número
      });
      setSuccessMessage('¡Curso creado exitosamente!');
      setCourseData({
        titulo: '',
        descripcion: '',
        imagen: '',
        precio: '',
        categoria: '',
        video: '',
        etiquetas: '',
      });
    } catch (error) {
      console.error('Error al crear el curso:', error);
      setErrorMessage('Hubo un error al crear el curso. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Crear Nuevo Curso</h2>

      {/* Mensaje de éxito */}
      {successMessage && (
        <div className="mb-4 text-green-600 font-medium">
          {successMessage}
        </div>
      )}

      {/* Mensaje de error */}
      {errorMessage && (
        <div className="mb-4 text-red-600 font-medium">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo para Título */}
        <div>
          <label htmlFor="titulo" className="block text-gray-700 font-medium mb-1">
            Título del Curso
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={courseData.titulo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Campo para Descripción */}
        <div>
          <label htmlFor="descripcion" className="block text-gray-700 font-medium mb-1">
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={courseData.descripcion}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Campo para Imagen */}
        <div>
          <label htmlFor="imagen" className="block text-gray-700 font-medium mb-1">
            URL de la Imagen
          </label>
          <input
            type="text"
            id="imagen"
            name="imagen"
            value={courseData.imagen}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="https://ejemplo.com/imagen.jpg"
            required
          />
        </div>

        {/* Campo para Precio */}
        <div>
          <label htmlFor="precio" className="block text-gray-700 font-medium mb-1">
            Precio del Curso (USD)
          </label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={courseData.precio}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="50"
            required
          />
        </div>

        {/* Menú desplegable para Categoría */}
        <div>
          <label htmlFor="categoria" className="block text-gray-700 font-medium mb-1">
            Categoría del Curso
          </label>
          <select
            id="categoria"
            name="categoria"
            value={courseData.categoria}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Seleccione una categoría</option>
            <option value="Cursos">Cursos Generales</option>
            <option value="BusquedaSistematizada">Búsqueda sistematizada de Información con Herramientas IA</option>
            <option value="AnalisisDatosCualitativos">Análisis de datos cualitativos con apoyo de IA</option>
            <option value="UsoAtlasTi">Uso de Atlas Ti en investigación científica</option>
            <option value="GestionFondos">Gestión de Fondos para proyectos de Investigación</option>
            <option value="CulturaReciclaje">Cultura de Reciclaje y Basura Cero</option>
          </select>
        </div>

        {/* Campo para URL del Video */}
        <div>
          <label htmlFor="video" className="block text-gray-700 font-medium mb-1">
            URL del Video
          </label>
          <input
            type="text"
            id="video"
            name="video"
            value={courseData.video}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="https://ejemplo.com/video.mp4"
            required
          />
        </div>

        {/* Campo para Etiquetas */}
        <div>
          <label htmlFor="etiquetas" className="block text-gray-700 font-medium mb-1">
            Etiquetas (separadas por comas)
          </label>
          <input
            type="text"
            id="etiquetas"
            name="etiquetas"
            value={courseData.etiquetas}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="ejemplo1, ejemplo2, ejemplo3"
            required
          />
        </div>

        {/* Botón de Enviar */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition duration-200"
          disabled={loading}
        >
          {loading ? 'Creando...' : 'Crear Curso'}
        </button>
      </form>
    </div>
  );
};

export default FormularioCrearCurso;
