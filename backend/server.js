const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const csrf = require('csurf');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON

// Conexión a la base de datos
const dbHost = process.env.DB_HOST;
const dbUser  = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

mongoose.connect(`mongodb://${dbUser }:${dbPassword}@${dbHost}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error de conexión:', err));

// Modelo de usuario
const UserSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true }
});

const User = mongoose.model('User ', UserSchema); // Sin espacio extra

// Configuración de protección CSRF
const csrfProtection = csrf({ cookie: true });

// Configuración de límite de velocidad
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite cada IP a 100 solicitudes por windowMs
});

// Ruta de registro de usuarios
app.post('/registro', csrfProtection, limiter, [
  body('usuario').isLength({ min: 3, max: 20 }),
  body('correo').isEmail(),
  body('contraseña').isLength({ min: 8, max: 20 })
], async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(422).json({ errores: errores.array() });
  }

  try {
    const contraseñaCifrada = await bcrypt.hash(req.body.contraseña, 10);
    const nuevoUsuario = new User({
      usuario: req.body.usuario,
      correo: req.body.correo,
      contraseña: contraseñaCifrada
    });

    await nuevoUsuario.save();
    res.json({ mensaje: 'Usuario registrado con éxito' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error: err.message });
  }
});

// Ruta de envío de formularios
app.post('/enviar', csrfProtection, limiter, [
  body('nombre').isLength({ min: 3, max: 20 }),
  body('correo').isEmail()
], async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(422).json({ errores: errores.array() });
  }

  try {
    // Aquí puedes guardar los datos del formulario en la base de datos
    res.json({ mensaje: 'Formulario enviado con éxito' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al enviar formulario', error: err.message });
  }
});

// Iniciar el servidor
const port = process.env.PORT || 3000; // Usar el puerto del archivo .env
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});