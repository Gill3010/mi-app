const express = require('express');
const mysql = require('mysql2');
const { body, validationResult } = require('express-validator');
const csrf = require('csurf');
const rateLimit = require('express-rate-limit');
const admin = require('firebase-admin');
const cookieParser = require('cookie-parser');
require('dotenv').config(); // Asegúrate de tener tu archivo .env correctamente configurado

const app = express();
app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON
app.use(cookieParser()); // Necesario para el CSRF

// Inicializar Firebase Admin SDK
const serviceAccount = require('./path/to/serviceAccountKey.json'); // Ruta segura de tu archivo JSON de Firebase Admin

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware para verificar el token de Firebase en las solicitudes protegidas
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // El token debería ser enviado en la cabecera Authorization: Bearer <token>

  if (!token) {
    return res.status(401).send('Acceso denegado. No se proporcionó un token.');
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Verificar si el token ha expirado
    if (decodedToken.exp < Date.now() / 1000) {
      return res.status(401).send('Token expirado. Por favor, inicia sesión de nuevo.');
    }

    req.user = decodedToken; // Guardamos los datos del usuario verificado en el request
    next(); // Continuamos con la siguiente función middleware
  } catch (error) {
    return res.status(401).send('Token inválido o expirado.');
  }
};

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Conectar a MySQL
db.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
    process.exit(1); // Salir si hay un error de conexión
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// Configuración de protección CSRF
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Solo usar "secure" en producción con HTTPS
  },
});

// Configuración de límite de velocidad para evitar ataques DDoS y de fuerza bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // Límite de 100 solicitudes por IP en el tiempo de la ventana
});

app.use(limiter); // Aplicar el límite de solicitudes a todas las rutas

// Ruta protegida para registrar usuarios (solo accesible para usuarios autenticados)
app.post('/registro', verifyToken, csrfProtection, [
  body('usuario').isLength({ min: 3, max: 20 }),
  body('correo').isEmail(),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.')
], async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(422).json({ errores: errores.array() });
  }

  try {
    const { usuario, correo, password } = req.body;

    // Insertar nuevo usuario en MySQL
    const query = 'INSERT INTO users (usuario, correo, password) VALUES (?, ?, ?)';
    db.query(query, [usuario, correo, password], (err, result) => {
      if (err) {
        return res.status(500).json({ mensaje: 'Error al registrar usuario', error: err.message });
      }
      res.json({ mensaje: 'Usuario registrado con éxito' });
    });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error: err.message });
  }
});

// Ruta protegida para el envío de formularios (requiere autenticación y token CSRF)
app.post('/enviar', verifyToken, csrfProtection, [
  body('nombre').isLength({ min: 3, max: 20 }),
  body('correo').isEmail()
], async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(422).json({ errores: errores.array() });
  }

  try {
    const { nombre, correo } = req.body;

    // Insertar datos del formulario en MySQL
    const query = 'INSERT INTO form_submissions (nombre, correo) VALUES (?, ?)';
    db.query(query, [nombre, correo], (err, result) => {
      if (err) {
        return res.status(500).json({ mensaje: 'Error al enviar formulario', error: err.message });
      }
      res.json({ mensaje: 'Formulario enviado con éxito' });
    });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al enviar formulario', error: err.message });
  }
});

// Iniciar el servidor en producción (usar puerto 80 o 443 para HTTP/HTTPS)
const port = process.env.PORT || 80; // Usar el puerto adecuado para producción (80 o 443)
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});