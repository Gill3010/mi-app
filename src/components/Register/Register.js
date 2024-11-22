import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../config/firebaseConfig'; // Configuración de Firebase
import { db } from '../../config/firebaseConfig'; // Configuración de Firestore
import { setDoc, doc } from 'firebase/firestore'; // Para guardar datos en Firestore

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Estudiante'); // Valor por defecto del rol
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // Mensaje de éxito
  const navigate = useNavigate();

  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
    setRole('Estudiante');
    setSuccessMessage(null);
  }, []);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword || !role) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (!validateEmail(email)) {
      setError('El formato del correo electrónico es inválido.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const userCredential = await registerUser(email, password);
      if (userCredential) {
        const user = userCredential.user;
        await setDoc(doc(db, 'users', user.uid), {
          name,
          email,
          role, // Guardar el rol seleccionado
          createdAt: new Date().toISOString(), // Fecha de creación
        });
        setSuccessMessage('¡Registro exitoso! Redirigiendo a la página de inicio de sesión...');
        setTimeout(() => navigate('/login'), 2000); // Redirigir después de 2 segundos
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('El correo electrónico ya está registrado.');
      } else if (error.code === 'auth/weak-password') {
        setError('La contraseña es muy débil.');
      } else {
        setError('Error durante el registro. Por favor intenta de nuevo más tarde.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#002855] to-[#00A1E0] text-white">
      <h2 className="text-4xl font-bold mb-8">Regístrate</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      <form onSubmit={handleRegister} className="w-full max-w-md bg-white p-8 shadow-2xl rounded-lg text-gray-800">
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 text-lg">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 text-lg">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-lg">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 text-lg">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]"
          />
        </div>

        <div className="mb-8">
          <label htmlFor="role" className="block text-gray-700 text-lg">Rol</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]"
            required
          >
            <option value="Estudiante">Estudiante</option>
            <option value="Docente">Docente</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-[#002855] text-white py-3 rounded-lg text-lg hover:bg-[#005073] transition duration-300">
          Registrarse
        </button>
      </form>

      <div className="mt-6">
        <p className="text-white">¿Ya tienes una cuenta? <a href="/login" className="text-blue-200 hover:text-blue-300 transition duration-300">Iniciar sesión</a></p>
      </div>
    </div>
  );
};

export default Register;