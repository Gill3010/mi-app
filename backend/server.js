const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');  // Para manejar archivos
const { body, validationResult } = require('express-validator');
const csrf = require('csurf');
const rateLimit = require('express-rate-limit');
const admin = require('firebase-admin');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Inicializar Firebase Admin SDK
const serviceAccount = require('./path/to/serviceAccountKey.json'); // Asegúrate de actualizar esta ruta

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware para verificar el token de Firebase en las solicitudes protegidas
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Acceso denegado. No se proporcionó un token.');
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (decodedToken.exp < Date.now() / 1000) {
      return res.status(401).send('Token expirado. Por favor, inicia sesión de nuevo.');
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send('Token inválido o expirado.');
  }
};

// Configuración de almacenamiento para `multer`
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardan los archivos subidos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nombre único para cada archivo
  },
});
const upload = multer({ storage: storage });

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
    process.exit(1);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// Configuración de protección CSRF
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
});

// Configuración de límite de velocidad para evitar ataques DDoS y de fuerza bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

// Ruta para el registro de usuarios
app.post('/registro', verifyToken, csrfProtection, [
  body('usuario').isLength({ min: 3, max: 20 }),
  body('correo').isEmail(),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.')
], async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(422).json({ errores: errores.array() });
  }

  const { usuario, correo, password } = req.body;
  const query = 'INSERT INTO users (usuario, correo, password) VALUES (?, ?, ?)';
  db.query(query, [usuario, correo, password], (err) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al registrar usuario', error: err.message });
    }
    res.json({ mensaje: 'Usuario registrado con éxito' });
  });
});

// Ruta para el envío del formulario de publicaciones con manejo de archivos
app.post('/api/formulario', verifyToken, csrfProtection, upload.array('archivos[]'), [
  body('nombreAutor').isLength({ min: 3, max: 100 }),
  body('apellidoAutor').isLength({ min: 3, max: 100 }),
  body('correo').isEmail(),
  body('telefono').isLength({ min: 7, max: 20 }),
  body('institucion').optional(),
  body('orcid').optional(),
  body('pais').optional(),
  body('galeria').optional(),
  body('instrucciones').optional(),
  body('metodoPago').isIn(['paypal', 'banco', 'western_union', 'yappy']),
], async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(422).json({ errores: errores.array() });
  }

  const {
    nombreAutor, apellidoAutor, correo, telefono,
    institucion = null, orcid = null, pais = null, galeria = null, 
    instrucciones = null, metodoPago
  } = req.body;

  // Procesamiento de archivos subidos
  const archivos = req.files.map(file => file.path); // Rutas de los archivos subidos

  const query = `
    INSERT INTO publicaciones (
      nombre_autor, apellido_autor, correo, telefono, institucion,
      orcid, pais, galeria, instrucciones, metodo_pago, archivos, 
      fecha_publicacion, vistas, likes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 0, 0)
  `;

  db.query(query, [
    nombreAutor, apellidoAutor, correo, telefono, institucion,
    orcid, pais, galeria, instrucciones, metodoPago, JSON.stringify(archivos)
  ], (err) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al enviar formulario', error: err.message });
    }
    res.json({ mensaje: 'Formulario enviado con éxito' });
  });
});

// Endpoint para obtener las galerías (publicaciones)
app.get('/api/galerias', (req, res) => {
  const query = 'SELECT * FROM publicaciones';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener las galerías', details: err.message });
    }
    res.json({ mensaje: 'Galerías obtenidas con éxito', datos: results });
  });
});

// Endpoints adicionales para incrementar vistas y likes
app.patch('/api/publicaciones/:id/vistas', (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE publicaciones SET vistas = vistas + 1 WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al incrementar vistas', error: err.message });
    }
    res.json({ mensaje: 'Vista incrementada' });
  });
});

app.patch('/api/publicaciones/:id/likes', (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE publicaciones SET likes = likes + 1 WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al incrementar likes', error: err.message });
    }
    res.json({ mensaje: 'Like incrementado' });
  });
});

// Iniciar el servidor en producción
const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
