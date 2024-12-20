import React, { useState, useEffect } from "react";
import { db } from "../../config/firebaseConfig"; // Firebase Firestore
import { collection, getDocs } from "firebase/firestore";

const VerPruebas = () => {
  const [pruebas, setPruebas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Función para obtener las pruebas de Firestore
  const fetchPruebas = async () => {
    try {
      const pruebasCollection = collection(db, "pruebas");
      const pruebaSnapshot = await getDocs(pruebasCollection);
      const pruebasList = pruebaSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPruebas(pruebasList);
    } catch (error) {
      console.error("Error al obtener las pruebas:", error);
      setErrorMessage(
        "Hubo un error al cargar las pruebas. Inténtalo nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  // Usar useEffect para cargar las pruebas cuando el componente se monte
  useEffect(() => {
    fetchPruebas();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#1E3A8A] to-[#4CAF50] flex items-center justify-center">
        <div className="text-white">Cargando pruebas...</div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#1E3A8A] to-[#4CAF50] flex items-center justify-center">
        <div className="text-white">{errorMessage}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1E3A8A] to-[#4CAF50] flex items-center justify-center">
      <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 shadow-xl">
          Ver Pruebas Creadas
        </h2>

        {/* Listar todas las pruebas */}
        {pruebas.length === 0 ? (
          <div className="text-center">No hay pruebas creadas aún.</div>
        ) : (
          pruebas.map((prueba) => (
            <div key={prueba.id} className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Prueba {prueba.id}</h3>

              {/* Asegurarse de que preguntas exista y sea un array */}
              {Array.isArray(prueba.preguntas) &&
              prueba.preguntas.length > 0 ? (
                prueba.preguntas.map((pregunta, index) => (
                  <div key={pregunta.id} className="mb-4">
                    <p className="font-bold">
                      Pregunta {index + 1}: {pregunta.pregunta}
                    </p>
                    <p className="italic">Tipo: {pregunta.tipo}</p>

                    {/* Opciones de las preguntas de tipo multiple */}
                    {pregunta.tipo === "multiple" && (
                      <ul>
                        {pregunta.opciones.map((opcion, i) => (
                          <li key={i} className="ml-4">
                            Opción {i + 1}: {opcion}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Respuesta para preguntas tipo verdaderoFalso */}
                    {pregunta.tipo === "verdaderoFalso" && (
                      <p className="ml-4">Respuesta: {pregunta.respuesta}</p>
                    )}

                    {/* Respuesta para preguntas de tipo corta o abierta */}
                    {(pregunta.tipo === "corta" ||
                      pregunta.tipo === "abierta") && (
                      <p className="ml-4">Respuesta: {pregunta.respuesta}</p>
                    )}
                  </div>
                ))
              ) : (
                <div>No hay preguntas en esta prueba.</div>
              )}

              {/* Mostrar archivo de respuestas si existe */}
              {prueba.archivoRespuestas && (
                <div className="mt-4">
                  <p className="font-semibold">Archivo de respuestas:</p>
                  <a
                    href={prueba.archivoRespuestas}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Descargar archivo de respuestas
                  </a>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VerPruebas;
