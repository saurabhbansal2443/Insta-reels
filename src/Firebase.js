import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyC7qZMUPCBCQkl9O2mOtSEQ6F_MCz1gcQQ",
  authDomain: "fir-demo-d2559.firebaseapp.com",
  projectId: "fir-demo-d2559",
  storageBucket: "fir-demo-d2559.appspot.com",
  messagingSenderId: "990661921227",
  appId: "1:990661921227:web:aaf87886467e3e12218e4e",
  measurementId: "G-WNGY20ZHS3"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export let auth=getAuth(app);

export let db=getFirestore(app);

export const storage = getStorage(app);