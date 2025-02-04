import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { db, storage } from "../../config/firebaseConfig"; // Firebase Firestore y Storage
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const FormularioCrearCurso = () => {
  const navigate = useNavigate(); // Hook para la redirección
  const [courseData, setCourseData] = useState({
    titulo: "",
    descripcion: "",
    imagen: "",
    precio: "",
    categoria: "",
    video: "",
    etiquetas: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "imagenFile") setImageFile(files[0]);
    if (name === "videoFile") setVideoFile(files[0]);
  };

  const uploadFile = (file, folder) => {
    return new Promise((resolve, reject) => {
      const fileRef = ref(storage, `${folder}/${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const validateData = () => {
    const { titulo, descripcion, precio, categoria } = courseData;
    if (
      !titulo.trim() ||
      !descripcion.trim() ||
      !precio.trim() ||
      !categoria.trim()
    ) {
      setErrorMessage(
        "Los campos de título, descripción, precio y categoría son obligatorios."
      );
      return false;
    }
    if (precio <= 0) {
      setErrorMessage("El precio debe ser un valor positivo.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateData()) return;

    setLoading(true);

    try {
      let imageUrl = courseData.imagen;
      let videoUrl = courseData.video;

      // Subir imagen si se seleccionó un archivo
      if (imageFile) {
        imageUrl = await uploadFile(imageFile, "imagenes");
      }

      // Subir video si se seleccionó un archivo
      if (videoFile) {
        videoUrl = await uploadFile(videoFile, "videos");
      }

      // Guardar los datos en Firestore
      await addDoc(collection(db, "cursos"), {
        ...courseData,
        imagen: imageUrl,
        video: videoUrl,
        etiquetas: courseData.etiquetas
          .split(",")
          .map((etiqueta) => etiqueta.trim()),
        precio: parseFloat(courseData.precio),
      });

      setSuccessMessage("¡Curso creado exitosamente!");
      setCourseData({
        titulo: "",
        descripcion: "",
        imagen: "",
        precio: "",
        categoria: "",
        video: "",
        etiquetas: "",
      });
      setImageFile(null);
      setVideoFile(null);

      // Redirigir al componente CrearMateria
      navigate("/crear-materia");
    } catch (error) {
      console.error("Error al crear el curso:", error);
      setErrorMessage("Hubo un error al crear el curso. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#FFC107]">
          Crear Nuevo Curso
        </h2>

        {successMessage && (
          <div className="mb-4 text-green-600 font-medium">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 text-red-600 font-medium">{errorMessage}</div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-lg shadow-lg"
        >
          <div>
            <label
              htmlFor="titulo"
              className="block text-[#1B5E20] font-medium mb-1"
            >
              Título del Curso
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={courseData.titulo}
              onChange={handleChange}
              className="w-full border border-[#1B5E20] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="descripcion"
              className="block text-[#1B5E20] font-medium mb-1"
            >
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={courseData.descripcion}
              onChange={handleChange}
              className="w-full border border-[#1B5E20] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
              rows="4"
              required
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="imagen"
              className="block text-[#1B5E20] font-medium mb-1"
            >
              URL de la Imagen
            </label>
            <input
              type="text"
              id="imagen"
              name="imagen"
              value={courseData.imagen}
              onChange={handleChange}
              className="w-full border border-[#1B5E20] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div>
            <label
              htmlFor="imagenFile"
              className="block text-[#1B5E20] font-medium mb-1"
            >
              Subir Imagen
            </label>
            <input
              type="file"
              id="imagenFile"
              name="imagenFile"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full border border-[#1B5E20] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
            />
          </div>

          <div>
            <label
              htmlFor="video"
              className="block text-[#1B5E20] font-medium mb-1"
            >
              URL del Video
            </label>
            <input
              type="text"
              id="video"
              name="video"
              value={courseData.video}
              onChange={handleChange}
              className="w-full border border-[#1B5E20] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
              placeholder="https://ejemplo.com/video.mp4"
            />
          </div>

          <div>
            <label
              htmlFor="videoFile"
              className="block text-[#1B5E20] font-medium mb-1"
            >
              Subir Video
            </label>
            <input
              type="file"
              id="videoFile"
              name="videoFile"
              onChange={handleFileChange}
              accept="video/*"
              className="w-full border border-[#1B5E20] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
            />
          </div>

          <div>
            <label
              htmlFor="precio"
              className="block text-[#1B5E20] font-medium mb-1"
            >
              Precio del Curso (USD)
            </label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={courseData.precio}
              onChange={handleChange}
              className="w-full border border-[#1B5E20] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
              placeholder="50"
              required
            />
          </div>

          <div>
            <label
              htmlFor="categoria"
              className="block text-[#1B5E20] font-medium mb-1"
            >
              Categoría del Curso
            </label>
            <select
              id="categoria"
              name="categoria"
              value={courseData.categoria}
              onChange={handleChange}
              className="w-full border border-[#1B5E20] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
              required
            >
              <option value="">Seleccione una categoría</option>
              <option value="Cursos">Cursos Generales</option>
              <option value="BusquedaSistematizada">
                Búsqueda sistematizada de Información con Herramientas IA
              </option>
              <option value="AnalisisDatosCualitativos">
                Análisis de datos cualitativos con apoyo de IA
              </option>
              <option value="UsoAtlasTi">
                Uso de Atlas Ti en investigación científica
              </option>
              <option value="GestionFondos">
                Gestión de Fondos para proyectos de Investigación
              </option>
              <option value="CulturaReciclaje">
                Cultura de Reciclaje y Basura Cero
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="etiquetas"
              className="block text-[#1B5E20] font-medium mb-1"
            >
              Etiquetas (separadas por coma)
            </label>
            <input
              type="text"
              id="etiquetas"
              name="etiquetas"
              value={courseData.etiquetas}
              onChange={handleChange}
              className="w-full border border-[#1B5E20] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
              placeholder="ejemplo1, ejemplo2"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className={`px-6 py-2 text-white font-bold rounded bg-gradient-to-r from-[#1B5E20] to-[#FFC107] ${
                loading ? "cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Creando Curso..." : "Crear Curso"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioCrearCurso;
