// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {initializeApp} from 'firebase/app'
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPn6J5jk4yVx8fVAqdhBo7--uoDPClPw8",
  authDomain: "discord-61f87.firebaseapp.com",
  projectId: "discord-61f87",
  storageBucket: "discord-61f87.appspot.com",
  messagingSenderId: "253148458599",
  appId: "1:253148458599:web:466f26d1be3fe18cebaec2"
};

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  
export  {auth,provider,db}