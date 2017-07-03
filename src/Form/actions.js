import {
  SAVE_CANDIDATE_FORM_ITEM,
  REMOVE_CANDIDATE_FORM_ITEM,
  SAVE_FORM_ITEM,
  SAVE_FORM_ITEM_SUCCESS,
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