import {
  firebaseDb,
  firebaseAuth,
  timestamp,
} from './firebaseInitializer';
import { Observable } from 'rxjs/Observable';
import pathToRegexp from 'path-to-regexp';

const connectorPool = {};

class Connector extends Observable {
  constructor(path, listeners) {
    super();
    this.path = path;
    const {
      loadSuccess,
      createSuccess,
      updateSuccess,
      removeSuccess,
    }= listeners;
    const uid = firebaseAuth.currentUser.uid;
    const re = pathToRegexp('/:root/:uid?/:category?');
    const root = re.exec(path)[1];
    this.ref = firebaseDb.ref(`${root}/${uid}`);
    const value$ =
      Observable.fromPromise(this.ref.once('value'))
        .map(snapshot => loadSuccess(snapshot.val()))
        .catch(err => ({ type: `${root}/loadFailed` }));
    const childAdded$ =
      Observable.fromEvent(this.ref.orderByChild('createdAt').startAt(Date.now()), 'child_added')
        // Because using once to load initial data, skip the first push from child_added
        .map(snapshot => createSuccess({
          key: snapshot.key,
          ...snapshot.val(),
        }))
    const childChanged$ =
      Observable.fromEvent(this.ref, 'child_changed')
        .map(snapshot => updateSuccess({
          key: snapshot.key,
          ...snapshot.val(),
        }))
    const childRemoved$ =
      Observable.fromEvent(this.ref, 'child_removed')
        .map(snapshot => removeSuccess({
          key: snapshot.key,
          ...snapshot.val(),
        }))
    this.source = Observable.from([
      value$.concat(childAdded$),
      childChanged$,
      childRemoved$,
    ]).mergeAll();
  }

  push = (data) => {
    const newData = {
      updatedAt: timestamp,
      createdAt: timestamp,
      ...data,
    };
    this.ref.push(newData);
  }

  unsubscribe = () => {
    this.ref.off();
    delete connectorPool[this._path];
  }
}

const connect = ({
  path,
  listeners,
}) => {
  if (connectorPool[path]) {
    return connectorPool[path];
  }
  const connector = new Connector(path, listeners);
  connectorPool[path] = connector;
  return connector;
}

export default connect;