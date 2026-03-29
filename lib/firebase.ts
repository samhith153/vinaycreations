import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAJZdCRPCgxTMJIrZu-EMdIa4fT1e9lLac",
  authDomain: "thumbnail-portfolio-e4693.firebaseapp.com",
  projectId: "thumbnail-portfolio-e4693",
  storageBucket: "thumbnail-portfolio-e4693.firebasestorage.app",
  messagingSenderId: "1030663114343",
  appId: "1:1030663114343:web:82aa767de965d80f630ec2"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);