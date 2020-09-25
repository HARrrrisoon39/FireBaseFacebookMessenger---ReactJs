import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  // use your config here
});


const db = firebaseApp.firestore();
export default db;
