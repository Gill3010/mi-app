import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { db, storage } from "../../config/firebaseConfig"; // Firebase Firestore y Storage
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const FormularioCrearMateria = () => {
  const [materiaData, setMateriaData] = useState({
    nombre: "",
  });

  const [videoFiles, setVideoFiles] = useState([]);
  const [materialFile, setMaterialFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Hook para redirección

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMateriaData({ ...materiaData, [name]: value });
  };

  const handleFileChange = (e, index) => {
    const newFiles = [...videoFiles];
    newFiles[index] = e.target.files[0];
    setVideoFiles(newFiles);
  };

  const handleMaterialChange = (e) => {
    setMaterialFile(e.target.files[0]);
  };

  const addFileInput = () => {
    setVideoFiles([...videoFiles, null]);
  };

  const uploadFile = (file, folder) => {
    return new Promise((resolve, reject) => {
      const fileRef = ref(storage, `${folder}/${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Error al subir el archivo:", error);
          reject(new Error("Hubo un problema al subir el archivo."));
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            console.error("Error al obtener la URL del archivo:", error);
            reject(new Error("No se pudo obtener el enlace del archivo."));
          }
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!materiaData.nombre.trim()) {
      setErrorMessage("El nombre de la materia es obligatorio.");
      return;
    }

    if (videoFiles.length === 0 || videoFiles.some((file) => file === null)) {
      setErrorMessage("Por favor, sube al menos un video.");
      return;
    }

    if (!materialFile) {
      setErrorMessage("Por favor, sube un archivo de material evaluativo.");
      return;
    }

    setLoading(true);

    const videoUrls = [];
    let materialUrl = "";

    try {
      for (const file of videoFiles) {
        if (file) {
          const videoUrl = await uploadFile(file, "videos");
          videoUrls.push(videoUrl);
        }
      }

      materialUrl = await uploadFile(materialFile, "materialesEvaluativos");

      const materiasRef = collection(db, "materias");
      await addDoc(materiasRef, {
        nombre: materiaData.nombre,
        videosRelacionados: videoUrls,
        materialEvaluativo: materialUrl,
      });

      setSuccessMessage("¡Materia creada exitosamente!");
      setMateriaData({ nombre: "" });
      setVideoFiles([]);
      setMaterialFile(null);

      // Redirección al componente formulario-prueba
      navigate("/formulario-prueba");
    } catch (error) {
      console.error("Error al crear la materia:", error);
      setErrorMessage("Hubo un error al crear la materia. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1E3A8A] to-[#4CAF50] flex items-center justify-center">
      <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 shadow-xl">
          Crear Nueva Materia
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
              htmlFor="nombre"
              className="block text-[#002855] font-medium mb-1"
            >
              Nombre de la Materia
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={materiaData.nombre}
              onChange={handleChange}
              className="w-full border border-[#002855] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002855]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="videoFiles"
              className="block text-[#002855] font-medium mb-1"
            >
              Subir Videos
            </label>
            {videoFiles.map((file, index) => (
              <div key={index} className="mb-4">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange(e, index)}
                  className="w-full border border-[#002855] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002855]"
                />
                {file && (
                  <p className="text-sm text-gray-500 mt-1">
                    Archivo seleccionado: {file.name}
                  </p>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addFileInput}
              className="mt-2 py-2 px-4 bg-blue-600 text-white rounded-md"
            >
              Agregar otro video
            </button>
          </div>

          <div>
            <label
              htmlFor="materialFile"
              className="block text-[#002855] font-medium mb-1"
            >
              Subir Material Evaluativo (PDF, DOC, DOCX)
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleMaterialChange}
              className="w-full border border-[#002855] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002855]"
              required
            />
            {materialFile && (
              <p className="text-sm text-gray-500 mt-1">
                Archivo seleccionado: {materialFile.name}
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="mt-4 py-2 px-8 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-md hover:bg-gradient-to-r hover:from-blue-700 hover:to-green-600"
            >
              {loading ? "Cargando..." : "Crear Materia"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioCrearMateria;
