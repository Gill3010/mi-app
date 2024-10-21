import React, { useState } from 'react'; // Importamos React y useState para manejar el estado
import axios from 'axios'; // Importamos Axios para hacer solicitudes HTTP
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Importamos GoogleOAuthProvider y GoogleLogin para iniciar sesión con Google

const Login = () => {
  const [email, setEmail] = useState(''); // Estado para almacenar el correo electrónico
  const [password, setPassword] = useState(''); // Estado para almacenar la contraseña
  const [error, setError] = useState(''); // Estado para almacenar mensajes de error

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevenimos que la página se recargue al enviar el formulario

    try {
      const response = await axios.post('http://localhost:3001/api/login', { email, password }); // Asegúrate de que la URL sea correcta
      console.log(response.data); // Mostramos la respuesta en la consola para depuración

      if (response.data.success) {
        localStorage.setItem('token', response.data.token); // Guarda el token en el almacenamiento local
        alert('¡Inicio de sesión exitoso!'); // Muestra un mensaje de éxito al usuario
        // Redirige al usuario a otra página aquí si es necesario
      } else {
        setError(response.data.message || 'Error en el inicio de sesión, por favor intenta de nuevo.'); // Muestra un mensaje de error
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError('Error durante el inicio de sesión. Por favor intenta de nuevo.'); // Manejamos errores de la solicitud (e.g. errores del servidor)
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log(response.credential); // Mostramos el token JWT de Google en la consola
    alert('¡Inicio de sesión con Google exitoso!'); // Muestra un mensaje de éxito al usuario
    // Aquí puedes manejar la lógica para enviar el token a tu servidor si es necesario
  };

  const handleGitHubLogin = () => {
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=TU_CLIENT_ID'; // Reemplaza TU_CLIENT_ID por el ID de cliente de GitHub
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <h2 className="text-4xl font-bold mb-8">Iniciar Sesión</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-8 shadow-2xl rounded-lg text-gray-800">
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 text-lg">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Actualizamos el estado de "email" cuando el usuario escribe
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-8">
          <label htmlFor="password" className="block text-gray-700 text-lg">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Actualizamos el estado de "password" cuando el usuario escribe
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg hover:bg-indigo-700 transition duration-300">
          Iniciar Sesión
        </button>
      </form>

      <div className="mt-8 w-full max-w-md">
        <GoogleOAuthProvider clientId="TU_GOOGLE_CLIENT_ID"> {/* Reemplaza TU_GOOGLE_CLIENT_ID por tu ID de cliente de Google */}
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess} // Manejamos el inicio de sesión exitoso con Google
            onError={() => {
              console.log('Error en el inicio de sesión con Google'); // Si ocurre un error, lo mostramos en la consola
            }}
            className="w-full"
          />
        </GoogleOAuthProvider>

        <button 
          onClick={handleGitHubLogin} // Llamamos a la función para iniciar sesión con GitHub
          className="w-full mt-4 bg-gray-900 text-white py-3 rounded-lg text-lg hover:bg-gray-800 transition duration-300">
          Iniciar sesión con GitHub
        </button>
      </div>

      <div className="mt-6">
        <p>¿No tienes una cuenta? <a href="/Register" className="text-indigo-200 hover:underline">Crea una</a></p>
      </div>
    </div>
  );
};

export default Login;
