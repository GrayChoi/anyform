import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import Root from './containers/Root'
import configureStore from './store/configureStore'
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import * as firebaseApi from './services/firebaseApi';

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

firebaseApi.int();
firebaseApi.signInAnonymously();

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)

registerServiceWorker();
