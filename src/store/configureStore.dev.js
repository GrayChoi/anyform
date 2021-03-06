import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../rootReducer';
import rootEpic from '../rootEpic';

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(browserHistory),
        createEpicMiddleware(rootEpic),
        createLogger(),
      ),
    ),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../rootReducer', () => {
      const nextRootReducers = require('../rootReducer').default;
      store.replaceReducer(nextRootReducers);
    });
  }
  return store;
}

export default configureStore;