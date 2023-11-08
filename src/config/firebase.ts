// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp, 
  getDocs, 
  updateDoc, 
  DocumentData,
  Firestore
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQl68E7o06PNGXeguSnQglwQIsePHlPdY",
  authDomain: "teamproject-2e78c.firebaseapp.com",
  projectId: "teamproject-2e78c",
  storageBucket: "teamproject-2e78c.appspot.com",
  messagingSenderId: "893061623134",
  appId: "1:893061623134:web:99f71b0c8fbad57286b3cf",
  measurementId: "G-RBT63RG77E"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);


