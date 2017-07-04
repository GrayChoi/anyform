import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as builderReducer } from './builder';
import { reducer as stageReducer } from './stage';

const rootReducer = combineReducers({
  routing,
  builder: builderReducer,
  stage: stageReducer,
});

export default rootReducer;