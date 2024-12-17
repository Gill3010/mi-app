import React, { useState } from "react";
import { db, storage } from "../../config/firebaseConfig"; // Firebase Firestore y Storage
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const FormularioPrueba = () => {
  const [pruebaData, setPruebaData] = useState({
    nombre: "Prueba de Evaluación - Inteligencia Artificial en Investigación",
    opcionMultiple: {
      googleLabs: "",
      sunoAI: "",
      hotPotAI: "",
    },
    verdaderoFalso: {
      civitAI: "",
      arcBrowser: "",
      raskAI: "",
    },
    respuestaCorta: {
      ventajasPerplexity: "",
      mylensAI: "",
      voiceGPT: "",
    },
    preguntasAbiertas: {
      comparacionUpsCayl: "",
      analisisMylensAI: "",
      impactoArcBrowser: "",
    },
    archivoRespuestas: null, // Campo para archivo de respuestas
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPruebaData((prevData) => ({
      ...prevData,
      [name.split(".")[0]]: {
        ...prevData[name.split(".")[0]],
        [name.split(".")[1]]: value,
      },
    }));
  };

  const handleFileChange = (e) => {
    setPruebaData({ ...pruebaData, archivoRespuestas: e.target.files[0] });
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

    if (!pruebaData.archivoRespuestas) {
      setErrorMessage("Por favor, sube un archivo con tus respuestas.");
      return;
    }

    setLoading(true);

    let respuestasUrl = "";

    try {
      // Subir archivo de respuestas
      respuestasUrl = await uploadFile(
        pruebaData.archivoRespuestas,
        "respuestasPrueba"
      );

      // Guardar las respuestas en Firestore
      const pruebasRef = collection(db, "pruebas");
      await addDoc(pruebasRef, {
        nombre: pruebaData.nombre,
        opcionesMultiples: pruebaData.opcionMultiple,
        verdaderoFalso: pruebaData.verdaderoFalso,
        respuestasCortas: pruebaData.respuestaCorta,
        preguntasAbiertas: pruebaData.preguntasAbiertas,
        archivoRespuestas: respuestasUrl, // URL del archivo de respuestas
      });

      setSuccessMessage("¡Prueba enviada exitosamente!");
      setPruebaData({
        nombre:
          "Prueba de Evaluación - Inteligencia Artificial en Investigación",
        opcionMultiple: {
          googleLabs: "",
          sunoAI: "",
          hotPotAI: "",
        },
        verdaderoFalso: {
          civitAI: "",
          arcBrowser: "",
          raskAI: "",
        },
        respuestaCorta: {
          ventajasPerplexity: "",
          mylensAI: "",
          voiceGPT: "",
        },
        preguntasAbiertas: {
          comparacionUpsCayl: "",
          analisisMylensAI: "",
          impactoArcBrowser: "",
        },
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
    <div className="min-h-screen bg-gradient-to-r from-[#1E3A8A] to-[#4CAF50] flex items-center justify-center">
      <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 shadow-xl">
          {pruebaData.nombre}
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
          {/* Parte 1: Opción Múltiple */}
          <h3 className="text-xl font-semibold">Parte 1: Opción Múltiple</h3>
          <div>
            <label className="block">¿Qué es Google Labs?</label>
            <select
              name="opcionMultiple.googleLabs"
              value={pruebaData.opcionMultiple.googleLabs}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="a">a) Un sistema de procesamiento de texto</option>
              <option value="b">
                b) Plataforma para experimentar con nuevas tecnologías de Google
              </option>
              <option value="c">c) Red social</option>
              <option value="d">
                d) Herramienta de desarrollo de videojuegos
              </option>
            </select>
          </div>

          <div>
            <label className="block">
              ¿Cuál de las siguientes es una ventaja de usar Suno AI?
            </label>
            <select
              name="opcionMultiple.sunoAI"
              value={pruebaData.opcionMultiple.sunoAI}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="a">
                a) Mejorar la productividad en la gestión de proyectos
              </option>
              <option value="b">
                b) Crear música y sonidos personalizados mediante IA
              </option>
              <option value="c">
                c) Entrenar modelos de IA sin experiencia técnica
              </option>
              <option value="d">
                d) Generar respuestas a preguntas en internet
              </option>
            </select>
          </div>

          <div>
            <label className="block">¿Qué permite hacer Hot Pot AI?</label>
            <select
              name="opcionMultiple.hotPotAI"
              value={pruebaData.opcionMultiple.hotPotAI}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="a">
                a) Crear y analizar imágenes generadas por IA
              </option>
              <option value="b">b) Automatizar procesos de escritura</option>
              <option value="c">c) Mejorar la gestión de proyectos</option>
              <option value="d">d) Convertir texto en voz</option>
            </select>
          </div>

          {/* Parte 2: Verdadero/Falso */}
          <h3 className="text-xl font-semibold">Parte 2: Verdadero/Falso</h3>
          <div>
            <label className="block">
              Civit AI está diseñado para crear modelos de IA sin necesidad de
              experiencia técnica.
            </label>
            <select
              name="verdaderoFalso.civitAI"
              value={pruebaData.verdaderoFalso.civitAI}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione Verdadero o Falso</option>
              <option value="verdadero">Verdadero</option>
              <option value="falso">Falso</option>
            </select>
          </div>

          <div>
            <label className="block">
              Arc Browser es un navegador web que mejora la experiencia de
              usuario mediante herramientas de personalización y productividad.
            </label>
            <select
              name="verdaderoFalso.arcBrowser"
              value={pruebaData.verdaderoFalso.arcBrowser}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione Verdadero o Falso</option>
              <option value="verdadero">Verdadero</option>
              <option value="falso">Falso</option>
            </select>
          </div>

          <div>
            <label className="block">
              Rask AI es una plataforma para crear música utilizando
              inteligencia artificial.
            </label>
            <select
              name="verdaderoFalso.raskAI"
              value={pruebaData.verdaderoFalso.raskAI}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione Verdadero o Falso</option>
              <option value="verdadero">Verdadero</option>
              <option value="falso">Falso</option>
            </select>
          </div>

          {/* Parte 3: Respuesta Corta */}
          <h3 className="text-xl font-semibold">Parte 3: Respuesta Corta</h3>
          <div>
            <label className="block">
              ¿Qué ventajas ofrece Perplexity respecto a otros motores de
              búsqueda?
            </label>
            <input
              type="text"
              name="respuestaCorta.ventajasPerplexity"
              value={pruebaData.respuestaCorta.ventajasPerplexity}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block">
              Explica brevemente cómo Mylens AI puede ser útil para la
              organización de imágenes.
            </label>
            <input
              type="text"
              name="respuestaCorta.mylensAI"
              value={pruebaData.respuestaCorta.mylensAI}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block">
              ¿Cómo puede Voice GPT mejorar la interacción entre usuarios y
              máquinas?
            </label>
            <input
              type="text"
              name="respuestaCorta.voiceGPT"
              value={pruebaData.respuestaCorta.voiceGPT}
              onChange={handleChange}
              required
            />
          </div>

          {/* Parte 4: Preguntas Abiertas */}
          <h3 className="text-xl font-semibold">Parte 4: Preguntas Abiertas</h3>
          <div>
            <label className="block">
              Compara el uso de Ups Cayl con otras herramientas de
              productividad. ¿Qué beneficios tiene su implementación en equipos
              de trabajo?
            </label>
            <textarea
              name="preguntasAbiertas.comparacionUpsCayl"
              value={pruebaData.preguntasAbiertas.comparacionUpsCayl}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block">
              Imagina que eres un investigador que necesita realizar un análisis
              rápido de datos visuales. ¿Cómo utilizarías Mylens AI para
              organizar y analizar las imágenes?
            </label>
            <textarea
              name="preguntasAbiertas.analisisMylensAI"
              value={pruebaData.preguntasAbiertas.analisisMylensAI}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block">
              ¿Cuál es el impacto de Arc Browser en la forma en que trabajamos y
              colaboramos en línea?
            </label>
            <textarea
              name="preguntasAbiertas.impactoArcBrowser"
              value={pruebaData.preguntasAbiertas.impactoArcBrowser}
              onChange={handleChange}
              required
            />
          </div>

          {/* Subir archivo de respuestas */}
          <div>
            <label className="block">Sube tu archivo de respuestas</label>
            <input type="file" onChange={handleFileChange} required />
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 disabled:opacity-50"
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
