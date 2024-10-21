import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if (!name || !email || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // Validación de contraseñas
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      // Realizar la solicitud de registro
      const response = await axios.post('/api/register', { name, email, password });

      if (response.data.success) {
        alert('¡Registro exitoso!');
        navigate('/login');
      } else {
        setError(response.data.message || 'El registro falló, por favor intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError('Error durante el registro. Por favor intenta de nuevo.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 text-white">
      <h2 className="text-4xl font-bold mb-8">Regístrate</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleRegister} className="w-full max-w-md bg-white p-8 shadow-2xl rounded-lg text-gray-800">
        {/* Input para el nombre */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 text-lg">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
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
            onChange={(e) => setEmail(e.target.value)}
            required
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
            onChange={(e) => setPassword(e.target.value)}
            required
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
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Botón para enviar el formulario */}
        <button type="submit" className="w-full bg-teal-600 text-white py-3 rounded-lg text-lg hover:bg-teal-700 transition duration-300">
          Registrarse
        </button>
      </form>

      <div className="mt-6">
        <p className="text-white">¿Ya tienes una cuenta? <a href="/login" className="text-teal-600 hover:text-teal-700 transition duration-300">Iniciar sesión</a></p>
      </div>
    </div>
  );
};

export default Register;