// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {initializeApp} from 'firebase/app'
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0xsR9VpgT4JldHfar172ROx4mhg_Z-fQ",
  authDomain: "discord-4bb56.firebaseapp.com",
  projectId: "discord-4bb56",
  storageBucket: "discord-4bb56.appspot.com",
  messagingSenderId: "248047846427",
  appId: "1:248047846427:web:f0338dbcd70a95bb78a4be"
};
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  
export  {auth,provider,db}