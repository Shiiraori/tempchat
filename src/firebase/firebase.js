import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCVCj99VPWOvY2-zN6rEztozjq2keduNlo",
    authDomain: "tempchat-74364.firebaseapp.com",
    projectId: "tempchat-74364",
    storageBucket: "tempchat-74364.appspot.com",
    messagingSenderId: "720570590886",
    appId: "1:720570590886:web:856b10c5921f1357913667"
  };
  
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();