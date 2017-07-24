import { LOCATION_CHANGE } from 'react-router-redux';
import { combineEpics } from 'redux-observable';
import pathToRegexp from 'path-to-regexp';
import { connect } from '../firebase';
import { not, compose } from 'ramda';

const re = pathToRegexp('/build/:formId?');
const isBuildPath = ({ payload: { pathname } }) => {
  if(re.exec(pathname)) {
    return true;
  }
  return false;
}

const getFormId = (path) => {
  const re = pathToRegexp('/build/:formId?');
  const groups = re.exec(path);
  const formId = groups && groups[1];
  return formId;
}

const watchBuildEpics = action$ => 
  action$.ofType(LOCATION_CHANGE)
    .filter(isBuildPath)
    .do(({ payload: { pathname }}) => getFormId(pathname))
    .ignoreElements();

export default combineEpics(
  watchBuildEpics,
);