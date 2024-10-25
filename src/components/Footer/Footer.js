const Footer = () => {
  return (
    <footer className="bg-[var(--color-azul-oscuro)] text-white py-6">
      <div className="container mx-auto text-center">
        <p>© 2024 Innova Proyectos. Todos los derechos reservados</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="text-[var(--color-teal)]">LinkedIn</a>
          <a href="#" className="text-[var(--color-teal)]">GitHub</a>
          <a href="#" className="text-[var(--color-teal)]">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;