//  Firebase configuration with project's configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  get,
  set,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyCvSaKQo98k6DSzrG01bLjkOeYoeq4E7DY",
  authDomain: "water-level-indicator-14606.firebaseapp.com",
  projectId: "water-level-indicator-14606",
  databaseURL:
    "https://water-level-indicator-14606-default-rtdb.firebaseio.com/",
  storageBucket: "water-level-indicator-14606.appspot.com",

  messagingSenderId: "56987502786",
  appId: "1:56987502786:web:fdf8ea92b2f14bdec1935b",
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// const provider = new GoogleAuthProvider();
const connectDB = getDatabase();
export {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
};
export { connectDB, ref, get, set, child, update, remove };
