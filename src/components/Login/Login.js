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
        alert('Login successful!');
      } else {
        setError('Login failed, please try again.');
      }
    } catch (error) {
      setError('Error during login. Please try again.');
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    // Aquí puedes enviar el token al backend para manejar la autenticación
    console.log(response.credential);
    alert('Google login successful!');
  };

  const handleGitHubLogin = () => {
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=TU_CLIENT_ID';
    // Redirigir al usuario a la URL de autenticación de GitHub
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <div className={styles.oauthButtons}>
        <GoogleOAuthProvider clientId="TU_GOOGLE_CLIENT_ID">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {
              console.log('Google Login Failed');
            }}
          />
        </GoogleOAuthProvider>

        <button className={styles.githubButton} onClick={handleGitHubLogin}>
          Login with GitHub
        </button>
      </div>

      <div className={styles.signupLink}>
        <p>Don't have an account? <a href="/register">Create one</a></p>
      </div>
    </div>
  );
};

export default Login;
