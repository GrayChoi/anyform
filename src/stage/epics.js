import { LOCATION_CHANGE } from 'react-router-redux';
import { combineEpics } from 'redux-observable';
import pathToRegexp from 'path-to-regexp';
import { not, compose } from 'ramda';
import * as api from './api';
import { connect } from '../firebase';
import * as actions from './actions';
import * as actionTypes from './actionTypes';

const path = formId => `/formItems/${formId}`;
const re = pathToRegexp('/build/:formId?');
const listeners = {
  loadSuccess: actions.loadFormItemsSuccess,
  createSuccess: actions.saveFormItemSuccess,
  updateSuccess: actions.updateFormItemSuccess,
  removeSuccess: actions.removeFormItemSuccess,
};
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

const watchStageEpic = action$ => 
  action$.ofType(LOCATION_CHANGE)
    .filter(isBuildPath)
    .map(({ payload: { pathname }}) => getFormId(pathname))
    .mergeMap(formId => 
      connect({
        path: path(formId),
        listeners,
      }).takeUntil(action$.ofType(LOCATION_CHANGE).filter(compose(not, isBuildPath)))
    );

const createFormItemEpic = (action$, store) => 
  action$.ofType(actionTypes.SAVE_FORM_ITEM)
    .do(({ payload: { formItem } }) => {
      const { routing } = store.getState();
      const { pathname } = routing.locationBeforeTransitions;
      const formId = getFormId(pathname);
      api.addFormItem({ formId, formItem })
    })
    .ignoreElements();

const removeFormItemEpic = (action$, store) => 
  action$.ofType(actionTypes.REMOVE_FORM_ITEM)
    .do(({ payload: { key } }) => {
      const { routing } = store.getState();
      const { pathname } = routing.locationBeforeTransitions;
      const formId = getFormId(pathname);
      api.deleteFormITem({ formId, formItemId: key })
    })
    .ignoreElements();

export default combineEpics(
  watchStageEpic,
  createFormItemEpic,
  removeFormItemEpic,
);