import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../../config/firebaseConfig";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const Dashboard = () => {
  const [cursos, setCursos] = useState([]);
  const [user, setUser] = useState(null);
  const [fotoPerfil, setFotoPerfil] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const location = useLocation();
  const { cursoNombre, cursoDescripcion } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (usuario) => {
      if (usuario) {
        setUser(usuario);

        // Obtener datos del perfil
        const perfilRef = doc(db, "perfiles", usuario.uid);
        const perfilSnap = await getDoc(perfilRef);
        if (perfilSnap.exists()) {
          setFotoPerfil(perfilSnap.data().fotoPerfil || "");
        }

        // Filtrar cursos por userId
        const cursosRef = collection(db, "materias");
        const q = query(cursosRef, where("userId", "==", usuario.uid));
        const querySnapshot = await getDocs(q);

        const cursosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCursos(cursosData);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleVideoSelection = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const redirectToFormulario = () => {
    navigate("/ver-prueba/:id");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/7 bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#FFC107] text-white py-10 flex flex-col items-center">
        {/* Menú lateral */}
      </div>

      {/* Main content */}
      <div className="w-full p-8 bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-[#1B5E20]">
            Aula Virtual
          </h2>
          <img
            src={fotoPerfil || "https://www.w3schools.com/w3images/avatar2.png"}
            alt="Foto de perfil"
            className="w-16 h-16 rounded-full border-2 border-gray-300"
          />
        </div>

        {/* Curso Seleccionado */}
        {cursoNombre && cursoDescripcion && (
          <div className="mt-8 mb-4">
            <h3 className="text-2xl font-semibold mb-2 text-[#1B5E20]">
              Curso Seleccionado
            </h3>
            <h4 className="text-xl font-semibold">{cursoNombre}</h4>
            <p className="mt-2">{cursoDescripcion}</p>
          </div>
        )}

        {/* Mis Cursos */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-[#1B5E20]">
            Mis Cursos
          </h3>
          {cursos.length > 0 ? (
            cursos.map((curso) => (
              <div key={curso.id} className="bg-gray-100 p-4 rounded-md mb-4">
                <h4 className="font-semibold text-lg text-[#2E7D32]">
                  {curso.nombre}
                </h4>

                {curso.videosRelacionados && (
                  <div className="flex">
                    <div className="w-2/3">
                      <h5 className="font-semibold text-lg mb-2 text-[#2E7D32]">
                        Videos Relacionados
                      </h5>
                      <div className="bg-white p-4 rounded-md shadow-md max-h-60 overflow-y-auto">
                        {curso.videosRelacionados.length > 0 ? (
                          curso.videosRelacionados.map((video, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleVideoSelection(video)}
                              className="w-full text-left p-2 hover:bg-gray-200 rounded-md mb-2"
                            >
                              Video {idx + 1}
                            </button>
                          ))
                        ) : (
                          <p>No hay videos relacionados.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {curso.materialEvaluativo && (
                  <div className="mt-4">
                    <h5 className="font-semibold text-lg mb-2 text-[#2E7D32]">
                      Material Evaluativo
                    </h5>
                    <div className="bg-white p-4 rounded-md shadow-md max-h-60 overflow-y-auto">
                      <a
                        href={curso.materialEvaluativo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-left p-2 hover:bg-gray-200 rounded-md mb-2 block text-[#FFC107]"
                      >
                        Descargar Material de Repaso
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No tienes cursos aún.</p>
          )}
        </div>

        {/* Botón para acceder al formulario de prueba */}
        <div className="mt-8">
          <button
            onClick={redirectToFormulario}
            className="bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#FFC107] text-white p-3 rounded-md hover:bg-[#2E7D32]"
          >
            Acceder al Formulario de Prueba
          </button>
        </div>

        {/* Video seleccionado */}
        {selectedVideo && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4 text-[#1B5E20]">
              Video Seleccionado
            </h3>
            <video width="100%" controls>
              <source src={selectedVideo} type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
