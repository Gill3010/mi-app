import React, { useState, useEffect } from "react";
import {
  addPublication,
  addPastPublication,
  auth,
} from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FormularioEnvio = () => {
  const [formData, setFormData] = useState({
    nombreAutor: "",
    apellidoAutor: "",
    correo: "",
    telefono: "",
    institucion: "",
    orcid: "",
    pais: "",
    galeria: "actual",
    instrucciones: "",
    metodoPago: "",
    vistas: 0,
    likes: 0,
    tituloInvestigacion: "",
    imagen: null,
    resumen: null,
    audio: null,
    doi: "",
  });
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const storage = getStorage();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const validateForm = () => {
    if (
      !formData.nombreAutor ||
      !formData.apellidoAutor ||
      !formData.correo ||
      !formData.telefono ||
      !formData.tituloInvestigacion
    ) {
      setError("Por favor, completa todos los campos obligatorios.");
      return false;
    }
    setError("");
    return true;
  };

  const uploadFile = async (file, folder) => {
    const fileRef = ref(storage, `${folder}/${file.name}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const userId = auth.currentUser ? auth.currentUser.uid : null;
      if (!userId) {
        setError("Debes iniciar sesión para enviar una publicación.");
        return;
      }

      const imageUrl = formData.imagen
        ? await uploadFile(formData.imagen, "imagenes")
        : null;
      const resumenUrl = formData.resumen
        ? await uploadFile(formData.resumen, "resumenes")
        : null;
      const audioUrl = formData.audio
        ? await uploadFile(formData.audio, "audios")
        : null;

      if (formData.galeria === "actual") {
        await addPublication({
          ...formData,
          imagen: imageUrl,
          resumen: resumenUrl,
          audio: audioUrl,
          fechaPublicacion: new Date(),
          vistas: formData.vistas,
          likes: formData.likes,
          userId,
        });
      } else {
        await addPastPublication({
          ...formData,
          imagen: imageUrl,
          resumen: resumenUrl,
          audio: audioUrl,
          fechaPublicacion: new Date(),
          vistas: formData.vistas,
          likes: formData.likes,
          userId,
        });
      }

      alert("Formulario enviado con éxito");
      navigate(
        formData.galeria === "actual"
          ? "/GaleriasActuales"
          : "/GaleriasAnteriores"
      );
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setError("Error al enviar el formulario. Intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#FFC107]">
          Creación de Publicación
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-lg shadow-lg"
        >
          <input
            type="text"
            name="nombreAutor"
            value={formData.nombreAutor}
            onChange={handleChange}
            placeholder="Nombre del Autor"
            required
            className="w-full px-4 py-2 border border-[#002855] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]"
          />
          <input
            type="text"
            name="apellidoAutor"
            value={formData.apellidoAutor}
            onChange={handleChange}
            placeholder="Apellido del Autor"
            required
            className="w-full px-4 py-2 border border-[#002855] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]"
          />
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            placeholder="Correo Electrónico"
            required
            className="w-full px-4 py-2 border border-[#002855] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]"
          />
          <div className="mb-4">
            <label
              htmlFor="telefono"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Número de Teléfono
            </label>
            <div className="flex flex-wrap sm:flex-nowrap">
              <select
                name="codigoArea"
                value={formData.codigoArea}
                onChange={handleChange}
                className="px-4 py-2 border border-[#002855] rounded-t-lg sm:rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#002855] w-full sm:w-auto"
                required
              >
                <option value="" disabled>
                  Código de área
                </option>
                <option value="+507">+507 (Panamá)</option>
                <option value="+57">+57 (Colombia)</option>
                <option value="+1">+1 (Estados Unidos)</option>
                <option value="+52">+52 (México)</option>
                <option value="+34">+34 (España)</option>
                <option value="+44">+44 (Reino Unido)</option>
                <option value="+91">+91 (India)</option>
                <option value="+81">+81 (Japón)</option>
                <option value="+61">+61 (Australia)</option>
              </select>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Número de Teléfono"
                required
                className="flex-1 px-4 py-2 border border-l-0 border-[#002855] rounded-b-lg sm:rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#002855] w-full sm:w-auto"
              />
            </div>
          </div>

          <input
            type="text"
            name="institucion"
            value={formData.institucion}
            onChange={handleChange}
            placeholder="Institución"
            className="w-full px-4 py-2 border border-[#002855] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]"
          />
          <input
            type="text"
            name="orcid"
            value={formData.orcid}
            onChange={handleChange}
            placeholder="ORCID"
            className="w-full px-4 py-2 border border-[#002855] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]"
          />
          <input
            type="text"
            name="pais"
            value={formData.pais}
            onChange={handleChange}
            placeholder="País de Origen"
            className="w-full px-4 py-2 border border-[#002855] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]"
          />

          <select
            name="galeria"
            value={formData.galeria}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#002855] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]"
          >
            <option value="actual">Galería Actual</option>
            <option value="anterior">
              II Encuentro de Investigaciones Cualitativas
            </option>
          </select>

          <input
            type="text"
            name="tituloInvestigacion"
            value={formData.tituloInvestigacion}
            onChange={handleChange}
            placeholder="Título de la Investigación"
            required
            className="w-full px-4 py-2 border border-[#002855] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]"
          />
          <input
            type="text"
            name="doi"
            value={formData.doi}
            onChange={handleChange}
            placeholder="DOI"
            className="w-full px-4 py-2 border border-[#002855] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]"
          />

          <div className="mb-4">
            <label
              htmlFor="imagen"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Seleccionar imagen (JPG, JPEG, PNG | Máx. 10 MB)
            </label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#002855] rounded-lg"
              accept=".jpg,.jpeg,.png"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="resumen"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Seleccionar resumen (PDF | Máx. 300 palabras)
            </label>
            <input
              type="file"
              id="resumen"
              name="resumen"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#002855] rounded-lg"
              accept=".pdf"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="audio"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Seleccionar audio (MP3 | Máx. 10 MB)
            </label>
            <input
              type="file"
              id="audio"
              name="audio"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#002855] rounded-lg"
              accept=".mp3"
            />
          </div>

          <select
            name="metodoPago"
            value={formData.metodoPago}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#002855] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855]"
          >
            <option value="">Selecciona un método de pago</option>
            <option value="paypal">PayPal</option>
            <option value="banco">Banco</option>
            <option value="western_union">Western Union</option>
            <option value="yappy">Yappy</option>
          </select>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#1B5E20] to-[#FFC107] text-white py-2 px-4 rounded-lg transition duration-300"
          >
            Enviar Documento
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioEnvio;
