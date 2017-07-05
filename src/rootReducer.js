import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as builder } from './builder';
import { reducer as stage } from './stage';

const rootReducer = combineReducers({
  routing,
  builder,
  stage,
});

export default rootReducer;