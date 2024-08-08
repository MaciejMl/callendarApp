//import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyCMY3TOdsrVIfuCBy2980Z0HZVmOGQWI20',
  authDomain: 'myjobproject-eeb31.firebaseapp.com',
  projectId: 'myjobproject-eeb31',
  storageBucket: 'myjobproject-eeb31.appspot.com',
  messagingSenderId: '335362323082',
  appId: '1:335362323082:web:02848e353830d8148ef373',
  measurementId: 'G-0Q3JMECZL0',
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };
