
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sagesaga.firebaseapp.com",
  projectId: "sagesaga",
  storageBucket: "sagesaga.appspot.com",
  messagingSenderId: "716628515263",
  appId: "1:716628515263:web:2e143413acc373274d690a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);