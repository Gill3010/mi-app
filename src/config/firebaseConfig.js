// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";  // Cambiamos a "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Function to register a user with email and password
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Usuario registrado:", userCredential.user);
    return userCredential;  // Devuelve el usuario registrado para usar en otras funciones
  } catch (error) {
    console.error("Error al registrar:", error);
    throw new Error('Error al registrar. Verifica tus credenciales o intenta de nuevo.');
  }
};

// Function to log in a user with email and password
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Inicio de sesión exitoso:", userCredential.user);
    return userCredential;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw new Error('Error en el inicio de sesión. Verifica tus credenciales o intenta de nuevo.');
  }
};

// Function to log out the current user
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("Usuario ha cerrado sesión");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw new Error('Error al cerrar sesión. Intenta de nuevo.');
  }
};