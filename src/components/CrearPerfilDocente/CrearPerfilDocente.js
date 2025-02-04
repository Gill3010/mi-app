import React, { useState, useEffect } from "react";
import { auth, db, storage } from "../../config/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para la redirección

function CrearPerfilDocente() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [especializacion, setEspecializacion] = useState("");
  const [anioEstudio, setAnioEstudio] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [esDocente, setEsDocente] = useState(false); // Estado para verificar si el usuario es docente

  const navigate = useNavigate(); // Inicializamos useNavigate para redirigir después de crear el perfil

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((usuario) => {
      console.log("Usuario autenticado:", usuario);
      if (usuario) {
        // Verificar el rol del usuario (Docente o Estudiante)
        const verificarRol = async () => {
          const userRef = doc(db, "users", usuario.uid); // Suponiendo que los roles están en la colección 'users'
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.role === "Docente") {
              setEsDocente(true); // Si es docente, permitir acceso
            } else {
              setEsDocente(false); // Si no es docente, bloquear acceso
            }
          } else {
            setMensajeError("No se encontró el perfil del usuario.");
          }
        };
        verificarRol();
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFileChange = (e) => {
    setFotoPerfil(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuario = auth.currentUser;

    if (usuario) {
      const perfilData = {
        nombre,
        email: usuario.email,
        descripcion,
        especializacion,
        anioEstudio,
      };

      try {
        if (fotoPerfil) {
          const storageRef = ref(
            storage,
            `perfilFotos/${usuario.uid}/${fotoPerfil.name}`
          );
          const uploadTask = uploadBytesResumable(storageRef, fotoPerfil);
          uploadTask.on(
            "state_changed",
            null,
            (error) => {
              console.error("Error al cargar la foto:", error);
              setMensajeError("Error al cargar la foto. Intenta nuevamente.");
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              perfilData.fotoPerfil = downloadURL;
              await setDoc(doc(db, "perfiles", usuario.uid), perfilData);
              setMensajeExito("Perfil de Docente creado con éxito");
              navigate(`/perfil-docente`); // Redirige al perfil de docente
            }
          );
        } else {
          await setDoc(doc(db, "perfiles", usuario.uid), perfilData);
          setMensajeExito("Perfil de Docente creado con éxito");
          navigate(`/perfil-docente`); // Redirige al perfil de docente
        }
      } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        setMensajeError("Error al actualizar el perfil. Intenta nuevamente.");
      }
    }
  };

  // Si el usuario no es docente, mostramos un mensaje de acceso denegado
  if (!esDocente) {
    return (
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Acceso Denegado</h2>
        <p className="text-center text-red-500">
          Solo los usuarios con el rol de Docente pueden crear un perfil de
          docente.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#FFC107]">
          Crear Perfil de Docente
        </h2>

        {/* Mostrar mensaje de éxito */}
        {mensajeExito && (
          <div className="text-green-500 mb-4">{mensajeExito}</div>
        )}

        {/* Mostrar mensaje de error */}
        {mensajeError && (
          <div className="text-red-500 mb-4">{mensajeError}</div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          {/* Campo de nombre */}
          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="block text-sm font-semibold text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Ingresa tu nombre"
              required
            />
          </div>

          {/* Campo de descripción */}
          <div className="mb-4">
            <label
              htmlFor="descripcion"
              className="block text-sm font-semibold text-gray-700"
            >
              Descripción
            </label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Cuéntanos un poco sobre ti"
              required
            ></textarea>
          </div>

          {/* Campo de especialización */}
          <div className="mb-4">
            <label
              htmlFor="especializacion"
              className="block text-sm font-semibold text-gray-700"
            >
              Especialización
            </label>
            <input
              type="text"
              id="especializacion"
              value={especializacion}
              onChange={(e) => setEspecializacion(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Ingresa tu especialización"
              required
            />
          </div>

          {/* Campo de año de estudio */}
          <div className="mb-4">
            <label
              htmlFor="anioEstudio"
              className="block text-sm font-semibold text-gray-700"
            >
              Año de Estudio
            </label>
            <input
              type="number"
              id="anioEstudio"
              value={anioEstudio}
              onChange={(e) => setAnioEstudio(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Ingresa tu año de estudio"
              required
            />
          </div>

          {/* Campo para foto de perfil */}
          <div className="mb-4">
            <label
              htmlFor="fotoPerfil"
              className="block text-sm font-semibold text-gray-700"
            >
              Foto de Perfil
            </label>
            <input
              type="file"
              id="fotoPerfil"
              onChange={handleFileChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              accept="image/*"
            />
          </div>

          {/* Botón de envío */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1B5E20] to-[#FFC107] text-white p-2 rounded-md hover:bg-[#2E7D32]"
            >
              Guardar Perfil de Docente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrearPerfilDocente;
