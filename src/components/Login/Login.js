import React, { useState } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      console.log(response.data);
      if (response.data.success) {
        alert('¡Inicio de sesión exitoso!');
      } else {
        setError('Error en el inicio de sesión, por favor intenta de nuevo.');
      }
    } catch (error) {
      setError('Error durante el inicio de sesión. Por favor intenta de nuevo.');
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    // Aquí puedes enviar el token al backend para manejar la autenticación
    console.log(response.credential);
    alert('¡Inicio de sesión con Google exitoso!');
  };

  const handleGitHubLogin = () => {
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=TU_CLIENT_ID';
    // Redirigir al usuario a la URL de autenticación de GitHub
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Iniciar Sesión</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>

      <div className={styles.oauthButtons}>
        <GoogleOAuthProvider clientId="TU_GOOGLE_CLIENT_ID">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {
              console.log('Error en el inicio de sesión con Google');
            }}
          />
        </GoogleOAuthProvider>

        <button className={styles.githubButton} onClick={handleGitHubLogin}>
          Iniciar sesión con GitHub
        </button>
      </div>

      <div className={styles.signupLink}>
        <p>¿No tienes una cuenta? <a href="/register">Crea una</a></p>
      </div>
    </div>
  );
};

export default Login;