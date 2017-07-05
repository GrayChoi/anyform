import * as actionTypes from './actionTypes';

export const loadForms = () => ({
  type: actionTypes.LOAD_FORMS,
});

export const loadFormSuccess = payload => ({
  type: actionTypes.LOAD_FORMS_SUCCESS,
  payload,
});

export const createForm = payload => ({
  type: actionTypes.CREATE_FORM,
  payload,
});

export const createFormSuccess = payload => ({
  type: actionTypes.CREATE_FORM_SUCCESS,
  payload,
});

export const updateForm = payload => ({
  type: actionTypes.CREATE_FORM,
  payload,
});

export const deleteForm = payload => ({
  type: actionTypes.CREATE_FORM,
  payload,
});