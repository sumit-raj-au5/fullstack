// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-KWfknJdsf5JUto0L98kx06wOMdfGbAE",
  authDomain: "stackoverflowclone-45276.firebaseapp.com",
  projectId: "stackoverflowclone-45276",
  storageBucket: "stackoverflowclone-45276.appspot.com",
  messagingSenderId: "934323439831",
  appId: "1:934323439831:web:f6afee87130fc1e0df4892",
  measurementId: "G-4DTEQLFCNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

