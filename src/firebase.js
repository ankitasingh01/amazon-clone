import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
//import firebase from 'firebase';
//https://stackoverflow.com/questions/69044315/module-not-found-cant-resolve-firebase-in
//check the above code dont use the old code 
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyBegczBx3lA_mKgOZapQ8jGmKt6FlU7w2U",
    authDomain: "clone-3e4e9.firebaseapp.com",
    projectId: "clone-3e4e9",
    storageBucket: "clone-3e4e9.appspot.com",
    messagingSenderId: "569090640209",
    appId: "1:569090640209:web:72b44de857ac6af2da2b70",
    measurementId: "G-B9CJZME5YJ"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export{ db, auth };