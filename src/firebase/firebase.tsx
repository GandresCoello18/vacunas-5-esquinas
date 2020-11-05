import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyAa0q6uIJUDfEiSiLyI73_2iDslDZZ1Cz4",
  authDomain: "react-redux-c8477.firebaseapp.com",
  databaseURL: "https://react-redux-c8477.firebaseio.com",
  projectId: "react-redux-c8477",
  storageBucket: "react-redux-c8477.appspot.com",
  messagingSenderId: "63762903962",
  appId: "1:63762903962:web:34cd41dcd0411367e7c023",
  measurementId: "G-FN6TGX13DM",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore().collection("favs");

export function updateDB(array: any, uid: any) {
  return db.doc(uid).set({ array });
}

export function loginWithGoogle() {
  let provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((snap: any) => snap.user);
}

export function signOutGoogle() {
  firebase.auth().signOut();
}
