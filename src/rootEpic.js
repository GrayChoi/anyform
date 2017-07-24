import { epics as formsEpics } from './forms';
import { epics as builderEpics } from './builder';
import { combineEpics } from 'redux-observable';

export default combineEpics(
  formsEpics,
  builderEpics,
);