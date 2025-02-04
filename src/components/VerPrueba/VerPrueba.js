import React, { useState, useEffect } from "react";
import { auth, db } from "../../config/firebaseConfig"; // Firebase Firestore y Auth
import { collection, getDocs, query, where } from "firebase/firestore";

const VerPruebas = () => {
  const [pruebas, setPruebas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        setUser(usuario);
        fetchPruebas(usuario.uid);
      } else {
        setUser(null);
        setPruebas([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchPruebas = async (userId) => {
    try {
      const pruebasCollection = collection(db, "pruebas");
      const q = query(pruebasCollection, where("userId", "==", userId));
      const pruebaSnapshot = await getDocs(q);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#FFC107] flex items-center justify-center">
        <div className="text-white">Cargando pruebas...</div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#FFC107] flex items-center justify-center">
        <div className="text-white">{errorMessage}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#FFC107] shadow-xl">
          Ver Mis Pruebas
        </h2>

        {pruebas.length === 0 ? (
          <div className="text-center">No tienes pruebas creadas aún.</div>
        ) : (
          pruebas.map((prueba) => (
            <div key={prueba.id} className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Prueba {prueba.id}</h3>
              {Array.isArray(prueba.preguntas) &&
              prueba.preguntas.length > 0 ? (
                prueba.preguntas.map((pregunta, index) => (
                  <div key={pregunta.id} className="mb-4">
                    <p className="font-bold">
                      Pregunta {index + 1}: {pregunta.pregunta}
                    </p>
                    <p className="italic">Tipo: {pregunta.tipo}</p>
                    {pregunta.tipo === "multiple" && (
                      <ul>
                        {pregunta.opciones.map((opcion, i) => (
                          <li key={i} className="ml-4">
                            Opción {i + 1}: {opcion}
                          </li>
                        ))}
                      </ul>
                    )}
                    {(pregunta.tipo === "verdaderoFalso" ||
                      pregunta.tipo === "corta" ||
                      pregunta.tipo === "abierta") && (
                      <p className="ml-4">Respuesta: {pregunta.respuesta}</p>
                    )}
                  </div>
                ))
              ) : (
                <div>No hay preguntas en esta prueba.</div>
              )}
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
