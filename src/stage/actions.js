import {
  SAVE_CANDIDATE_FORM_ITEM,
  REMOVE_CANDIDATE_FORM_ITEM,
  SAVE_FORM_ITEM,
  SAVE_FORM_ITEM_SUCCESS,
  UPDATE_FORM_ITEM_SUCCESS,
  LOAD_FORM_ITEMS_SUCCESS,
} from './actionTypes';

export const saveCandidateFormItem = payload => ({
  type: SAVE_CANDIDATE_FORM_ITEM,
  payload,
});

export const removeCandidateFormItem = payload => ({
  type: REMOVE_CANDIDATE_FORM_ITEM,
  payload,
});

export const saveFormItem = payload => ({
  type: SAVE_FORM_ITEM,
  payload,
});

export const saveFormItemSuccess = payload => ({
  type: SAVE_FORM_ITEM_SUCCESS,
  payload,
});

export const updateFormItemSuccess = payload => ({
  type: UPDATE_FORM_ITEM_SUCCESS,
  payload,
});

export const loadFormItemsSuccess = payload => ({
  type: LOAD_FORM_ITEMS_SUCCESS,
  payload,
});