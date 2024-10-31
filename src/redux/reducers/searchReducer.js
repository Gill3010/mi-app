// Estado inicial del reducer
const initialState = {
  results: [],   // Almacenará los resultados de búsqueda
  loading: false, // Indicador de estado de carga
  error: null,    // Almacena errores si la búsqueda falla
};

// Reducer para gestionar el estado de búsqueda
export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_REQUEST':
      return { ...state, loading: true, error: null }; // Inicia la búsqueda y restablece cualquier error previo

    case 'SEARCH_SUCCESS':
      return { ...state, loading: false, results: action.payload }; // Almacena resultados y termina la carga

    case 'SEARCH_FAILURE':
      return { ...state, loading: false, error: action.payload }; // Termina la carga y almacena el error

    default:
      return state; // Devuelve el estado actual si la acción no coincide
  }
};
