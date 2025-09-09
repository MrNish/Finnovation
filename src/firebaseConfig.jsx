import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKwuZgS0YPc73CQ9HP5wuZ1BfVOI3SHf0",
  authDomain: "developertask-8d400.firebaseapp.com",
  projectId: "developertask-8d400",
  storageBucket: "developertask-8d400.firebasestorage.app",
  messagingSenderId: "419933689232",
  appId: "1:419933689232:web:2be2160b72180816690f15",
  measurementId: "G-6NWF658K2J"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };