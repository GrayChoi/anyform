import { handleActions } from 'redux-actions';
import * as actionTyps from './actionTypes';

export default handleActions({
  [actionTyps.SELECT_MENU_ITEM](state) {
    return  { ...state, leftPanelOpend: !state.leftPanelOpend };
  },
}, {
  leftPanelOpend: false,
});
