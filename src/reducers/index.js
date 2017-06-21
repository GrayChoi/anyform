import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import FormReducer from './Form';
import AppReducer from './App';

const rootReducer = combineReducers({
  routing,
  form: FormReducer,
  app: AppReducer,
});

export default rootReducer;