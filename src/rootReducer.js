import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as WorkSpaceReducer } from './WorkSpace';
import { reducer as FormReducer } from './Form';

const rootReducer = combineReducers({
  routing,
  form: FormReducer,
  workspace: WorkSpaceReducer,
});

export default rootReducer;