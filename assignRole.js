const admin = require("./adminConfig");

const setDocenteRole = async (uid) => {
  try {
    // Asignar el rol "docente" al usuario con el UID proporcionado
    await admin.auth().setCustomUserClaims(uid, { role: "docente" });
    console.log(`Rol 'docente' asignado al usuario con UID: ${uid}`);
  } catch (error) {
    console.error("Error al asignar el rol:", error);
  }
};

// Cambia el UID por el del usuario al que deseas asignar el rol
const userId = "UID_DEL_USUARIO"; // Reemplaza esto con el UID real del usuario
setDocenteRole(userId);
