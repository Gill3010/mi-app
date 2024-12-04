import React, { useState, useEffect } from "react";
import { auth, db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

function MostrarPerfilDocente() {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        const cargarPerfil = async () => {
          try {
            const perfilRef = doc(db, "perfiles", usuario.uid);
            const perfilDoc = await getDoc(perfilRef);

            if (perfilDoc.exists()) {
              setPerfil(perfilDoc.data());
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

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center text-lg text-gray-700">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="relative w-full bg-gradient-to-r from-[#1E3A8A] to-[#4CAF50] text-white p-6 rounded-lg shadow-xl flex items-center">
      {/* Contenedor principal */}
      <div className="flex flex-wrap justify-between items-center w-full">
        {/* Información textual */}
        <div className="w-full md:w-3/4 space-y-3">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
            {perfil.nombre}
          </h2>
          <p className="text-sm italic">{perfil.tituloAcademico}</p>
          <p className="text-sm">{perfil.especializacion}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-md font-semibold text-[#003366]">
                Correo Electrónico:
              </h3>
              <p className="text-sm">{perfil.email}</p>
            </div>
            <div>
              <h3 className="text-md font-semibold text-[#003366]">
                Años de Experiencia:
              </h3>
              <p className="text-sm">
                {perfil.añosExperiencia || "No disponible"}
              </p>
            </div>
            <div className="col-span-2">
              <h3 className="text-md font-semibold text-[#003366]">
                Materias Impartidas:
              </h3>
              <p className="text-sm">{perfil.materiasImpartidas}</p>
            </div>
            <div className="col-span-2">
              <h3 className="text-md font-semibold text-[#003366]">
                Descripción:
              </h3>
              <p className="text-sm">{perfil.descripcion}</p>
            </div>
          </div>
        </div>

        {/* Foto de perfil */}
        {perfil.fotoPerfil && (
          <div className="relative flex justify-center md:w-1/4">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100">
              <img
                src={perfil.fotoPerfil}
                alt="Foto de Perfil"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MostrarPerfilDocente;
