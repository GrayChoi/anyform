import {
  firebaseDb,
  firebaseAuth,
  timestamp,
} from './firebaseInitializer';
import { Observable } from 'rxjs/Observable';
import pathToRegexp from 'path-to-regexp';
import { compose, not, isEmpty, sortBy, path as rpath } from 'ramda';

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
    this.ref = firebaseDb.ref(`/users/${uid}/${path}`);
    const value$ =
      Observable.fromPromise(this.ref.once('value'))
        .map(snapshot => loadSuccess(snapshot.val()))
        .catch(err => ({ type: `${root}/loadFailed` }));
    const childAdded$ =
      Observable.fromEvent(this.ref.orderByChild('createdAt').startAt(Date.now()), 'child_added')
        // Because using once to load initial data, skip the first push from child_added
        .map(snapshot => ({ type: 'child_added' , value: snapshot.val() }))
  
    const childChanged$ =
      Observable.fromEvent(this.ref, 'child_changed')
        .map(snapshot => ({ type: 'child_changed' , value: snapshot.val() }));

    const childAddedOrChanged$ =
      Observable.from([childAdded$, childChanged$])
        .mergeAll()
        .bufferTime(1000, 1000)
        .filter(compose(not, isEmpty))
        .map(sortBy(rpath(['value', 'updatedAt'])))
        .mergeMap(events => {
          const results = events.reduce((result, event) => {
            const key = rpath(['value', 'key'])(event);
            if (!result[key]) {
              result[key] = event;
            } else {
              result[key].value = event.value;
            }
            return result;
          }, {});
          return Observable.from(Object.values(results));
        })
        .map(val => {
          if (val.type === 'child_added') return createSuccess(val.value);
          return updateSuccess(val.value);
        });

    const childRemoved$ =
      Observable.fromEvent(this.ref, 'child_removed')
        .map(snapshot => snapshot.val())
        .bufferTime(500, 500)
        .filter(compose(not, isEmpty))
        .map(vals => removeSuccess(vals));
    
    this.source = Observable.from([
      value$.concat(childAddedOrChanged$),
      childRemoved$,
    ]).mergeAll();
  }

  push = (data) => {
    const key = this.ref.push().key;
    const newData = {
      ...data,
      key,
      updatedAt: timestamp,
      createdAt: timestamp,
    };
    this.ref.child(key).set(newData);
  }

  update = (data) => {
    const key = data.key;
    const newData = {
      ...data,
       updatedAt: timestamp,
    };
    this.ref.child(key).update(newData);
  }

  removeAll = (keys) => {
    const updates = keys.reduce((updates, key) => {
      updates[key] = null;
      return updates;
    }, {});
    this.ref.update(updates);
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