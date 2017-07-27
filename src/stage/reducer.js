import { handleActions } from 'redux-actions';
import * as actionTypes from './actionTypes';

export default handleActions({
  [actionTypes.LOAD_FORM_ITEMS_SUCCESS](state, { payload }) {
    return { ...state, formItems: Object.values(payload || {}) };
  },
  [actionTypes.SAVE_CANDIDATE_FORM_ITEM](state, { payload }) {
    return  { ...state, candidateItem: payload };
  },
  [actionTypes.REMOVE_CANDIDATE_FORM_ITEM](state) {
    return { ...state, candidateItem: {}};
  },
  [actionTypes.SAVE_FORM_ITEM_SUCCESS](state, { payload }) {
    return {
      ...state,
      formItems: [...state.formItems, payload],
      candidateItem: {},
    }
  },
  [actionTypes.UPDATE_FORM_ITEM_SUCCESS](state, { payload }) {
    const { formItems } = state;
    const newformItems = formItems.map(item => {
      if (item.key === payload.key) return payload;
      return item;
    });
    return {
      ...state,
      formItems: newformItems,
    }
  },
  [actionTypes.REMOVE_FORMS_SUCCESS](state, { payload }) {
    return state;
  },
}, {
  candidateItem: {},
  formItems: [],
});
