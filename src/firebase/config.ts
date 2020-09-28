import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCAx3M9n9umwVD4PrHduYdTDc2FLf0c94o',
  authDomain: 'shadi-front.firebaseapp.com',
  databaseURL: 'https://shadi-front.firebaseio.com',
  projectId: 'shadi-front',
  storageBucket: 'shadi-front.appspot.com',
  messagingSenderId: '252631312843',
  appId: '1:252631312843:web:d9fd5274a2ad999e986e4e',
  measurementId: 'G-T075KYXGSH',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;

