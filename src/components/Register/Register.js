import React, { useState } from 'react';
import axios from 'axios';
import styles from './Register.module.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('/api/register', { name, email, password });
      console.log(response.data);
      if (response.data.success) {
        alert('Registration successful!');
      } else {
        setError('Registration failed, please try again.');
      }
    } catch (error) {
      setError('Error during registration. Please try again.');
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2>Registro</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Correo:</label>
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
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>

      <div className={styles.loginLink}>
      <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a></p>
      </div>
    </div>
  );
};

export default Register;
