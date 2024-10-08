import React, { useState } from 'react'; // Importamos React y useState para manejar el estado de los inputs
import axios from 'axios'; // Importamos Axios para realizar solicitudes HTTP

const Register = () => {
  // Definimos los estados locales para manejar los inputs y los mensajes de error
  const [name, setName] = useState(''); // Estado para almacenar el nombre
  const [email, setEmail] = useState(''); // Estado para almacenar el correo electrónico
  const [password, setPassword] = useState(''); // Estado para almacenar la contraseña
  const [confirmPassword, setConfirmPassword] = useState(''); // Estado para confirmar la contraseña
  const [error, setError] = useState(''); // Estado para almacenar mensajes de error

  // Función que maneja el registro del usuario
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevenimos que la página se recargue al enviar el formulario

    // Verificamos que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.'); // Si no coinciden, mostramos un error
      return; // Detenemos la ejecución de la función si las contraseñas no coinciden
    }

    try {
      // Realizamos una solicitud POST a la ruta /api/register con los datos del formulario
      const response = await axios.post('/api/register', { name, email, password });
      console.log(response.data); // Mostramos la respuesta en la consola para depuración

      // Verificamos si el registro fue exitoso
      if (response.data.success) {
        alert('¡Registro exitoso!'); // Mostramos un mensaje de éxito al usuario
      } else {
        setError('El registro falló, por favor intenta de nuevo.'); // Si falla, mostramos un mensaje de error
      }
    } catch (error) {
      setError('Error durante el registro. Por favor intenta de nuevo.'); // Manejamos errores en la solicitud (e.g. errores del servidor)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 text-white">
      {/* Título de la página de registro */}
      <h2 className="text-4xl font-bold mb-8">Regístrate</h2>

      {/* Si hay un error, lo mostramos aquí */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Formulario de registro */}
      <form onSubmit={handleRegister} className="w-full max-w-md bg-white p-8 shadow-2xl rounded-lg text-gray-800">
        
        {/* Input para el nombre */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 text-lg">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Actualizamos el estado de "name" cuando el usuario escribe
            required // Este campo es obligatorio
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Input para el correo electrónico */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 text-lg">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Actualizamos el estado de "email" cuando el usuario escribe
            required // Este campo es obligatorio
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Input para la contraseña */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-lg">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Actualizamos el estado de "password" cuando el usuario escribe
            required // Este campo es obligatorio
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Input para confirmar la contraseña */}
        <div className="mb-8">
          <label htmlFor="confirmPassword" className="block text-gray-700 text-lg">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Actualizamos el estado de "confirmPassword" cuando el usuario escribe
            required // Este campo es obligatorio
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Botón para enviar el formulario */}
        <button type="submit" className="w-full bg-teal-600 text-white py-3 rounded-lg text-lg hover:bg-teal-700 transition duration-300">
          Registrarse
        </button>
      </form>

      {/* Enlace para iniciar sesión si ya tienen una cuenta */}
      <div className="mt-6">
        <p className="text-white">¿Ya tienes una cuenta? <a href="/login" className="text-teal-200 hover:underline">Inicia sesión aquí</a></p>
      </div>
    </div>
  );
};

export default Register;
