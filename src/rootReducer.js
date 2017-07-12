import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as builder } from './builder';
import { reducer as stage } from './stage';
import { reducer as forms } from './forms';

const rootReducer = combineReducers({
  routing,
  builder,
  stage,
  forms,
});

export default rootReducer;