// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDimiqP-hfujt4wHAoo6HTnM7ukTNx2EUo",
  authDomain: "netflex-15e3e.firebaseapp.com",
  projectId: "netflex-15e3e",
  storageBucket: "netflex-15e3e.appspot.com",
  messagingSenderId: "495667913959",
  appId: "1:495667913959:web:27c5cc4ca2037168b1ee42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db =getFirestore(app)