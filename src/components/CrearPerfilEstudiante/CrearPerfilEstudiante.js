import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CrearPerfilEstudiante() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [especializacion, setEspecializacion] = useState("");
  const [anioEstudio, setAnioEstudio] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí puedes agregar la lógica para enviar los datos al backend o Firebase
      setMensajeExito("Perfil de Estudiante creado con éxito");
      navigate(`/perfil-estudiante`); // Redirige al perfil de estudiante
    } catch (error) {
      console.error("Error al crear el perfil:", error);
      setMensajeError("Error al crear el perfil. Intenta nuevamente.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#FFC107]">
          Crear Perfil de Estudiante
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

          {/* Botón de envío */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1B5E20] to-[#FFC107] text-white p-2 rounded-md hover:bg-[#2E7D32]"
            >
              Guardar Perfil de Estudiante
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrearPerfilEstudiante;
