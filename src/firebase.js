// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {initializeApp} from 'firebase/app'
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDCYmXjYOzPMtKyyHgY7JJQnx-9385QQDM",
    authDomain: "discord-12ecc.firebaseapp.com",
    projectId: "discord-12ecc",
    storageBucket: "discord-12ecc.appspot.com",
    messagingSenderId: "758529995508",
    appId: "1:758529995508:web:fa3c5a9100d721fca8e4a1",
    measurementId: "G-VMRVGG2P0S"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  
export  {auth,provider,db}