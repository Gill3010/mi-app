const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const db = require('../db'); // Asegúrate de que esta ruta apunte a tu archivo de conexión de base de datos

router.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verifica si el usuario ya existe
    const userExists = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (userExists.length > 0) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guarda el nuevo usuario en la base de datos
    await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Registration failed. Please try again.' });
  }
});

module.exports = router;
