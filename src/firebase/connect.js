import {
  firebaseDb,
  firebaseAuth,
  timestamp,
} from './firebaseInitializer';
import { replace } from 'ramda';

class Connector {
  constructor(ref) {
    this.ref = ref;
  }
  push(data) {
    this.ref.push({
      data,
      createdAt: timestamp,
    });
  }
  set(data) {
    const { key, ...val } = data;
    this.ref.child(key).set({
      data: val,
      updatedAt: timestamp,
    });
  }
  update(data) {
    const { key, ...val } = data;
    this.ref.child(key).update({
      data: val,
      updatedAt: timestamp,
    });
  }
  once(callback) {
    let action;
    this.ref.once('value', (snapshot) => {
      const children = [];
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const childData = childSnapshot.val();
        children.push({ key, ...childData });
      });
      action = callback(children);
    });
    return action;
  }
  onChildAdded(callback) {
    this.ref.on('child_added', data => callback({ key: data.key, ...data.val()}));
  }
  onChildChanged(callback) {
    this.ref.on('child_changed', data => callback({ key: data.key, ...data.val()}));
  }
  onChildRemoved(callback) {
    this.ref.on('child_removed', data => callback({ key: data.key, ...data.val()}));
  }
  off() {
    this.ref.off();
  }
}

let uid;
firebaseAuth.onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
  }
})

const connect = ({ path }) => {
  // replace placehold user id to current user id
  const _path = replace(/\/uid\//, uid, path);
  const ref = firebaseDb.ref(_path);
  return new Connector(ref);
}

export default connect;