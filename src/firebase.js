import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAaY5itkNbcrvHMTLTAS06J0DXd6NS_6jQ",
  authDomain: "fir-practice-aefac.firebaseapp.com",
  projectId: "fir-practice-aefac",
  storageBucket: "fir-practice-aefac.appspot.com",
  messagingSenderId: "679782040061",
  appId: "1:679782040061:web:9021e1fc28e95c959dd994",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
