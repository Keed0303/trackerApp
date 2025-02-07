// Import the functions you need from the SDKs you need
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBU-kqGAqoV3Ox85DAQfKTBCHqESjuBM1w",
  authDomain: "trackerapp-a2749.firebaseapp.com",
  projectId: "trackerapp-a2749",
  storageBucket: "trackerapp-a2749.firebasestorage.app",
  messagingSenderId: "1031656291054",
  appId: "1:1031656291054:web:b909598635ed31404b51ff",
  measurementId: "G-HMT6WKD4KL"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
