import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';  // Importación nombrada
import { searchReducer } from './reducers/searchReducer';  // Ajustar la ruta de acuerdo a la ubicación del archivo
// Combina todos los reducers
const rootReducer = combineReducers({
  search: searchReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
