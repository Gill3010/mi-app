import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig'; // Asegúrate de tener configurado Firestore en firebaseConfig.js

// Acción para iniciar la búsqueda en Firestore
export const search = (searchTerm) => async (dispatch) => {
  dispatch({ type: 'SEARCH_REQUEST' }); // Inicia la búsqueda

  try {
    // Obtiene todos los documentos de la colección "publicaciones"
    const publicacionesSnapshot = await getDocs(collection(db, 'publicaciones'));
    const pastPublicationsSnapshot = await getDocs(collection(db, 'pastPublications')); // Obtener también de "pastPublications"

    // Filtra los resultados en función del término de búsqueda
    const publicacionesResults = publicacionesSnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter((item) =>
        item.tituloInvestigacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nombreAutor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.apellidoAutor.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const pastPublicationsResults = pastPublicationsSnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter((item) =>
        item.tituloInvestigacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nombreAutor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.apellidoAutor.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Combina ambos conjuntos de resultados
    const results = [...publicacionesResults, ...pastPublicationsResults];

    // Despacha los resultados al reducer
    dispatch({ type: 'SEARCH_SUCCESS', payload: results });
  } catch (error) {
    // Despacha el error si la búsqueda falla
    dispatch({ type: 'SEARCH_FAILURE', payload: error.message });
  }
};
