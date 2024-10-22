import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, loginUser } from '../../config/firebaseConfig';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await loginUser(email, password);
      console.log('Inicio de sesión exitoso:', userCredential.user);
      alert('¡Inicio de sesión exitoso!');
      navigate('/');  // Redirigir a la página de inicio
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setError('Error durante el inicio de sesión. Por favor intenta de nuevo.');
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    console.log('Token de Google:', response.credential);
    alert('¡Inicio de sesión con Google exitoso!');
    // Lógica adicional para manejar el token de Google
    navigate('/');  // Redirigir a la página de inicio después de iniciar sesión
  };

  const handleGitHubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Inicio de sesión con GitHub exitoso:', result.user);
      alert('¡Inicio de sesión con GitHub exitoso!');
      navigate('/');  // Redirigir a la página de inicio después de iniciar sesión
    } catch (error) {
      console.error('Error en el inicio de sesión con GitHub:', error);
      setError('Error en el inicio de sesión con GitHub. Por favor intenta de nuevo.');
    }
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg hover:bg-indigo-700 transition duration-300">
          Iniciar Sesión
        </button>
      </form>

      <div className="mt-8 w-full max-w-md">
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => setError('Error en el inicio de sesión con Google.')}
            className="w-full"
          />
        </GoogleOAuthProvider>

        <button
          onClick={handleGitHubLogin}
          className="w-full mt-4 bg-gray-900 text-white py-3 rounded-lg text-lg hover:bg-gray-800 transition duration-300">
          Iniciar sesión con GitHub
        </button>
      </div>

      <div className="mt-6">
        <p>¿No tienes una cuenta? <a href="/register" className="text-indigo-200 hover:underline">Crea una</a></p>
      </div>
    </div>
  );
};

export default Login;