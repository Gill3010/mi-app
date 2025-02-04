import React, { useState, useEffect } from "react";
import { auth, db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function MostrarPerfilEstudiante() {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Hook para la navegación

  const menuItems = [
    { id: 1, icon: "🏠", label: "", title: "Inicio" },
    { id: 2, icon: "📚", label: "", title: "Mis cursos" },
    { id: 3, icon: "📈", label: "", title: "Mi progreso" },
    { id: 4, icon: "🔔", label: "", title: "Notificaciones" },
  ];

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

  // Redirigir a la ruta correspondiente según el item del menú
  const handleMenuItemClick = (title) => {
    if (title === "Inicio") {
      navigate("/perfil-estudiante"); // Redirigir al perfil de estudiante
    } else if (title === "Mis cursos") {
      navigate("/dashboard"); // Redirigir al dashboard
    } else if (title === "Mi progreso") {
      navigate("/progreso"); // Redirigir a la página de progreso
    } else if (title === "Notificaciones") {
      navigate("/notificaciones"); // Redirigir a la página de notificaciones
    }
  };

  if (loading) {
    return <div className="text-center text-lg text-gray-700">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="flex">
      {/* Sidebar con color de fondo y ancho ajustado */}
      <div className="w-1/7 bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#FFC107] text-white py-10 flex flex-col items-center">
        {/* Iconos de menú */}
        <div className="flex flex-col items-center space-y-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => handleMenuItemClick(item.title)} // Redirigir al hacer clic
            >
              <span
                className="text-3xl font-bold text-white hover:text-teal-400 transition-all duration-300"
                title={item.title} // Agregar texto emergente
              >
                {item.icon}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="relative w-full bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#FFC107] text-white p-6 rounded-lg shadow-xl flex items-center">
        <div className="flex flex-wrap justify-between items-center w-full">
          {/* Información textual */}
          <div className="w-full md:w-3/4 space-y-3">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#FFC107]">
              {perfil.nombre}
            </h2>
            <p className="text-sm italic">{perfil.especializacion}</p>
            <p className="text-sm">
              {perfil.anioEstudio && `Año de Estudio: ${perfil.anioEstudio}`}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-md font-semibold text-[#003366]">
                  Correo Electrónico:
                </h3>
                <p className="text-sm">{perfil.email}</p>
              </div>
              <div className="col-span-2">
                <h3 className="text-md font-semibold text-[#003366]">
                  Descripción:
                </h3>
                <p className="text-sm">{perfil.descripcion}</p>
              </div>
            </div>

            {/* Botón Editar */}
            <div className="mt-4">
              <button className="px-4 py-2 bg-[#2E7D32] text-white rounded-full hover:bg-[#1B5E20] focus:outline-none">
                Editar Perfil
              </button>
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
    </div>
  );
}

export default MostrarPerfilEstudiante;
