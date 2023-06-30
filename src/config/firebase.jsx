import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1moIQo0bqT8ZvT8Y4J0rzfvm7knsIsQA",
  authDomain: "projeto-tcc-1cad4.firebaseapp.com",
  projectId: "projeto-tcc-1cad4",
  storageBucket: "projeto-tcc-1cad4.appspot.com",
  messagingSenderId: "928976220383",
  appId: "1:928976220383:web:172cf14bb58334e9b1f96a",
  measurementId: "G-E1YZH53ZJK",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
