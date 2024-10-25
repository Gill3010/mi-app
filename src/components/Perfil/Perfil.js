const Perfil = ({ nombre, descripcion, imagen, cvLink }) => {
  return (
    <div className="bg-perfil text-white shadow-lg rounded-lg overflow-hidden mb-10 mx-auto max-w-md p-6">
      <img src={imagen} alt={nombre} className="rounded-full w-32 h-32 object-cover mx-auto mt-6" />
      <div className="p-6 text-center">
        <h3 className="text-2xl font-semibold mb-2">{nombre}</h3>
        <p className="text-gray-200 mb-4">{descripcion}</p>
        <a href={cvLink} className="bg-[var(--color-teal)] text-white px-4 py-2 rounded-md hover:bg-teal-600">
          Descargar CV
        </a>
      </div>
    </div>
  );
};

export default Perfil;
