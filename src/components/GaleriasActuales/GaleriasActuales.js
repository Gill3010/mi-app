import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GaleriasActuales = () => {
  const [galerias, setGalerias] = useState([]);

  useEffect(() => {
    // Hacer la solicitud para obtener los datos de las galerías
    axios.get('http://localhost:3001/api/galerias')
      .then((response) => {
        setGalerias(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las galerías:', error);
      });
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Galerías Actuales</h2>
      {galerias.length === 0 ? (
        <p>No hay galerías disponibles en este momento.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {galerias.map((galeria) => (
            <div key={galeria.id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{galeria.galeria_nombre}</h3>
              <p><strong>Autor:</strong> {galeria.nombre_autor} {galeria.apellido_autor}</p>
              <p><strong>Institución:</strong> {galeria.institucion}</p>
              <p><strong>Instrucciones:</strong> {galeria.instrucciones}</p>
              <p><strong>Vistas:</strong> {galeria.vistas} | <strong>Descargas:</strong> {galeria.descargas} | <strong>Likes:</strong> {galeria.likes}</p>
              <p><strong>Fecha de Publicación:</strong> {new Date(galeria.fecha_publicacion).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GaleriasActuales;
