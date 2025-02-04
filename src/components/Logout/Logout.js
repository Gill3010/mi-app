import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebaseConfig";
import { FiSmile } from "react-icons/fi";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Cierra la sesión con Firebase
      navigate("/login"); // Redirige al usuario a la página de inicio de sesión o la ruta deseada
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center">
      <FiSmile className="text-6xl text-[#FF6347] mb-4" />{" "}
      {/* Icono de carita sonriente */}
      <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#FFC107] mb-2">
        ¡Gracias por visitarnos!
      </h2>
      <p className="text-gray-600 mb-6">
        Esperamos verte de nuevo pronto. ¡Cuídate!
      </p>
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Logout;
