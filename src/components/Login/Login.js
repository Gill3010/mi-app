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
} from "firebase/auth";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Mensaje de éxito
  const [isRedirecting, setIsRedirecting] = useState(false); // Estado de redirección
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  // Si necesitas permisos adicionales como el correo electrónico
  facebookProvider.addScope("email");

  const [isMobileOrSafari, setIsMobileOrSafari] = useState(false);

  useEffect(() => {
    // Función para detectar Safari o dispositivos móviles
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobileOrSafari(isSafari || isMobile);

    // Manejar el resultado de la redirección después de signInWithRedirect
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const accessToken = credential.accessToken;
          console.log("Inicio de sesión con Facebook exitoso:", result.user);
          setSuccessMessage("¡Inicio de sesión con Facebook exitoso!");
          localStorage.setItem("token", accessToken);
          navigate("/"); // Redirigir a la página de inicio
        }
      } catch (error) {
        console.error("Error en el inicio de sesión con Facebook:", error);
        setError(
          error.message ||
            "Error en el inicio de sesión con Facebook. Por favor intenta de nuevo."
        );
      } finally {
        setIsRedirecting(false); // Finalizar el proceso de redirección
      }
    };

    if (isRedirecting) {
      handleRedirectResult();
    }
  }, [navigate, isRedirecting]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await loginUser(email, password);
      const user = userCredential.user;

      // Obtener el rol del usuario desde Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("Usuario autenticado:", userData);

        // Redirigir según el rol
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
      console.error("Error en el inicio de sesión:", error);
      setError(
        "Error durante el inicio de sesión. Por favor intenta de nuevo."
      );
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log("Inicio de sesión con Google exitoso:", result.user);
      setSuccessMessage("¡Inicio de sesión con Google exitoso!");
      localStorage.setItem("token", token);

      // Obtener el rol del usuario desde Firestore
      const userDocRef = doc(db, "users", result.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Redirigir según el rol
        if (userData.role === "Docente") {
          navigate("/perfil-docente");
        } else if (userData.role === "Estudiante") {
          navigate("/perfil-estudiante");
        } else {
          setError("Rol desconocido. Por favor, contacta al soporte.");
        }
      }
    } catch (error) {
      console.error("Error en el inicio de sesión con Google:", error);
      setError(
        "Error en el inicio de sesión con Google. Por favor intenta de nuevo."
      );
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setIsRedirecting(true); // Iniciar el estado de redirección
      if (isMobileOrSafari) {
        // Usar signInWithRedirect en dispositivos móviles y Safari
        await signInWithRedirect(auth, facebookProvider);
      } else {
        // Usar signInWithPopup en otros navegadores
        const result = await signInWithPopup(auth, facebookProvider);
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log("Inicio de sesión con Facebook exitoso:", result.user);
        setSuccessMessage("¡Inicio de sesión con Facebook exitoso!");
        localStorage.setItem("token", accessToken);

        // Obtener el rol del usuario desde Firestore
        const userDocRef = doc(db, "users", result.user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();

          // Redirigir según el rol
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
      console.error("Error en el inicio de sesión con Facebook:", error);
      setError(
        error.message ||
          "Error en el inicio de sesión con Facebook. Por favor intenta de nuevo."
      );
      setIsRedirecting(false); // Finalizar el estado de redirección en caso de error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#1E3A8A] to-[#4CAF50] text-white">
      <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
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
          <label htmlFor="email" className="block text-gray-700 text-lg">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]"
          />
        </div>

        <div className="mb-8">
          <label htmlFor="password" className="block text-gray-700 text-lg">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#002855] text-white py-3 rounded-lg text-lg hover:bg-[#005073] transition duration-300"
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
          <a href="/register" className="text-blue-200 hover:underline">
            Crea una como Docente ó Estudiante
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
