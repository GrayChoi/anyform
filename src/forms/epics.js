import { LOCATION_CHANGE } from 'react-router-redux';
import { combineEpics } from 'redux-observable';
import pathToRegexp from 'path-to-regexp';
import { not, compose } from 'ramda';
import { connect } from '../firebase';
import * as api from './api';
import * as actionTypes from './actionTypes';
import {
  loadFormSuccess,
  createFormSuccess,
  updateFormSuccess,
  removeFormsSuccess,
} from './actions';

const path = '/forms';
const re = pathToRegexp('/forms/:category?');
const listeners = {
  loadSuccess: loadFormSuccess,
  createSuccess: createFormSuccess,
  updateSuccess: updateFormSuccess,
  removeSuccess: removeFormsSuccess,
};
const isFormsPath = ({ payload: { pathname } }) => {
  if(re.exec(pathname)) {
    return true;
  }
  return false;
}

const watchFormsEpic = action$ => 
  action$.ofType(LOCATION_CHANGE)
    .filter(isFormsPath)
    .mergeMap(
      () =>
        connect({ path, listeners })
          .takeUntil(action$.ofType(LOCATION_CHANGE).filter(compose(not, isFormsPath)))
    );

const createFormEpic = action$ =>
  action$.ofType(actionTypes.CREATE_FORM)
    .map(({ payload: { form } }) => api.createForm(form))
    .ignoreElements();

const updateFormEpic = action$ =>
  action$.ofType(actionTypes.UPDATE_FORM)
    .map(({ payload: { form} }) => api.updateForm(form))
    .ignoreElements();

const removeFormsEpic = action$ =>
  action$.ofType(actionTypes.REMOVE_FORMS)
    .map(({ payload: { formIds } }) => api.deleteForms(formIds))
    .ignoreElements();

export default combineEpics(
  watchFormsEpic,
  createFormEpic,
  updateFormEpic,
  removeFormsEpic,
);