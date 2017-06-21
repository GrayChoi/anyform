import { handleActions } from 'redux-actions';
import * as actionTyps from '../constants/actionTypes';

const appReducer = handleActions({
  [actionTyps.TOGGLE_LEFT_PANEL](state) {
    return  { ...state, leftPanelOpend: !state.leftPanelOpend };
  },
}, {
  leftPanelOpend: false,
})

export default appReducer;