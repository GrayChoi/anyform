import { fork, all, takeEvery, select } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';

import { firebaseDb, firebaseAuth } from '../services/Firebase';

function* saveFormItem() {
  const candidateItem = yield select(state => state.form.candidateItem);
  console.log('ddd')
  const uid = firebaseAuth.currentUser.uid;
  const ref= firebaseDb.ref(`/users/${uid}/form_items`).push();
  ref.set({
    ...candidateItem,
  });
}

// watcher
function* watchSaveFormItem() {
  yield takeEvery(actionTypes.SAVE_FORM_ITEM, saveFormItem);
}

export default function* () {
  yield all([
    fork(watchSaveFormItem),
  ]);
}