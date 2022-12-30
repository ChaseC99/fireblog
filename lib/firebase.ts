import firebase from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTp9GWgih2WGHt6-Fdn6jFRstfeEErsPo",
  authDomain: "fireblog-99.firebaseapp.com",
  projectId: "fireblog-99",
  storageBucket: "fireblog-99.appspot.com",
  messagingSenderId: "900953574105",
  appId: "1:900953574105:web:06a7777f5bb31055ad8cc8"
};


// Initialize Firebase
var app;
if (!firebase.getApps().length) {
    app = firebase.initializeApp(firebaseConfig)
}

export const auth = getAuth(app)
export const firestore = getFirestore(app)
export const storage = getStorage(app)