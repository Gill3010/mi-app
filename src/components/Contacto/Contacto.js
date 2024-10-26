const Contacto = () => {
  return (
    <section id="contacto" className="bg-[var(--color-azul-oscuro)] text-white py-20 wave-top">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">¡Contáctanos!</h2>
        <form className="max-w-md mx-auto">
          <input type="text" placeholder="Nombre" className="w-full p-3 mb-4 rounded-lg text-gray-800" />
          <input type="email" placeholder="Correo electrónico" className="w-full p-3 mb-4 rounded-lg text-gray-800" />
          <textarea placeholder="Asunto" className="w-full p-3 mb-4 rounded-lg text-gray-800"></textarea>
          <button type="submit" className="bg-[var(--color-teal)] text-white px-6 py-3 rounded-lg hover:bg-teal-600">Enviar</button>
        </form>
      </div>
    </section>
  );
};

export default Contacto;