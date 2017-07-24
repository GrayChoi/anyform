import { epics as formsEpics } from './forms';
import { epics as stageEpics } from './stage';
import { combineEpics } from 'redux-observable';

export default combineEpics(
  formsEpics,
  stageEpics,
);