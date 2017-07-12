import { handleActions } from 'redux-actions';
import { reject, lensProp, set } from 'ramda';
import * as actionTyps from './actionTypes';

export default handleActions({
  [actionTyps.LOAD_FORMS_SUCCESS](state, { payload }) {
    return  { ...state, records: { ...payload } };
  },
  [actionTyps.CREATE_FORM_SUCCESS](state, { payload }) {
    return  { ...state, records: { ...state.records, [payload.key]: payload } };
  },
  [actionTyps.UPDATE_FORM_SUCCESS](state, { payload }) {
    const keyLens = lensProp(payload.key);
    const records = set(keyLens, payload, state.records);
    return { ...state, records };
  },
  [actionTyps.REMOVE_FORM_SUCCESS](state, { payload }) {
    const records = reject(form => form.key === payload.key, state.records);
    return { ...state, records };
  },
}, {
  records: {},
});
