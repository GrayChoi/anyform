import { handleActions } from 'redux-actions';
import * as actionTypes from './actionTypes';

export default handleActions({
  [actionTypes.SAVE_CANDIDATE_FORM_ITEM](state, { payload }) {
    return  { ...state, candidateItem: payload };
  },
  [actionTypes.REMOVE_CANDIDATE_FORM_ITEM](state) {
    return { ...state, candidateItem: {}};
  },
  [actionTypes.SAVE_FORM_ITEM_SUCCESS](state) {
    return {
      ...state,
      formItems: [...state.formItems, state.candidateItem],
      candidateItem: {},
    }
  },
}, {
  candidateItem: {},
  formItems: [],
});
