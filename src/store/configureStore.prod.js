import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../rootReducer'

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware()
  );
  return store
}

export default configureStore;