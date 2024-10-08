const express = require('express'); // Importamos Express para manejar las rutas y el servidor
const bcrypt = require('bcrypt'); // Importamos bcrypt para encriptar las contraseñas
const mysql = require('mysql'); // Importamos mysql para conectarnos a la base de datos MySQL
const cors = require('cors'); // Importamos CORS para permitir solicitudes entre diferentes dominios
const passport = require('passport'); // Importamos Passport para autenticación con Google y GitHub
const session = require('express-session'); // Importamos express-session para manejo de sesiones
const jwt = require('jsonwebtoken');  // Importamos JWT para generar y verificar tokens
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Importamos la estrategia de Google para Passport
const GitHubStrategy = require('passport-github').Strategy; // Importamos la estrategia de GitHub para Passport

const app = express(); // Creamos la aplicación Express
app.use(express.json()); // Middleware para permitir que Express maneje JSON en las solicitudes
app.use(cors()); // Usamos CORS para permitir solicitudes desde dominios diferentes

// Clave secreta para JWT
const JWT_SECRET = 'tu_super_secreto_para_jwt';  // Cambia esto por un secreto más seguro para generar JWT

// Configuración de la sesión
app.use(session({
    secret: '4I@vBzL1a7CxB#JkP8qzM2wQ8^9H!lTxN3rE',  // Secreto para firmar las cookies de sesión
    resave: false, // No volver a guardar la sesión si no ha cambiado
    saveUninitialized: true, // Guarda la sesión aunque no haya sido inicializada
    cookie: { secure: false }  // Si usamos HTTPS en producción, cambiar a true
}));

// Inicializar Passport y sesiones
app.use(passport.initialize()); // Inicializamos Passport
app.use(passport.session()); // Permitimos que Passport maneje sesiones

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost', // Dirección del servidor MySQL (localhost para local)
    user: 'Innova24', // Usuario de MySQL
    password: 'Innova.2024', // Contraseña del usuario de MySQL
    database: 'Innova' // Base de datos que estamos usando
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err); // Si hay un error, lo mostramos
        return;
    }
    console.log('Conectado a la base de datos'); // Si todo está bien, mostramos este mensaje
});

// Serialización del usuario en Passport
passport.serializeUser((user, done) => {
    done(null, user.id);  // Guardamos el ID del usuario en la sesión
});

// Deserialización del usuario en Passport
passport.deserializeUser((id, done) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
        if (err) {
            console.error('Error deserializando el usuario:', err);
            return done(err, null); // Si hay un error, lo manejamos aquí
        }
        done(null, user[0]);  // Devolvemos el usuario encontrado en la base de datos
    });
});

// Estrategia de Google para inicio de sesión (sin cambios)
passport.use(new GoogleStrategy({
    clientID: 'TU_GOOGLE_CLIENT_ID', // Cliente de Google OAuth2 (obtenido en la consola de Google)
    clientSecret: 'TU_GOOGLE_CLIENT_SECRET', // Secreto del cliente OAuth2
    callbackURL: '/auth/google/callback' // URL de redirección después de la autenticación
}, (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value; // Obtenemos el correo del perfil de Google
    const name = profile.displayName; // Obtenemos el nombre del perfil de Google

    // Verificar si el usuario ya existe en la base de datos
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.error('Error al verificar usuario con Google:', err);
            return done(err); // Si hay error, lo manejamos
        }
        if (result.length > 0) {
            return done(null, result[0]); // Si el usuario existe, lo devolvemos
        } else {
            // Si el usuario no existe, lo insertamos en la base de datos
            const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
            db.query(sql, [name, email], (err, result) => {
                if (err) {
                    console.error('Error al insertar usuario con Google:', err);
                    return done(err); // Si hay error, lo manejamos
                }
                const newUser = { id: result.insertId, name, email }; // Creamos el nuevo usuario
                return done(null, newUser); // Devolvemos el nuevo usuario
            });
        }
    });
}));

// Estrategia de GitHub para inicio de sesión (sin cambios)
passport.use(new GitHubStrategy({
    clientID: 'TU_GITHUB_CLIENT_ID', // Cliente de GitHub OAuth2 (obtenido en la consola de GitHub)
    clientSecret: 'TU_GITHUB_CLIENT_SECRET', // Secreto del cliente GitHub OAuth2
    callbackURL: '/auth/github/callback' // URL de redirección después de la autenticación
}, (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value; // Obtenemos el correo del perfil de GitHub
    const name = profile.username; // Obtenemos el nombre de usuario de GitHub

    // Verificar si el usuario ya existe en la base de datos
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.error('Error al verificar usuario con GitHub:', err);
            return done(err); // Si hay error, lo manejamos
        }
        if (result.length > 0) {
            return done(null, result[0]); // Si el usuario existe, lo devolvemos
        } else {
            // Si el usuario no existe, lo insertamos en la base de datos
            const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
            db.query(sql, [name, email], (err, result) => {
                if (err) {
                    console.error('Error al insertar usuario con GitHub:', err);
                    return done(err); // Si hay error, lo manejamos
                }
                const newUser = { id: result.insertId, name, email }; // Creamos el nuevo usuario
                return done(null, newUser); // Devolvemos el nuevo usuario
            });
        }
    });
}));

// Middleware para verificar autenticación JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Obtenemos el token JWT del encabezado
    if (!token) {
        return res.status(403).json({ message: 'No token provided' }); // Si no hay token, devolvemos un error
    }

    // Verificamos el token usando el secreto de JWT
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' }); // Si el token no es válido, devolvemos un error
        }
        req.user = user; // Guardamos la información del usuario en la solicitud
        next(); // Pasamos al siguiente middleware o ruta
    });
};

// Ruta protegida
app.get('/dashboard', authenticateJWT, (req, res) => {
    res.send(`Bienvenido ${req.user.email}, este es tu panel de usuario`); // Devolvemos el panel de usuario solo si está autenticado
});

// Ruta para registrar un usuario
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body; // Extraemos nombre, correo y contraseña de la solicitud

    // Validación básica
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Por favor complete todos los campos' }); // Si falta algún campo, devolvemos un error
    }

    try {
        // Verificar si el usuario ya existe en la base de datos
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error en el servidor al verificar usuario.' }); // Error al consultar la base de datos
            }
            if (result.length > 0) {
                return res.status(400).json({ message: 'El usuario ya existe.' }); // El usuario ya existe, devolvemos un error
            } else {
                // Encriptar la contraseña antes de guardar
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error en el servidor al encriptar contraseña.' }); // Error al encriptar
                    }
                    // Insertamos el nuevo usuario en la base de datos
                    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
                    db.query(sql, [name, email, hash], (err, result) => {
                        if (err) {
                            return res.status(500).json({ message: 'Error en el servidor al insertar usuario.' }); // Error al insertar usuario
                        }
                        const userId = result.insertId; // Obtenemos el ID del nuevo usuario
                        // Generamos un token JWT para el nuevo usuario
                        const token = jwt.sign({ id: userId, email: email }, JWT_SECRET, { expiresIn: '1h' });

                        return res.status(200).json({ success: true, message: 'Registro exitoso', token }); // Devolvemos éxito y el token
                    });
                });
            }
        });
    } catch (err) {
        return res.status(500).json({ message: 'Error general en el servidor.' }); // Error general en el servidor
    }
});

// Iniciar servidor
app.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001'); // Iniciamos el servidor en el puerto 3001
});
