const admin = require("firebase-admin");

// Importar el archivo de credenciales
const serviceAccount = require("./src/config/mi-app-fc514-firebase-adminsdk-fl30l-09b28335d.json");

// Inicializar el Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("Firebase Admin SDK configurado correctamente");

module.exports = admin;
