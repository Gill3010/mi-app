// Importar funciones
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


// Configuración  de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA-ZbSeK3srHqUcZonwxliBCsLV0SL0xqE",
  authDomain: "portaldecartelescientificos.firebaseapp.com",
  projectId: "portaldecartelescientificos",
  storageBucket: "portaldecartelescientificos.appspot.com",
  messagingSenderId: "786637722028",
  appId: "1:786637722028:web:d14e11e1bd61e6a70d6a09"
};

// Inicializar firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new  GithubAuthProvider();
const googleProvider = new GoogleAuthProvider()

// Registrar usuario con github
export const githubRegister  = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Usuario autenticado ",  user);
  } catch(error){
    console.log("Error al autenticar con github ", error);
  }
}



export const googleRegister  = async () => {
  try {
    const result = await googleProvider(auth, provider);
    const user = result.user;
    console.log("Usuario autenticado en google",  user);
  } catch(error){
    console.log("Error al autenticar con google ", error);
  }
}