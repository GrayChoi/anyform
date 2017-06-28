import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import Root from './containers/Root'
import configureStore from './store/configureStore'
import rootSaga from './sagas'
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { firebaseAuth } from './services/Firebase';

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
store.runSaga(rootSaga)

firebaseAuth.signInAnonymously();

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)

registerServiceWorker();
