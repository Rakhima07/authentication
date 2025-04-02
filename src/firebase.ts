// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAN__8HUR4tUT6Gk8MOvLL-W9GIUvV3wtU",
//   authDomain: "authentication-61117.firebaseapp.com",
//   projectId: "authentication-61117",
//   storageBucket: "authentication-61117.firebasestorage.app",
//   messagingSenderId: "541467263501",
//   appId: "1:541467263501:web:32cdf1efc4887ff96c4b44",
//   measurementId: "G-1P2SPMYSWX"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

export async function emailSignIn(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function emailSignUp(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function userSignOut() {
  return await signOut(auth);
}
