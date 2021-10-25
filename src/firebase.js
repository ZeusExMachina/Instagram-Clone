import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const fire = firebase.initializeApp({
    apiKey: "AIzaSyDiAKc2TYk6JhXKbcjsjIbKNLSfLoSQ1wE",
    authDomain: "insta-clone-6ee45.firebaseapp.com",
    projectId: "insta-clone-6ee45",
    storageBucket: "insta-clone-6ee45.appspot.com",
    messagingSenderId: "26946439829",
    appId: "1:26946439829:web:a88651c2233b66bfada99c"
});

export const FirestoreDB = fire.firestore();
export const FirebaseStorage = fire.storage();
export default {
  fire,
};