import { LOCATION_CHANGE } from 'react-router-redux';

const myformsFilter = ({ payload: {pathname}}) =>
  pathname === '/forms/myforms'
export const listenEpic = action$ => 
  action$.ofType(LOCATION_CHANGE)
    .filter(myformsFilter)
    .do(() => console.log('test ok'))
    .ignoreElements();