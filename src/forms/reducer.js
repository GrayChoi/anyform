import { handleActions } from 'redux-actions';
import { reject, lensProp, set, prop, contains } from 'ramda';
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
  [actionTyps.REMOVE_FORMS_SUCCESS](state, { payload }) {
    const keys = payload.map(prop('key'));
    const newRecords =
      reject(record => contains(prop('key')(record), keys))(state.records);
    return { ...state, records: newRecords };
  },
  // Selected items in form list.
  [actionTyps.SELECT_FORM](state, { payload: { selectedFormKeys } }) {
    return { ...state, selectedFormKeys };
  },
}, {
  records: {},
  selectedFormKeys: [],
});
