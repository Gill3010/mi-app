import React, { useState, useEffect } from 'react';
import { auth, db } from '../../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

function MostrarPerfilEstudiante() {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((usuario) => {
      console.log("Estado de autenticación cambiado:", usuario);

      if (usuario) {
        // Si el usuario está autenticado, cargar su perfil desde Firestore
        const cargarPerfil = async () => {
          try {
            const perfilRef = doc(db, 'perfiles', usuario.uid);
            const perfilDoc = await getDoc(perfilRef);
            if (perfilDoc.exists()) {
              setPerfil(perfilDoc.data()); // Establecer los datos del perfil
            } else {
              setError("No se encontró el perfil.");
            }
          } catch (err) {
            setError("Error al cargar el perfil.");
            console.error("Error al cargar el perfil:", err);
          } finally {
            setLoading(false);
          }
        };

        cargarPerfil();
      } else {
        setError("Usuario no autenticado.");
        setLoading(false);
      }
    });

    // Limpieza del efecto
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center text-lg text-gray-700">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Mi Perfil de Estudiante</h2>

      {perfil && (
        <div className="space-y-6">
          <div className="flex justify-center mb-4">
            {perfil.fotoPerfil && (
              <img
                src={perfil.fotoPerfil}
                alt="Foto de Perfil"
                className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-lg"
              />
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-blue-800">Nombre:</h3>
              <p className="text-lg text-gray-700">{perfil.nombre}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold text-blue-800">Correo Electrónico:</h3>
              <p className="text-lg text-gray-700">{perfil.email}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold text-blue-800">Descripción:</h3>
              <p className="text-lg text-gray-700">{perfil.descripcion}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold text-blue-800">Especialización:</h3>
              <p className="text-lg text-gray-700">{perfil.especializacion}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold text-blue-800">Año de Estudio:</h3>
              <p className="text-lg text-gray-700">{perfil.anioEstudio}</p>
            </div>

            <div className="text-center">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none">
                Editar Perfil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MostrarPerfilEstudiante;
