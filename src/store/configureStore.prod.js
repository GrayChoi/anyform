import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from '../rootReducer';
import rootEpic from '../rootEpic';

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      routerMiddleware(browserHistory),
      createEpicMiddleware(rootEpic),
    ),
  );

  return store;
}

export default configureStore;