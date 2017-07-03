import { fork, all } from 'redux-saga/effects';
import { saga as FormSaga } from './Form';

export default function* root() {
  yield all([
    fork(FormSaga),
  ]);
}