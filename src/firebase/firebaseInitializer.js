import * as firebase from 'firebase';
import { firebaseConfig } from '../config';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();
export const timestamp = firebase.database.ServerValue.TIMESTAMP;