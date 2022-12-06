import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD_iSXyvVH0QQyzR87mjuf1Jxwkx0nP2rM",
    authDomain: "sistema-bd49a.firebaseapp.com",
    projectId: "sistema-bd49a",
    storageBucket: "sistema-bd49a.appspot.com",
    messagingSenderId: "486565294497",
    appId: "1:486565294497:web:5408d9792fd58da3439be0",
    measurementId: "G-85RLGB8LQ8"
  };


  if(firebase.app.length){
  firebase.initializeApp(firebaseConfig);
  }

  export default firebase;