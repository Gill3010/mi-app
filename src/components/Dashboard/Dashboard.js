import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Importar useLocation
import { auth, db } from "../../config/firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [cursos, setCursos] = useState([]); // Estado para los cursos del usuario
  const [user, setUser] = useState(null); // Estado para el usuario
  const [fotoPerfil, setFotoPerfil] = useState(""); // Estado para la foto de perfil
  const [selectedVideo, setSelectedVideo] = useState(null); // Estado para el video seleccionado

  // Obtener los datos del curso desde la ubicación (redirección)
  const location = useLocation();
  const { cursoNombre, cursoDescripcion } = location.state || {}; // Acceder a los datos del curso

  // Usamos el hook useNavigate para gestionar la redirección
  const navigate = useNavigate();

  // Redirige a la ruta correspondiente según el item del menú
  const handleMenuItemClick = (title) => {
    if (title === "Inicio") {
      navigate("/perfil-estudiante"); // Redirigir al perfil
    } else if (title === "Mis cursos") {
      navigate("/dashboard"); // Redirigir al dashboard
    } else if (title === "Mi progreso") {
      navigate("/progreso"); // Redirigir a la página de progreso
    } else if (title === "Notificaciones") {
      navigate("/notificaciones"); // Redirigir a la página de notificaciones
    }
  };

  const menuItems = [
    { id: 1, icon: "🏠", label: "", title: "Inicio" },
    { id: 2, icon: "📚", label: "", title: "Mis cursos" },
    { id: 3, icon: "📈", label: "", title: "Mi progreso" },
    { id: 4, icon: "🔔", label: "", title: "Notificaciones" },
  ];

  // Cargar datos del perfil del usuario autenticado
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        setUser(usuario);

        // Obtener los datos del perfil desde Firestore
        const perfilRef = doc(db, "perfiles", usuario.uid);
        getDoc(perfilRef).then((docSnap) => {
          if (docSnap.exists()) {
            const perfilData = docSnap.data();
            setFotoPerfil(perfilData.fotoPerfil || ""); // Establecer la foto de perfil
          }
        });

        // Obtener los cursos del usuario desde la colección de "materias"
        const cursosRef = collection(db, "materias");
        getDocs(cursosRef).then((querySnapshot) => {
          const cursosData = [];
          querySnapshot.forEach((doc) => {
            const cursoData = doc.data();
            console.log("Datos del curso:", cursoData); // Verificar los datos del curso
            cursosData.push(cursoData); // Guardamos los cursos
          });
          setCursos(cursosData); // Actualizamos el estado con los cursos
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // Función para manejar el cambio de video seleccionado
  const handleVideoSelection = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  // Función para redirigir al formulario
  const redirectToFormulario = () => {
    navigate("/formulario-prueba"); // Redirige al formulario de prueba
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/7 bg-gradient-to-r from-[#1E3A8A] to-[#4CAF50] text-white py-10 flex flex-col items-center">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-2 mb-6 cursor-pointer"
            onClick={() => handleMenuItemClick(item.title)}
          >
            <span className="text-3xl" title={item.title}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="w-full p-8">
        {/* Header: Mostrar la foto de perfil en la parte superior derecha */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold">Aula Virtual</h2>

          {/* Foto de perfil en la parte superior derecha */}
          <div className="relative">
            <img
              src={
                fotoPerfil || "https://www.w3schools.com/w3images/avatar2.png"
              }
              alt="Foto de perfil"
              className="w-16 h-16 rounded-full border-2 border-gray-300"
            />
          </div>
        </div>

        {/* Mostrar el curso seleccionado (moverlo arriba) */}
        {cursoNombre && cursoDescripcion && (
          <div className="mt-8 mb-4">
            <h3 className="text-2xl font-semibold mb-2">Curso Seleccionado</h3>
            <h4 className="text-xl font-semibold">{cursoNombre}</h4>
            <p className="mt-2">{cursoDescripcion}</p>
          </div>
        )}

        {/* Mostrar los cursos del usuario */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Mis Cursos</h3>
          {cursos.length > 0 ? (
            cursos.map((curso, index) => {
              console.log("Curso:", curso); // Verificar la estructura de cada curso
              return (
                <div key={index} className="bg-gray-100 p-4 rounded-md mb-4">
                  <h4 className="font-semibold text-lg">{curso.nombre}</h4>

                  {curso.videosRelacionados && (
                    <div className="flex">
                      <div className="w-2/3">
                        <h5 className="font-semibold text-lg mb-2">
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

                  {/* Mostrar materiales evaluativos (PDF, DOC, DOCX) */}
                  {curso.materialEvaluativo && (
                    <div className="mt-4">
                      <h5 className="font-semibold text-lg mb-2">
                        Material Evaluativo
                      </h5>
                      <div className="bg-white p-4 rounded-md shadow-md max-h-60 overflow-y-auto">
                        <a
                          href={curso.materialEvaluativo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-left p-2 hover:bg-gray-200 rounded-md mb-2 block"
                        >
                          Descargar Material de Repaso
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p>No tienes cursos aún.</p>
          )}
        </div>

        {/* Botón para acceder al formulario de prueba */}
        <div className="mt-8">
          <button
            onClick={redirectToFormulario}
            className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-500"
          >
            Acceder al Formulario de Prueba
          </button>
        </div>

        {/* Video seleccionado */}
        {selectedVideo && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Video Seleccionado</h3>
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
