import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
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
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider()
export const firestore = getFirestore(app)
export const storage = getStorage(app)