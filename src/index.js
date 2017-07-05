import React from 'react'
import 'rxjs';
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import Root from './Root'
import configureStore from './store/configureStore'
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { firebaseAuth } from './firebase';

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

firebaseAuth.signInAnonymously();

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)

registerServiceWorker();
