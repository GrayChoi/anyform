import {
  firebaseDb,
  firebaseAuth,
  timestamp,
} from './firebaseInitializer';
import { Observable } from 'rxjs/Observable';
import pathToRegexp from 'path-to-regexp';

class Connector extends Observable {
  constructor(path) {
    super();
    const uid = firebaseAuth.currentUser.uid;
    const re = pathToRegexp('/:root/:uid?/:category?');
    const root = re.exec(path)[1];
    this.ref = firebaseDb.ref(`${root}/${uid}`);
    const value$ =
      Observable.fromPromise(this.ref.once('value'))
        .map(snapshot => ({ type: `${root}/loadSuccess`, payload: snapshot.val() }))
        .catch(err => ({ type: `${root}/loadFailed` }));
    const childAdded$ =
      Observable.fromEvent(this.ref, 'child_added')
        .skip(1)
        .map(snapshot => ({ type: `${root}/childAdded`, payload: snapshot.val() }))
    const childChanged$ =
      Observable.fromEvent(this.ref, 'child_changed')
        .map(snapshot => ({ type: `${root}/childChanged`, payload: snapshot.val() }))
    const childRemoved$ =
      Observable.fromEvent(this.ref, 'child_removed')
        .map(snapshot => ({ type: `${root}/childRemoved`, payload: snapshot.val() }))
    this.source = Observable.from([
      value$,
      childAdded$,
      childChanged$,
      childRemoved$,
    ]).mergeAll();
  }
}

const connect = ({ path }) => {
  return new Connector(path);
}

export default connect;