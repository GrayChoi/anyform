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

firebaseAuth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    console.log(isAnonymous, uid);
    render(
      <Root store={store} history={history} />,
      document.getElementById('root')
    )
  } else {
    // User is signed out.
  }
});

registerServiceWorker();
