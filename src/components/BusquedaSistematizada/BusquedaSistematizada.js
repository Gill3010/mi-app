import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirección dinámica
import { db } from '../../config/firebaseConfig'; // Configuración de Firebase
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const BusquedaSistematizada = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate(); // Hook para redirección

  // Obtener datos filtrados en tiempo real desde Firestore
  useEffect(() => {
    const q = query(
      collection(db, 'cursos'), // Usamos la colección 'cursos'
      where('categoria', '==', 'BusquedaSistematizada') // Filtramos por categoría
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const itemsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(itemsData);
    });

    return () => unsubscribe(); // Limpiar la suscripción
  }, []);

  const handleItemClick = (id) => {
    // Redirigir al componente de detalles del curso con el ID
    navigate(`/detalles-curso/${id}`);
  };

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto bg-gradient-to-r from-[#1E3A8A] to-[#4CAF50]">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 shadow-xl p-6 bg-white rounded-lg">
        Búsqueda sistematizada de Información con Herramientas IA
      </h2>

      <div className="text-center p-4 bg-white rounded-lg shadow-md mb-8">
        <p className="text-lg md:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
          Descubre herramientas avanzadas de inteligencia artificial que optimizan la búsqueda de información y mejoran tu productividad.
        </p>
      </div>

      <div className="flex overflow-x-auto space-x-6 scroll-smooth scrollbar-hide">
        {items.map((item) => (
          <div
            key={item.id}
            className="min-w-[300px] flex flex-col bg-white border border-[#002855] p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition duration-300 transform hover:scale-105 hover:bg-[#005073]"
            onClick={() => handleItemClick(item.id)} // Redirigir al hacer clic
          >
            <img
              src={item.imagen}
              alt={item.titulo}
              className="rounded-lg w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-[#003366]">{item.titulo}</h3>
              <p className="text-gray-600 mt-2 text-sm">{item.descripcion}</p>
              <p className="text-lg font-bold text-[#005599] mt-4">
                Precio: {item.precio ? `$${item.precio}` : 'No disponible'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusquedaSistematizada;
