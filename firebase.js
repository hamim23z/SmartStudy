// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_GOOGLE_API_KEY,
  authDomain: "flashcardsaas-350bd.firebaseapp.com",
  projectId: "flashcardsaas-350bd",
  storageBucket: "flashcardsaas-350bd.appspot.com",
  messagingSenderId: "940526685849",
  appId: "1:940526685849:web:0fff5da50f050d93e37208",
  measurementId: "G-HFGP3TQ2S4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}