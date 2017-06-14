import { handleActions } from 'redux-actions';
import * as actionTyps from '../constants/actionTypes';

const formReudcer = handleActions({
  [actionTyps.SAVE_CANDIDATE_FORM_ITEM](state, { payload }) {
    return  { ...state, candidateItem: payload };
  },
  [actionTyps.REMOVE_CANDIDATE_FORM_ITEM](state) {
    return { ...state, candidateItem: {}};
  },
  [actionTyps.SAVE_FORM_ITEM](state) {
    return {
      ...state,
      formItems: [...state.formItems, state.candidateItem],
      candidateItem: {},
    }
  },
}, {
  candidateItem: {},
  formItems: [],
})

export default formReudcer;