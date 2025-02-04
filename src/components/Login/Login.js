import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, loginUser } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  facebookProvider.addScope("email");

  const [isMobileOrSafari, setIsMobileOrSafari] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.role === "Docente") {
            navigate("/perfil-docente");
          } else if (userData.role === "Estudiante") {
            navigate("/perfil-estudiante");
          }
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobileOrSafari(isSafari || isMobile);

    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const accessToken = credential.accessToken;
          setSuccessMessage("¡Inicio de sesión con Facebook exitoso!");
          localStorage.setItem("token", accessToken);
          navigate("/");
        }
      } catch (error) {
        setError(
          "Error en el inicio de sesión con Facebook. Por favor intenta de nuevo."
        );
      } finally {
        setIsRedirecting(false);
      }
    };

    if (isRedirecting) {
      handleRedirectResult();
    }
  }, [navigate, isRedirecting]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);

      const userCredential = await loginUser(email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === "Docente") {
          navigate("/perfil-docente");
        } else if (userData.role === "Estudiante") {
          navigate("/perfil-estudiante");
        } else {
          setError("Rol desconocido. Por favor, contacta al soporte.");
        }
      } else {
        setError("No se encontró la información del usuario.");
      }
    } catch (error) {
      setError(
        "Error durante el inicio de sesión. Por favor intenta de nuevo."
      );
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signOut(auth);

      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      setSuccessMessage("¡Inicio de sesión con Google exitoso!");
      localStorage.setItem("token", token);

      const userDocRef = doc(db, "users", result.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.role === "Docente") {
          navigate("/perfil-docente");
        } else if (userData.role === "Estudiante") {
          navigate("/perfil-estudiante");
        } else {
          setError("Rol desconocido. Por favor, contacta al soporte.");
        }
      }
    } catch (error) {
      setError(
        "Error en el inicio de sesión con Google. Por favor intenta de nuevo."
      );
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await signOut(auth);

      setIsRedirecting(true);
      if (isMobileOrSafari) {
        await signInWithRedirect(auth, facebookProvider);
      } else {
        const result = await signInWithPopup(auth, facebookProvider);
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        setSuccessMessage("¡Inicio de sesión con Facebook exitoso!");
        localStorage.setItem("token", accessToken);

        const userDocRef = doc(db, "users", result.user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();

          if (userData.role === "Docente") {
            navigate("/perfil-docente");
          } else if (userData.role === "Estudiante") {
            navigate("/perfil-estudiante");
          } else {
            setError("Rol desconocido. Por favor, contacta al soporte.");
          }
        }
      }
    } catch (error) {
      setError(
        error.message ||
          "Error en el inicio de sesión con Facebook. Por favor intenta de nuevo."
      );
      setIsRedirecting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#FFC107]">
        Iniciar Sesión
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}
      {isRedirecting && (
        <p className="text-yellow-300 mb-4">Redirigiendo a Facebook...</p>
      )}
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 shadow-2xl rounded-lg text-gray-800"
      >
        <div className="mb-6">
          <label htmlFor="email" className="block text-lg">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
          />
        </div>

        <div className="mb-8">
          <label htmlFor="password" className="block text-lg">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#FFC107] text-white py-3 rounded-lg text-lg hover:bg-[#2E7D32] transition duration-300"
        >
          Iniciar Sesión
        </button>
      </form>
      <div className="mt-8 w-full max-w-md">
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 bg-red-500 text-white py-3 rounded-lg text-lg flex items-center justify-center hover:bg-red-600 transition duration-300"
        >
          <FaGoogle className="mr-2" /> Iniciar sesión con Google
        </button>

        <button
          onClick={handleFacebookLogin}
          className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg text-lg flex items-center justify-center hover:bg-blue-700 transition duration-300"
        >
          <FaFacebookF className="mr-2" /> Iniciar sesión con Facebook
        </button>
      </div>
      <div className="mt-6">
        <p>
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="text-[#1B5E20] hover:underline">
            Crea una como Docente ó Estudiante
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
