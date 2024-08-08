//import { getAnalytics } from 'firebase/analytics';
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyAL3KDabF-79AOjQaigqnh1rBi76Y14bCY',
  authDomain: 'myjobapp-e1c81.firebaseapp.com',
  projectId: 'myjobapp-e1c81',
  storageBucket: 'myjobapp-e1c81.appspot.com',
  messagingSenderId: '923544251824',
  appId: '1:923544251824:web:7efd3e216cbb13d5ac3a75',
  measurementId: 'G-PBRJHH2KMH',
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
module.exports = { db };
