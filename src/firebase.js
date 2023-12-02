// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIvc9NKDhEr_B5MuIVCT0GCrew6AYTpKE",
  authDomain: "aloosli-88777.firebaseapp.com",
  projectId: "aloosli-88777",
  storageBucket: "aloosli-88777.appspot.com",
  messagingSenderId: "999327732075",
  appId: "1:999327732075:web:5ff70c9bd004c51176fc2e",
  measurementId: "G-F48KLC9MQD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);