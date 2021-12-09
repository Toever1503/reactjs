// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAT1Y57owZGMLzwO84zuG8gZs9iniQdi9M",
  authDomain: "reactjs-a37cf.firebaseapp.com",
  projectId: "reactjs-a37cf",
  storageBucket: "reactjs-a37cf.appspot.com",
  messagingSenderId: "369110282575",
  appId: "1:369110282575:web:0fbb2ebbab860b4f80553a",
  measurementId: "G-TH8GZYMV8P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const googleAuth = getAuth();
const storage = getStorage();
export const storageRef = ref(storage, 'product');