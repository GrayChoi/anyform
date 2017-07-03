import { handleActions } from 'redux-actions';
import * as actionTyps from './actionTypes';

export default handleActions({
  [actionTyps.TOGGLE_LEFT_PANEL](state) {
    return  { ...state, leftPanelOpend: !state.leftPanelOpend };
  },
}, {
  leftPanelOpend: false,
});
