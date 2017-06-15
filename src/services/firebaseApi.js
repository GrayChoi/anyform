import firebase from 'firebase';
import { firebaseConfig } from '../config';

export function int() {
  firebase.initializeApp(firebaseConfig);
  return new Promise((resolve, reject) => {
    const unsub = firebase.auth().onAuthStateChanged(
      user => {
        unsub();
        resolve(user);
      },
      error => reject(error),
    )
  });
};

export function signInAnonymously() {
  firebase.auth().signInAnonymously();
}

export function push(path, value) {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(path)
      .push(value, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
  });
}

export function set(path, value) {
  return firebase
    .database()
    .ref(path)
    .set(value);
}