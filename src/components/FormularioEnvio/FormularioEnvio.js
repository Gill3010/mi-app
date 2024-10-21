import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormularioEnvio = () => {
  const [formData, setFormData] = useState({
    nombreAutor: '',
    apellidoAutor: '',
    correo: '',
    telefono: '',
    institucion: '',
    orcid: '',
    pais: '',
    galeria: '',
    instrucciones: '',
    archivos: [],
    metodoPago: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileUpload = (e) => {
    setFormData({
      ...formData,
      archivos: [...formData.archivos, ...e.target.files],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar los datos del formulario al backend usando Axios
    axios.post('http://localhost:3001/api/formulario', formData)
      .then((response) => {
        console.log(response.data);
        // Redirigir a la página "Galerías actuales" después de enviar el formulario
        navigate('/galerias-actuales');
      })
      .catch((error) => {
        console.error('Error al enviar el formulario:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-3xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">Formulario de Envío de Documento</h2>
      
      {/* Datos del Autor */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="nombreAutor"
          placeholder="Nombre del Autor"
          className="border p-2 rounded"
          value={formData.nombreAutor}
          onChange={handleChange}
        />
        <input
          type="text"
          name="apellidoAutor"
          placeholder="Apellido del Autor"
          className="border p-2 rounded"
          value={formData.apellidoAutor}
          onChange={handleChange}
        />
      </div>
      
      {/* Otros Datos */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="email"
          name="correo"
          placeholder="Correo Electrónico"
          className="border p-2 rounded"
          value={formData.correo}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Número de Teléfono"
          className="border p-2 rounded"
          value={formData.telefono}
          onChange={handleChange}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="institucion"
          placeholder="Nombre de la Institución"
          className="border p-2 rounded"
          value={formData.institucion}
          onChange={handleChange}
        />
        <input
          type="text"
          name="orcid"
          placeholder="ORCID"
          className="border p-2 rounded"
          value={formData.orcid}
          onChange={handleChange}
        />
      </div>
      
      <input
        type="text"
        name="pais"
        placeholder="País de Origen"
        className="border p-2 rounded w-full"
        value={formData.pais}
        onChange={handleChange}
      />
      
      <input
        type="text"
        name="galeria"
        placeholder="Nombre de la Galería"
        className="border p-2 rounded w-full"
        value={formData.galeria}
        onChange={handleChange}
      />
      
      <textarea
        name="instrucciones"
        placeholder="Instrucciones"
        className="border p-2 rounded w-full"
        value={formData.instrucciones}
        onChange={handleChange}
      ></textarea>

      {/* Subida de Archivos */}
      <div className="border p-4 rounded">
        <label className="block mb-2">Subir Archivos (Texto, Imagen, Audio):</label>
        <input
          type="file"
          name="archivos"
          accept=".txt, .jpg, .png, .mp3"
          multiple
          onChange={handleFileUpload}
          className="block w-full p-2 border rounded"
        />
      </div>

      {/* Métodos de Pago */}
      <div className="border p-4 rounded">
        <h3 className="text-lg font-bold">Método de Pago</h3>
        <div className="flex space-x-4">
          <label>
            <input type="radio" name="metodoPago" value="paypal" onChange={handleChange} /> PayPal
          </label>
          <label>
            <input type="radio" name="metodoPago" value="banco" onChange={handleChange} /> Transferencia Bancaria (Banco General)
          </label>
          <label>
            <input type="radio" name="metodoPago" value="western_union" onChange={handleChange} /> Western Union
          </label>
          <label>
            <input type="radio" name="metodoPago" value="yappy" onChange={handleChange} /> Yappy
          </label>
        </div>
      </div>

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Enviar Documento
      </button>
    </form>
  );
};

export default FormularioEnvio;
