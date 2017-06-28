import { fork, all } from 'redux-saga/effects';
import main from './main';

export default function* root() {
  yield all([
    fork(main),
  ]);
}