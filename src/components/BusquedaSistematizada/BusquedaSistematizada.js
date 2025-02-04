import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const BusquedaSistematizada = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(
      collection(db, "cursos"),
      where("categoria", "==", "BusquedaSistematizada")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const itemsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsData);
    });

    return () => unsubscribe();
  }, []);

  const handleItemClick = (id) => {
    navigate(`/detalles-curso/${id}`);
  };

  return (
    <div className="min-h-screen w-full bg-white p-6 md:p-12">
      {/* Título del componente */}
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#FFC107] shadow-xl p-6 bg-white rounded-lg">
        Búsqueda sistematizada de Información con Herramientas IA
      </h2>

      {/* Descripción del componente */}
      <div className="text-center p-4 bg-white rounded-lg shadow-md mb-8">
        <p className="text-lg md:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#FFC107]">
          Descubre herramientas avanzadas de inteligencia artificial que
          optimizan la búsqueda de información y mejoran tu productividad.
        </p>
      </div>

      {/* Carrusel */}
      <div className="flex overflow-x-auto space-x-6 scroll-smooth scrollbar-hide">
        {items.map((item) => (
          <div
            key={item.id}
            className="min-w-[300px] flex flex-col bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#FFC107] p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition duration-300 transform hover:scale-105 hover:bg-[#005073]"
            onClick={() => handleItemClick(item.id)}
          >
            <img
              src={item.imagen}
              alt={item.titulo}
              className="rounded-lg w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white">
                {item.titulo}
              </h3>
              <p className="text-white mt-2 text-sm">{item.descripcion}</p>
              <p className="text-lg font-bold text-white mt-4">
                Precio: {item.precio ? `$${item.precio}` : "No disponible"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusquedaSistematizada;
