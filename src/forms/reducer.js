import { handleActions } from 'redux-actions';
import { reject, lensProp, set, prop, contains } from 'ramda';
import * as actionTypes from './actionTypes';

export default handleActions({
  [actionTypes.LOAD_FORMS_SUCCESS](state, { payload }) {
    return  { ...state, records: { ...payload } };
  },
  [actionTypes.CREATE_FORM_SUCCESS](state, { payload }) {
    return  { ...state, records: { ...state.records, [payload.key]: payload } };
  },
  [actionTypes.UPDATE_FORM_SUCCESS](state, { payload }) {
    const keyLens = lensProp(payload.key);
    const records = set(keyLens, payload, state.records);
    return { ...state, records };
  },
  [actionTypes.REMOVE_FORMS_SUCCESS](state, { payload }) {
    const keys = payload.map(prop('key'));
    const newRecords =
      reject(record => contains(prop('key')(record), keys))(state.records);
    const newSelectedFormKeys = reject(key => contains(key, keys))(state.selectedFormKeys);
    return { ...state, records: newRecords, selectedFormKeys: newSelectedFormKeys };
  },
  // Selected items in form list.
  [actionTypes.SELECT_FORM](state, { payload: { selectedFormKeys } }) {
    return { ...state, selectedFormKeys };
  },
}, {
  records: {},
  selectedFormKeys: [],
});
