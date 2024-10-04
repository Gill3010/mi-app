import axios from 'axios';

// Acción para iniciar la búsqueda
export const search = (query) => async (dispatch) => {
  dispatch({ type: 'SEARCH_REQUEST' });  // Inicia la búsqueda

  try {
    // Realiza la llamada a la API
    const response = await axios.get(`/api/search?q=${query}`);
    
    // Despacha los resultados al reducer
    dispatch({ type: 'SEARCH_SUCCESS', payload: response.data });
  } catch (error) {
    // Despacha el error si la búsqueda falla
    dispatch({ type: 'SEARCH_FAILURE', payload: error.message });
  }
};
