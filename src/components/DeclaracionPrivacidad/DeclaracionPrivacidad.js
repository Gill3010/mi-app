import React from 'react';
import styles from './DeclaracionPrivacidad.module.css';

const DeclaracionPrivacidad = () => {
  return (
    <div className={styles.privacidadContainer}>
      <div className={styles.canvas}>
        <h2>Declaración de Privacidad</h2>
        <p>
          En el Portal de Carteles Científicos, respetamos la privacidad de nuestros usuarios y estamos comprometidos a proteger su información personal. Esta declaración de privacidad describe cómo recopilamos, usamos y protegemos los datos proporcionados por nuestros usuarios.
        </p>
        <p>
          Todos los datos personales que se recojan a través de nuestra plataforma serán utilizados exclusivamente para los fines especificados y no serán compartidos con terceros sin el consentimiento explícito del usuario.
        </p>
        <p>
          Nos comprometemos a cumplir con todas las leyes y regulaciones aplicables en materia de protección de datos personales, garantizando que la información de nuestros usuarios esté segura y protegida.
        </p>
        <p>
          Invitamos a todos los usuarios a leer nuestra política completa de privacidad para entender mejor cómo manejamos sus datos y para ejercer sus derechos de acceso, rectificación y cancelación.
        </p>
      </div>
    </div>
  );
};

export default DeclaracionPrivacidad;
