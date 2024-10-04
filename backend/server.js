const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

const app = express();
app.use(express.json());
app.use(cors());

// Configuración de la sesión
app.use(session({
    secret: '4I@vBzL1a7CxB#JkP8qzM2wQ8^9H!lTxN3rE',  // Secreto real para firmar las cookies
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Cambiar a true si usas HTTPS en producción
}));

// Inicializar Passport y sesiones
app.use(passport.initialize());
app.use(passport.session());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'Innova24',
    password: 'Innova.2024',
    database: 'Innova'
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

// Serialización y deserialización del usuario
passport.serializeUser((user, done) => {
    done(null, user.id);  // Almacena solo el ID del usuario en la sesión
});

passport.deserializeUser((id, done) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
        if (err) {
            console.error('Error deserializando el usuario:', err);
            return done(err, null);
        }
        done(null, user[0]);  // Recupera el usuario de la base de datos
    });
});

// Estrategia de Google para inicio de sesión
passport.use(new GoogleStrategy({
    clientID: 'TU_GOOGLE_CLIENT_ID',
    clientSecret: 'TU_GOOGLE_CLIENT_SECRET',
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;
    const name = profile.displayName;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.error('Error al verificar usuario con Google:', err);
            return done(err);
        }
        if (result.length > 0) {
            return done(null, result[0]);
        } else {
            const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
            db.query(sql, [name, email], (err, result) => {
                if (err) {
                    console.error('Error al insertar usuario con Google:', err);
                    return done(err);
                }
                const newUser = { id: result.insertId, name, email };
                return done(null, newUser);
            });
        }
    });
}));

// Estrategia de GitHub para inicio de sesión
passport.use(new GitHubStrategy({
    clientID: 'TU_GITHUB_CLIENT_ID',
    clientSecret: 'TU_GITHUB_CLIENT_SECRET',
    callbackURL: '/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;
    const name = profile.username;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.error('Error al verificar usuario con GitHub:', err);
            return done(err);
        }
        if (result.length > 0) {
            return done(null, result[0]);
        } else {
            const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
            db.query(sql, [name, email], (err, result) => {
                if (err) {
                    console.error('Error al insertar usuario con GitHub:', err);
                    return done(err);
                }
                const newUser = { id: result.insertId, name, email };
                return done(null, newUser);
            });
        }
    });
}));

// Middleware para verificar autenticación
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

// Ruta para autenticación con Google
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));

// Ruta para autenticación con GitHub
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback', passport.authenticate('github', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));

// Ruta protegida, solo accesible si el usuario está autenticado
app.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.send('Bienvenido a tu panel de usuario');
});

// Ruta para registrar un usuario
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
            if (err) {
                console.error('Error al verificar usuario:', err);
                return res.status(500).json({ message: 'Error en el servidor al verificar usuario.' });
            }
            if (result.length > 0) {
                return res.status(400).json({ message: 'El usuario ya existe.' });
            } else {
                // Encriptar la contraseña
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        console.error('Error al encriptar contraseña:', err);
                        return res.status(500).json({ message: 'Error en el servidor al encriptar contraseña.' });
                    }
                    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
                    db.query(sql, [name, email, hash], (err, result) => {
                        if (err) {
                            console.error('Error al insertar usuario:', err);
                            return res.status(500).json({ message: 'Error en el servidor al insertar usuario.' });
                        }
                        res.status(200).json({ success: true, message: 'Registro exitoso' });
                    });
                });
            }
        });
    } catch (err) {
        console.error('Error general:', err);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
});

// Iniciar servidor
app.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001');
});
