import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import FormReducer from './Form';

const rootReducer = combineReducers({
  routing,
  form: FormReducer,
});

export default rootReducer;