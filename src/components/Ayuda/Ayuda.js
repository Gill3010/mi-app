import React from "react";

const Ayuda = () => {
  return (
    <div className="bg-gradient-to-r from-[#1E3A8A] to-[#4CAF50] text-white py-10 px-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Paso a Paso: Creación y Gestión de Usuarios, Roles, Cursos y Contenidos
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">
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
            src="/img/Paso1.jpg"
            alt="Ejemplo de registro"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Crear un Perfil</h2>
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
            src="/img/Paso2.jpg"
            alt="Ejemplo de perfil"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">
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
            src="/img/Paso3.jpg"
            alt="Ejemplo de creación de curso"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Crear un Nuevo Curso</h2>
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
            src="/img/Paso4.jpg"
            alt="Ejemplo de nuevo curso"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">
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
            src="/img/Paso5.jpg"
            alt="Ejemplo de agregar materia"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">
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
            src="/img/Paso6.jpg"
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
