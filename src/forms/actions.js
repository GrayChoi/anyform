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
  type: actionTypes.UPDATE_FORM,
  payload,
});

export const updateFormSuccess = payload => ({
  type: actionTypes.UPDATE_FORM_SUCCESS,
  payload,
});

export const removeForms = payload => ({
  type: actionTypes.REMOVE_FORMS,
  payload,
});

export const removeFormsSuccess = selectedFormKeys => ({
  type: actionTypes.REMOVE_FORMS_SUCCESS,
  payload: selectedFormKeys,
});

export const selectForm = selectedFormKeys => ({
  type: actionTypes.SELECT_FORM,
  payload: {
    selectedFormKeys,
  },
});
