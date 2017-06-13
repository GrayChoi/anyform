import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

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
    module.hot.accept('../reducers', () => {
      const nextRootReducers = require('../reducers').default;
      store.replaceReducer(nextRootReducers);
    });
  }
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
}

export default configureStore;