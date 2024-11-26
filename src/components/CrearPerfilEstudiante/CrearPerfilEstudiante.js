import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../../config/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para la redirección

function CrearPerfilEstudiante() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [especializacion, setEspecializacion] = useState('');
  const [anioEstudio, setAnioEstudio] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [user, setUser] = useState(null);
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const navigate = useNavigate(); // Inicializamos useNavigate para redirigir después del registro

  // Cargar los datos del perfil del usuario y verificar su rol
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((usuario) => {
      console.log("Usuario autenticado:", usuario);
      if (usuario) {
        setUser(usuario);
        setEmail(usuario.email);

        // Verificar si el rol del usuario es 'Estudiante'
        const userRef = doc(db, 'users', usuario.uid); // Suponiendo que los roles están en la colección 'users'
        getDoc(userRef).then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.role !== 'Estudiante') {
              setMensajeError("No tienes permisos para crear un perfil de estudiante.");
            } else {
              cargarPerfil(usuario.uid);  // Solo cargar el perfil si el rol es 'Estudiante'
            }
          }
        });
      } else {
        console.log("No hay usuario autenticado");
      }
    });

    return () => unsubscribe();
  }, []);

  const cargarPerfil = async (uid) => {
    const perfilRef = doc(db, 'perfiles', uid);
    const perfilDoc = await getDoc(perfilRef);
    if (perfilDoc.exists()) {
      const perfilData = perfilDoc.data();
      console.log("Perfil cargado:", perfilData);
      setNombre(perfilData.nombre);
      setDescripcion(perfilData.descripcion);
      setEspecializacion(perfilData.especializacion);
      setAnioEstudio(perfilData.anioEstudio);
    } else {
      console.log("No se encontró perfil para el usuario:", uid);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Archivo seleccionado:", file);
    setFotoPerfil(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulario enviado con los siguientes datos:", { nombre, email, descripcion, especializacion, anioEstudio });

    if (user) {
      const perfilData = {
        nombre,
        email,
        descripcion,
        especializacion,
        anioEstudio
      };

      try {
        if (fotoPerfil) {
          console.log("Subiendo foto...");
          const storageRef = ref(storage, `perfilFotos/${user.uid}/${fotoPerfil.name}`);
          const uploadTask = uploadBytesResumable(storageRef, fotoPerfil);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Subiendo foto: " + progress + "% completado");
            },
            (error) => {
              console.error("Error al cargar la foto:", error);
              setMensajeError("Error al cargar la foto. Intenta nuevamente.");
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log("Foto cargada con éxito. URL:", downloadURL);
              perfilData.fotoPerfil = downloadURL;

              // Actualizar Firestore con la URL de la foto de perfil
              await setDoc(doc(db, 'perfiles', user.uid), perfilData);
              console.log("Perfil de Estudiante actualizado con éxito");
              setMensajeExito("Perfil de Estudiante actualizado con éxito");
              navigate(`/perfil-estudiante`); // Redirige al perfil de estudiante
            }
          );
        } else {
          console.log("No se ha cargado foto. Solo actualizando otros datos...");
          await setDoc(doc(db, 'perfiles', user.uid), perfilData);
          console.log("Perfil de Estudiante actualizado con éxito sin foto");
          setMensajeExito("Perfil de Estudiante actualizado con éxito");
          navigate(`/perfil-estudiante`); // Redirige al perfil de estudiante
        }
      } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        setMensajeError("Error al actualizar el perfil. Intenta nuevamente.");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Crear Perfil de Estudiante</h2>

      {/* Mostrar mensaje de éxito */}
      {mensajeExito ? (
        <div className="text-green-500 mb-4">{mensajeExito}</div>
      ) : null}

      {/* Mostrar mensaje de error */}
      {mensajeError ? (
        <div className="text-red-500 mb-4">{mensajeError}</div>
      ) : null}

      <form onSubmit={handleSubmit}>
        {/* Campo de nombre */}
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700">Nombre</label>
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

        {/* Campo de correo electrónico */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            disabled
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Campo de descripción */}
        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-sm font-semibold text-gray-700">Descripción</label>
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
          <label htmlFor="especializacion" className="block text-sm font-semibold text-gray-700">Especialización</label>
          <input
            type="text"
            id="especializacion"
            value={especializacion}
            onChange={(e) => setEspecializacion(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Ingresa tu especialización (ej. Ingeniería, Medicina, etc.)"
            required
          />
        </div>

        {/* Campo de año de estudio */}
        <div className="mb-4">
          <label htmlFor="anioEstudio" className="block text-sm font-semibold text-gray-700">Año de Estudio</label>
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
          <label htmlFor="fotoPerfil" className="block text-sm font-semibold text-gray-700">Foto de Perfil</label>
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
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Guardar Perfil de Estudiante
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrearPerfilEstudiante;
