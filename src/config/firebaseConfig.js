// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider, // Import GoogleAuthProvider for Google Sign-In
  FacebookAuthProvider
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  deleteDoc, 
  getDoc, 
  setDoc // Asegúrate de importar setDoc
} from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Storage

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

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

// Function to register a user with email and password
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Usuario registrado:", userCredential.user);

    // Call to create the user's profile in Firestore
    await createUserProfile(userCredential.user);
    
    return userCredential;
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
    console.error("Error en el inicio de sesión:", error);
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

// Function to sign in with Google
export const signInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Inicio de sesión exitoso con Google:", result.user);
    return result.user;
  } catch (error) {
    console.error("Error en el inicio de sesión con Google:", error);
    throw new Error('Error en el inicio de sesión con Google. Intenta de nuevo.');
  }
};

// Function to sign in with Facebook
export const signInWithFacebook = async () => {
  const facebookProvider = new FacebookAuthProvider();
  
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    console.log("Inicio de sesión exitoso con Facebook:", result.user);
    return result.user;
  } catch (error) {
    console.error("Error en el inicio de sesión con Facebook:", error);
    throw new Error('Error en el inicio de sesión con Facebook. Intenta de nuevo.');
  }
};

// Function to add a new document to the "publicaciones" collection in Firestore
export const addPublication = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "publicaciones"), {
      ...data,
      vistas: 0,
      likes: 0,
      fechaPublicacion: new Date(),
    });
    console.log("Documento añadido con ID:", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error al añadir documento:", error);
    throw new Error('Error al añadir publicación. Intenta de nuevo.');
  }
};

// Function to upload a file to Firebase Storage and get its URL
export const uploadFile = async (file, folder) => {
  try {
    const fileRef = ref(storage, `${folder}/${file.name}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  } catch (error) {
    console.error("Error al subir archivo:", error);
    throw new Error('Error al subir archivo. Intenta de nuevo.');
  }
};

// Function to fetch all documents from the "publicaciones" collection
export const getPublications = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "publicaciones"));
    const publications = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log("Publicaciones obtenidas:", publications);
    return publications;
  } catch (error) {
    console.error("Error al obtener publicaciones:", error);
    throw new Error('Error al obtener publicaciones. Intenta de nuevo.');
  }
};

// Function to get a single publication by ID
export const getPublicationById = async (id) => {
  try {
    const docRef = doc(db, "publicaciones", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("No se encontró la publicación");
    }
  } catch (error) {
    console.error("Error al obtener la publicación:", error);
    throw new Error("No se pudo obtener la publicación.");
  }
};

// Function to update views, likes, or other fields in a specific document
export const updatePublication = async (docId, data) => {
  try {
    const docRef = doc(db, "publicaciones", docId);
    await updateDoc(docRef, data);
    console.log("Documento actualizado con éxito.");
  } catch (error) {
    console.error("Error al actualizar el documento:", error);
    throw new Error('Error al actualizar publicación. Intenta de nuevo.');
  }
};

// Function to delete a publication from the "publicaciones" collection
export const deletePublication = async (id) => {
  try {
    await deleteDoc(doc(db, "publicaciones", id));
    console.log("Publicación eliminada con éxito.");
  } catch (error) {
    console.error("Error al eliminar la publicación:", error);
    throw new Error("No se pudo eliminar la publicación.");
  }
};

// --- New functions for "perfiles" collection ---

// Function to create a user profile in the "perfiles" collection
export const createUserProfile = async (user) => {
  try {
    const userProfileRef = doc(db, "perfiles", user.uid);

    // Check if the profile already exists, if not, create one
    const userProfileSnapshot = await getDoc(userProfileRef);
    if (!userProfileSnapshot.exists()) {
      await setDoc(userProfileRef, {
        nombre: "", // Placeholder name, could be updated later
        email: user.email,
        descripcion: "", // Empty initially, can be edited
        especializacion: "", // Empty, could be filled by the user
        anioEstudio: 1, // Default value, can be updated later
        fotoPerfil: "" // URL of the profile picture, can be uploaded later
      });
      console.log("Perfil creado para el usuario:", user.uid);
    } else {
      console.log("El perfil ya existe.");
    }
  } catch (error) {
    console.error("Error al crear el perfil:", error);
    throw new Error("Error al crear el perfil. Intenta de nuevo.");
  }
};

// Function to get the user profile from the "perfiles" collection
export const getUserProfile = async (userId) => {
  try {
    const userProfileRef = doc(db, "perfiles", userId);
    const userProfileSnapshot = await getDoc(userProfileRef);

    if (userProfileSnapshot.exists()) {
      return { id: userProfileSnapshot.id, ...userProfileSnapshot.data() };
    } else {
      throw new Error("No se encontró el perfil.");
    }
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    throw new Error("No se pudo obtener el perfil.");
  }
};

// --- New functions for "pastPublications" collection ---

// Function to add a new document to the "pastPublications" collection in Firestore
export const addPastPublication = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "pastPublications"), {
      ...data,
      vistas: 0,
      likes: 0,
      fechaPublicacion: new Date(),
    });
    console.log("Documento de galería anterior añadido con ID:", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error al añadir galería anterior:", error);
    throw new Error('Error al añadir galería anterior. Intenta de nuevo.');
  }
};

// Function to fetch all documents from the "pastPublications" collection
export const getPastPublications = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "pastPublications"));
    const publications = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log("Galerías anteriores obtenidas:", publications);
    return publications;
  } catch (error) {
    console.error("Error al obtener galerías anteriores:", error);
    throw new Error('Error al obtener galerías anteriores. Intenta de nuevo.');
  }
};

// Function to update a document in the "pastPublications" collection
export const updatePastPublication = async (docId, data) => {
  try {
    const docRef = doc(db, "pastPublications", docId);
    await updateDoc(docRef, data);
    console.log("Documento de galería anterior actualizado con éxito.");
  } catch (error) {
    console.error("Error al actualizar el documento de galería anterior:", error);
    throw new Error('Error al actualizar la galería anterior. Intenta de nuevo.');
  }
};

// Function to delete a document from the "pastPublications" collection
export const deletePastPublication = async (id) => {
  try {
    await deleteDoc(doc(db, "pastPublications", id));
    console.log("Galería anterior eliminada con éxito.");
  } catch (error) {
    console.error("Error al eliminar la galería anterior:", error);
    throw new Error("No se pudo eliminar la galería anterior.");
  }
};
