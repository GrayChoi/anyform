import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from '../rootReducer';
import DevTools from './DevTools';

const configureStore = (preloadedState) => {
  const sagaMiddleware = createSagaMiddleware();
  
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(
        sagaMiddleware,
        createLogger(),
      ),
      DevTools.instrument()
    ),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../rootReducer', () => {
      const nextRootReducers = require('../rootReducer').default;
      store.replaceReducer(nextRootReducers);
    });
  }
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
}

export default configureStore;