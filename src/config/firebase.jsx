import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBmN93uBlgrH7LEfal07ItvnYwTxbkjaPQ",
  authDomain: "crowdfunding-d11f6.firebaseapp.com",
  projectId: "crowdfunding-d11f6",
  storageBucket: "crowdfunding-d11f6.appspot.com", // Fixed the storage bucket URL
  messagingSenderId: "435275908996",
  appId: "1:435275908996:web:277d215cf4b486194effd1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

