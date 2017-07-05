// import { LOCATION_CHANGE } from 'react-router-redux';
// import { combineEpics } from 'redux-observable';

// import { connect } from '../firebase';
// import * as actionTypes from './actionTypes';
// import {
//   loadForms,
//   loadFormSuccess,
//   createFormSuccess,
//   updateForm,
//   deleteForm,
// } from './actions';

// const path = '/forms/uid';
// let connector = null;
// const isListenTo = ({ payload: {pathname}}) => {
//   if (pathname === '/forms') {
//     return true;
//   }
//   if (connector !== null) {
//     connector.off();
//     connector = null;
//   }
//   return false;
// }
  
// export const listenEpic = action$ => 
//   action$.ofType(LOCATION_CHANGE)
//     .filter(isListenTo)
//     .takeUntil()
//     .map(() => {
//       connector = connect({ path });
//       return loadForms();
//     });

// export const createFormEpic = action$ =>
//   action$.ofType(actionTypes.CREATE_FORM)
//   .mapTo(({ payload }) => {
//     connector.push(payload);
//     return { type: actionTypes.DELETE_FORM };
//   });

// export const loadFormsEpic = (action$, { dispatch }) =>
//   action$.ofType(actionTypes.LOAD_FORMS)
//     .mapTo(() => {
//       connector.onChildAdded(data => dispatch(createFormSuccess(data)));
//       const action = connector.once(loadFormSuccess);
//       return { type: actionTypes.DELETE_FORM };
//     });

// export default combineEpics(
//   listenEpic,
//   createFormEpic,
//   loadFormsEpic,
// );