import { epics as formsEpics } from './forms';
import { combineEpics } from 'redux-observable';

export default combineEpics(
  formsEpics.listenEpic,
);