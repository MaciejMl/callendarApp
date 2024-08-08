//import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.REACT_APP_SECRET_apiKey,
  authDomain: process.env.REACT_APP_SECRET_authDomain,
  projectId: process.env.REACT_APP_SECRET_projectId,
  storageBucket: process.env.REACT_APP_SECRET_storageBucket,
  messagingSenderId: process.env.REACT_APP_SECRET_messagingSenderId,
  appId: process.env.REACT_APP_SECRET_appId,
  measurementId: process.env.REACT_APP_SECRET_measurementId,
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };
