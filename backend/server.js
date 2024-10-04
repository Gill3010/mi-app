require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const helmet = require('helmet'); // Middleware de seguridad
const path = require('path'); // Para manejar rutas de archivos

const app = express();

// Middleware
app.use(cors()); // Permitir solicitudes desde el frontend
app.use(express.json()); // Parsear JSON
app.use(helmet()); // Añadir capas de seguridad

// Configurar la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Endpoint para buscar en la base de datos
app.get('/api/search', (req, res) => {
  const searchTerm = req.query.q;
  
  if (!searchTerm) {
    return res.status(400).json({ error: 'Debe proporcionar un término de búsqueda.' });
  }

  const query = `
    SELECT titulo_investigacion, nombres, apellidos, institucion 
    FROM sponsor_registros 
    WHERE titulo_investigacion LIKE ? OR nombres LIKE ? OR apellidos LIKE ?
  `;

  const searchValue = `%${searchTerm}%`;

  connection.query(query, [searchValue, searchValue, searchValue], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err.message); 
      return res.status(500).json({ error: 'Error interno en el servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No se encontraron resultados' });
    }

    res.json(results);
  });
});

// Servir archivos estáticos desde la carpeta build
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all handler for any requests that don't match the above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});