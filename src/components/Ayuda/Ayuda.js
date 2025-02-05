import React from "react";

const Ayuda = () => {
  return (
    <div className="bg-white text-black py-10 px-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#FFC107]">
        Paso a Paso: Creación y Gestión de Publicaciones, Usuarios, Roles,
        Cursos y Contenidos
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#FFC107]">
          Crear una Publicación Científica
        </h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Ingresa a la página de creación de publicaciones. (
            <a
              href="https://portaldecartelescientificos.org/CrearPublicacion"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 underline hover:text-blue-400"
            >
              Creación de Publicación
            </a>
            )
          </li>
          <div className="mt-4">
            <p className="font-semibold">Ejemplo:</p>
            <img
              src="/img/Paso0.png"
              alt="Ejemplo de creación de publicación"
              className="rounded-lg shadow-lg"
            />
          </div>
          <li>
            Rellena los campos necesarios para la publicación (nombre, apellido,
            título etc.).
          </li>
          <li>
            Adjunta los archivos relevantes como imagen (JPG, JPEG, PNG),
            resumen (PDF, máximo de 300 palabras), y audio (MP3).
          </li>

          <li>
            Revisa la vista previa y haz clic en el botón "Enviar documento"
            para hacer que tu publicación esté disponible.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#FFC107]">
          Registrar un Usuario con un Rol Específico
        </h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Ve a la página de registro. (
            <a
              href="https://portaldecartelescientificos.org/register"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 underline hover:text-blue-400"
            >
              Registro
            </a>
            )
          </li>
          <li>
            Completa los campos requeridos (nombre, correo, contraseña, etc.).
          </li>
          <li>Selecciona un rol (por ejemplo, estudiante o docente).</li>
          <li>Haz clic en el botón 'Registrar' para guardar la información.</li>
        </ol>
        <div className="mt-4">
          <p className="font-semibold">Ejemplo:</p>
          <img
            src="/img/Paso1.png"
            alt="Ejemplo de registro"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#FFC107]">
          Crear un Perfil
        </h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Una vez registrado, serás redirigido a una página para configurar tu
            perfil.
          </li>
          <li>
            Completa la información adicional requerida (foto de perfil,
            biografía, intereses, etc.).
          </li>
          <li>Guarda los cambios.</li>
        </ol>
        <div className="mt-4">
          <p className="font-semibold">Ejemplo:</p>
          <img
            src="/img/Paso2.png"
            alt="Ejemplo de perfil"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#FFC107]">
          Acceder a Funcionalidades Según el Rol
        </h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Si tienes el rol de docente, tendrás acceso a la funcionalidad de
            creación de cursos.
          </li>
          <li>
            En el panel principal, busca y haz clic en el botón 'Crear Curso'.
          </li>
        </ol>
        <div className="mt-4">
          <p className="font-semibold">Ejemplo:</p>
          <img
            src="/img/Paso3.png"
            alt="Ejemplo de creación de curso"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#FFC107]">
          Crear un Nuevo Curso
        </h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Al hacer clic en 'Crear Curso', completa los campos del formulario
            (nombre del curso, descripción, etc.).
          </li>
          <li>Haz clic en 'Guardar' para registrar el curso.</li>
        </ol>
        <div className="mt-4">
          <p className="font-semibold">Ejemplo:</p>
          <img
            src="/img/Paso4.png"
            alt="Ejemplo de nuevo curso"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#FFC107]">
          Agregar Contenidos o Materias al Curso
        </h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Después de crear el curso, el sistema redirige a crear una materia.
          </li>
          <li>
            Completa los campos requeridos (nombre de la materia, videos,
            materiales evaluativos, etc.).
          </li>
          <li>Guarda la materia para vincularla con el curso.</li>
        </ol>
        <div className="mt-4">
          <p className="font-semibold">Ejemplo:</p>
          <img
            src="/img/Paso5.png"
            alt="Ejemplo de agregar materia"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#FFC107]">
          Agregar Examen o Prueba al Curso
        </h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Configura la prueba: Rellena los detalles de la prueba (nombre,
            preguntas, respuestas, etc.).
          </li>
          <li>Guarda los cambios.</li>
        </ol>
        <div className="mt-4">
          <p className="font-semibold">Ejemplo:</p>
          <img
            src="/img/Paso6.png"
            alt="Ejemplo de agregar examen"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <p className="text-sm mt-6">
        <strong>Nota:</strong> Todos los pasos se automatizarán una vez que se
        vayan creando, facilitando el proceso sin intervención manual adicional.
      </p>
    </div>
  );
};

export default Ayuda;
