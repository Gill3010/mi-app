import React, { useState } from 'react';
import { auth, db, storage } from '../../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

function CrearPerfilDocente() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [especializacion, setEspecializacion] = useState('');
  const [anioEstudio, setAnioEstudio] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [mensajeExito, setMensajeExito] = useState('');  // Estado para el mensaje de éxito

  const handleFileChange = (e) => {
    setFotoPerfil(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuario = auth.currentUser;

    if (usuario) {
      const perfilData = {
        nombre,
        email: usuario.email, // Usamos el email del usuario autenticado
        descripcion,
        especializacion,
        anioEstudio,
      };

      if (fotoPerfil) {
        const storageRef = ref(storage, `perfilFotos/${usuario.uid}/${fotoPerfil.name}`);
        const uploadTask = uploadBytesResumable(storageRef, fotoPerfil);
        uploadTask.on(
          "state_changed",
          null,
          (error) => console.error("Error al cargar la foto:", error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            perfilData.fotoPerfil = downloadURL;
            await setDoc(doc(db, 'perfiles', usuario.uid), perfilData);
            setMensajeExito("Perfil de Docente creado con éxito"); // Mostrar mensaje de éxito
          }
        );
      } else {
        // Si no se carga una foto, solo guardamos los otros datos
        await setDoc(doc(db, 'perfiles', usuario.uid), perfilData);
        setMensajeExito("Perfil de Docente creado con éxito"); // Mostrar mensaje de éxito
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Crear Perfil de Docente</h2>
      <form onSubmit={handleSubmit}>
        {/* Nombre */}
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-sm font-semibold text-gray-700">Descripción</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>

        {/* Especialización */}
        <div className="mb-4">
          <label htmlFor="especializacion" className="block text-sm font-semibold text-gray-700">Especialización</label>
          <input
            type="text"
            id="especializacion"
            value={especializacion}
            onChange={(e) => setEspecializacion(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Año de Estudio */}
        <div className="mb-4">
          <label htmlFor="anioEstudio" className="block text-sm font-semibold text-gray-700">Año de Estudio</label>
          <input
            type="number"
            id="anioEstudio"
            value={anioEstudio}
            onChange={(e) => setAnioEstudio(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Foto de Perfil */}
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

        {/* Botón de Guardar */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Guardar Perfil de Docente
          </button>
        </div>
      </form>

      {/* Mostrar mensaje de éxito */}
      {mensajeExito && (
        <div className="mt-4 text-green-500 text-center">
          {mensajeExito}
        </div>
      )}
    </div>
  );
}

export default CrearPerfilDocente;
