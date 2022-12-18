// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCE4ODK45Em6T1oYbwbsyDlyk9Vx7MKw_I",
  authDomain: "examino-322bf.firebaseapp.com",
  projectId: "examino-322bf",
  storageBucket: "examino-322bf.appspot.com",
  messagingSenderId: "514318142621",
  appId: "1:514318142621:web:6455e9d29ea3fdff0b1874",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
