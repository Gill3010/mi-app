import React, { useState } from "react";
import { db, storage } from "../../config/firebaseConfig"; // Firebase Firestore y Storage
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const FormularioPrueba = () => {
  const [formData, setFormData] = useState({
    preguntas: [
      {
        id: Date.now(),
        tipo: "multiple",
        pregunta: "",
        opciones: [],
        respuesta: "",
      },
    ],
    archivoRespuestas: null,
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      preguntas: [
        ...formData.preguntas,
        {
          id: Date.now(),
          tipo: "multiple",
          pregunta: "",
          opciones: [],
          respuesta: "",
        },
      ],
    });
  };

  const handleDeleteQuestion = (id) => {
    setFormData({
      ...formData,
      preguntas: formData.preguntas.filter((pregunta) => pregunta.id !== id),
    });
  };

  const handleQuestionChange = (id, e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      preguntas: formData.preguntas.map((pregunta) =>
        pregunta.id === id ? { ...pregunta, [name]: value } : pregunta
      ),
    });
  };

  const handleOptionChange = (id, index, e) => {
    const { value } = e.target;
    const preguntasActualizadas = formData.preguntas.map((pregunta) =>
      pregunta.id === id
        ? {
            ...pregunta,
            opciones: pregunta.opciones.map((opcion, i) =>
              i === index ? value : opcion
            ),
          }
        : pregunta
    );
    setFormData({
      ...formData,
      preguntas: preguntasActualizadas,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, archivoRespuestas: e.target.files[0] });
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
          reject(
            new Error(
              "Hubo un problema al subir el archivo. Por favor, inténtalo de nuevo."
            )
          );
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

    if (!formData.archivoRespuestas) {
      setErrorMessage("Por favor, sube un archivo con tus respuestas.");
      return;
    }

    setLoading(true);

    let respuestasUrl = "";

    try {
      // Subir archivo de respuestas
      respuestasUrl = await uploadFile(
        formData.archivoRespuestas,
        "respuestasPrueba"
      );

      // Guardar las respuestas en Firestore
      const pruebasRef = collection(db, "pruebas");
      await addDoc(pruebasRef, {
        preguntas: formData.preguntas,
        archivoRespuestas: respuestasUrl, // URL del archivo de respuestas
      });

      setSuccessMessage("¡Prueba enviada exitosamente!");
      setFormData({
        preguntas: [
          {
            id: Date.now(),
            tipo: "multiple",
            pregunta: "",
            opciones: [],
            respuesta: "",
          },
        ],
        archivoRespuestas: null,
      });
    } catch (error) {
      console.error("Error al enviar la prueba:", error);
      setErrorMessage("Hubo un error al enviar la prueba. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#FFC107]">
          Crea tu prueba
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
          {formData.preguntas.map((pregunta, index) => (
            <div key={pregunta.id} className="mb-4">
              <div className="mb-2">
                <label className="block">Pregunta {index + 1}</label>
                <input
                  type="text"
                  name="pregunta"
                  value={pregunta.pregunta}
                  onChange={(e) => handleQuestionChange(pregunta.id, e)}
                  className="border-2 border-gray-300 p-2 w-full"
                  placeholder="Escribe la pregunta aquí"
                  required
                />
              </div>

              {/* Tipo de pregunta */}
              <div className="mb-2">
                <label className="block">Tipo de pregunta</label>
                <select
                  name="tipo"
                  value={pregunta.tipo}
                  onChange={(e) => handleQuestionChange(pregunta.id, e)}
                  className="border-2 border-gray-300 p-2 w-full"
                >
                  <option value="multiple">Opción Múltiple</option>
                  <option value="verdaderoFalso">Cierto/Falso</option>
                  <option value="corta">Respuesta Corta</option>
                  <option value="abierta">Pregunta Abierta</option>
                </select>
              </div>

              {/* Mostrar campos según el tipo de pregunta */}
              {pregunta.tipo === "multiple" && (
                <div>
                  <label className="block">Opciones</label>
                  {pregunta.opciones.map((opcion, i) => (
                    <div key={i} className="flex mb-2">
                      <input
                        type="text"
                        value={opcion}
                        onChange={(e) => handleOptionChange(pregunta.id, i, e)}
                        className="border-2 border-gray-300 p-2 w-full mr-2"
                        placeholder={`Opción ${i + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const opciones = pregunta.opciones.filter(
                            (_, idx) => idx !== i
                          );
                          setFormData({
                            ...formData,
                            preguntas: formData.preguntas.map((item) =>
                              item.id === pregunta.id
                                ? { ...item, opciones }
                                : item
                            ),
                          });
                        }}
                        className="text-red-500"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      const opciones = [...pregunta.opciones, ""];
                      setFormData({
                        ...formData,
                        preguntas: formData.preguntas.map((item) =>
                          item.id === pregunta.id ? { ...item, opciones } : item
                        ),
                      });
                    }}
                    className="text-blue-500"
                  >
                    Agregar opción
                  </button>
                </div>
              )}

              {pregunta.tipo === "verdaderoFalso" && (
                <div>
                  <label className="block">Respuesta Cierto/Falso</label>
                  <select
                    name="respuesta"
                    value={pregunta.respuesta}
                    onChange={(e) => handleQuestionChange(pregunta.id, e)}
                    className="border-2 border-gray-300 p-2 w-full"
                  >
                    <option value="verdadero">Verdadero</option>
                    <option value="falso">Falso</option>
                  </select>
                </div>
              )}

              {pregunta.tipo === "corta" && (
                <div>
                  <label className="block">Respuesta Corta</label>
                  <input
                    type="text"
                    name="respuesta"
                    value={pregunta.respuesta}
                    onChange={(e) => handleQuestionChange(pregunta.id, e)}
                    className="border-2 border-gray-300 p-2 w-full"
                    placeholder="Escribe tu respuesta corta"
                  />
                </div>
              )}

              {pregunta.tipo === "abierta" && (
                <div>
                  <label className="block">Pregunta Abierta</label>
                  <textarea
                    name="respuesta"
                    value={pregunta.respuesta}
                    onChange={(e) => handleQuestionChange(pregunta.id, e)}
                    className="border-2 border-gray-300 p-2 w-full"
                    placeholder="Escribe tu respuesta abierta"
                  />
                </div>
              )}

              {/* Botón eliminar pregunta */}
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(pregunta.id)}
                  className="text-red-500"
                >
                  Eliminar pregunta
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-center mb-4">
            <button
              type="button"
              onClick={handleAddQuestion}
              className="bg-gradient-to-r from-[#1B5E20] to-[#FFC107] text-white py-2 px-6 rounded-lg shadow-lg hover:from-[#2E7D32] hover:to-[#FF9800]"
            >
              Agregar pregunta
            </button>
          </div>

          {/* Subir archivo de respuestas */}
          <div>
            <label className="block">Sube tu archivo de respuestas</label>
            <input type="file" onChange={handleFileChange} required />
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#1B5E20] to-[#FFC107] text-white py-2 px-6 rounded-lg shadow-lg hover:bg-gradient-to-l disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar prueba"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioPrueba;
