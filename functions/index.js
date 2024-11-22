const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Inicializar Firebase Admin
admin.initializeApp();

// Escuchar eventos de creación de usuarios
exports.assignRoleOnSignUp = functions.auth.user().onCreate(async (user) => {
  try {
    const {uid} = user;

    // Consulta la colección de usuarios en Firestore
    const userDoc = await admin
        .firestore()
        .collection("users")
        .doc(uid)
        .get();

    const userData = userDoc.data();

    if (userData && userData.role === "docente") {
      // Asignar el rol 'docente' al usuario
      await admin.auth().setCustomUserClaims(uid, {role: "docente"});
      console.log(`Rol 'docente' asignado al usuario con UID: ${uid}`);
    } else {
      console.log(
          `Usuario con UID ${uid} no tiene el rol de 'docente' en Firestore.`,
      );
    }
  } catch (error) {
    console.error("Error al asignar el rol:", error);
  }
});
