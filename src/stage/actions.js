import * as types from './actionTypes';

export const saveCandidateFormItem = payload => ({
  type: types.SAVE_CANDIDATE_FORM_ITEM,
  payload,
});

export const removeCandidateFormItem = payload => ({
  type: types.REMOVE_CANDIDATE_FORM_ITEM,
  payload,
});

export const saveFormItem = payload => ({
  type: types.SAVE_FORM_ITEM,
  payload,
});

export const saveFormItemSuccess = payload => ({
  type: types.SAVE_FORM_ITEM_SUCCESS,
  payload,
});

export const updateFormItemSuccess = payload => ({
  type: types.UPDATE_FORM_ITEM_SUCCESS,
  payload,
});

export const loadFormItemsSuccess = payload => ({
  type: types.LOAD_FORM_ITEMS_SUCCESS,
  payload,
});

export const selectFormItem = formItem => ({
  type: types.SELECT_FORM_ITEM,
  payload: {
    key: formItem.key,
  },
});

export const removeFormItem = ({ formItem }) => ({
  type: types.REMOVE_FORM_ITEM,
  payload: {
    key: formItem.key,
  },
});

export const removeFormItemSuccess = formItem => ({
  type: types.REMOVE_FORM_ITEM_SUCCESS,
  payload: formItem,
});